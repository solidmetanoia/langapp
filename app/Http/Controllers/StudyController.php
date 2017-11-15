<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Carbon\Carbon;

class StudyController extends Controller
{
	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->base_study_rate = 15;
		$this->step = 10;
	}

	// Requires:
	// Get card
	// Update card
	// Get card by study type
	// .....
	public function getVocabularyCard(Request $request){

		// Eventually replace 'card' with 'word' maybe

		$progress = DB::table('study_progress_core')
			->where([
				'user_id' => \Auth::id(),
				'updated_at' => null
			])
			->orderBy('item_id', 'asc')
			->get();

		if(!$progress->first()){
			// Get <step> items from <study progress> where <authorized user's ID>
			$progress = DB::table('study_progress_core')
				->where('user_id', \Auth::id())
				// ->where('item_id', '!=', $item_id)
				->orderBy('study_rate', 'asc')
				// ->orderBy('updated_at', 'asc')
				->orderBy('item_id', 'asc')
				->take($this->step)
				->get();

			// Check if new cards should be added
			$add_new = false;

			// Check progress
			// If empty, add cards.
			if(!$progress->first())
				$add_new = true;

			// if study rate is far enough from initial
			// but need to account for time as well.
			// cards that haven't been seen in a while need to be counted as having a lower study_rate.
			// daily study_rate reduction?
			// current_study_rate = study_rate - 1*last_updated?
			// temporarily static distance bool
			if($progress->first())
				if($progress->first()->study_rate > $this->base_study_rate+10)
					$add_new = true;

			if($add_new){
				DB::beginTransaction();
				$last_possible_id = DB::table('core_6k_list')->orderBy('id', 'desc')->first();
				$last_study_id = DB::table('study_progress_core')
						->where('user_id', \Auth::id())
						->orderBy('item_id', 'desc')->first();
				$next_study_id = ($last_study_id)?$last_study_id->item_id + 1:1;
				$final_id = $next_study_id + $this->step;
				// If there are less cards available than the step exists
				if($last_study_id)
					if($last_possible_id->id - $next_study_id < $this->step)
						$final_id = $last_possible_id->id;

				$items_to_add = [];
				for ($id = $next_study_id; $id < $final_id; $id++) {
					$items_to_add[] = [
						'item_id' => $id,
						'user_id' => \Auth::id(),
						'study_rate' => $this->base_study_rate,
						'streak' => 0,
						'created_at' => Carbon::now(),
					];
				}

				DB::table('study_progress_core')->insert($items_to_add);
				DB::commit();

				// Re-retrieve after inserting
				$progress = DB::table('study_progress_core')
					->where('user_id', \Auth::id())
					// ->where('item_id', '!=', $item_id)
					->orderBy('study_rate', 'asc')
					// ->orderBy('created_at', 'asc')
					->take($this->step)
					->get();
			} else {
				$progress = $progress->where('study_rate', '<', $progress->first()->study_rate+$this->step);
			}
		}

		// If card has not been updated
		if($progress->first()->updated_at != NULL)
			$progress = $progress->shuffle();
		$card = DB::table('study_progress_core')
			->where('item_id', $progress->first()->item_id)
			->join('core_6k_list', 'core_6k_list.id', '=', 'study_progress_core.item_id')
			->select('study_progress_core.study_rate', 'core_6k_list.*')->first();

		// if study rate high enough to remove furigana from seeking word
		// $card->example_ja = preg_replace('/(<b>.*?)<rt>.*?<\/rt>.*(<\/b>)/', '\1\2', $card->example_ja);

		// if study rate high enough to remove furigana from sentence
		// $card->example_ja = preg_replace('/<rt>.*?<\/rt>/', '', $card->example_ja);

		$data['correct'] = $card;
		$data['required'] = 'meaning';

		// After X correct answers use text input
		if($data['correct']->study_rate > 20 || $request->input('hard_mode')) {
			$data['answer_type'] = 'input';
			$data['correct']->example_ja = preg_replace('/(<b>.*?)<rt>.*?<\/rt>.*(<\/b>)/', '\1\2', $card->example_ja);
			$random = mt_rand(0, 1);
			if(($data['correct']->study_rate) - $random*100 > 40 || $request->input('hard_mode')){
				$data['correct']->example_ja = preg_replace('/<rt>.*?<\/rt>/', '', $card->example_ja);
				$data['required'] = 'reading';
			}
		} else {
			$data['answer_type'] = 'button';
			$answers = DB::table('study_progress_core')
				->where([
					['user_id', '=' , \Auth::id()],
					['item_id', '!=' , $data['correct']->id],
					['updated_at', '!=', 'NULL']
				])
				->inRandomOrder()->take(5)
				->join('core_6k_list', 'core_6k_list.id', '=', 'study_progress_core.item_id')
				->select('core_6k_list.*')->get()->pluck('meaning');
			$answers->push($data['correct']->meaning);
			$data['answers'] = $answers->shuffle();
		}

		return response()->json($data, 200, [], JSON_PRETTY_PRINT);
	}

	public function postVocabularyCard(Request $request){
		// Get the question'S ID, NOT THE QUESTION and answer
		// Where in core_6k_list question check answer
		// If true increase study_progress_core score
		// If false reduce points by 5% percent

		$data = $request->all();
		$question = DB::table('core_6k_list')
			->where([
				'id' => $data['question'],
				// 'meaning' => $data['answer'] // later should be not static meaning but received
			])->first();

		$same_word_but_wrong = DB::table('core_6k_list')
			->where([
				['id', '!=', $data['question']],
				['word', '=', $question->word]
			])->select('meaning')->get()->implode('meaning', ', ');

		$correct = false;
		if($data['type'] != 'button'){
			$data['answer'] = trim(strtolower($data['answer']));
			if(in_array($data['answer'], $this->separateAnswers($question->{$data['required']})))
				$correct = true;
			else{
				if($this->sift4Recursive($data['answer'], $this->separateAnswers($question->{$data['required']}))){
					$correct = true;
					$output['message'] = 'slight misspelling, but ok';
				}
				if(in_array($data['answer'], $this->separateAnswers($same_word_but_wrong)))
					return response()->json(['status' => 'context','message' => 'look at the sentence context'], 200);
			}
			// Should add check for string similarity?
		} else {
			if($data['answer'] == $question->meaning)
				$correct = true;
		}

		$progress = DB::table('study_progress_core')
			->where([
				'user_id' => \Auth::id(),
				'item_id' => $data['question']
			])->first();

		DB::beginTransaction();
		if($correct){
			$points = $progress->study_rate + 1 +
				(($progress->streak >= 1) ? log($progress->streak) * (
					!empty($data['hard_mode']) ? 2 : 1
					) : 0);
			$proc = DB::table('study_progress_core')
				->where([
					'user_id' => \Auth::id(),
					'item_id' => $data['question']
				])
				->update([
					'streak' => $progress->streak + 1,
					'study_rate' => $points,
					'updated_at' => Carbon::now()
				]);
			$output['status'] = 'success';
		} else {
			$proc = DB::table('study_progress_core')
				->where([
					'user_id' => \Auth::id(),
					'item_id' => $data['question']
				])
				->update([
					'streak' => 0,
					'study_rate' => $progress->study_rate * (empty($data['hard_mode']) ? .95 : .8),
					'updated_at' => Carbon::now()
				]);
			$output['status'] = 'fail';
		}
		$output['proc'] = $proc;
		DB::commit();
		return response()->json($output, 200);
	}

	private function separateAnswers($data){
		return array_map('strtolower', array_map('trim', explode(', ', preg_replace('/\(.*?\)/', '', $data))));
	}

	private function sift4PHP($str1, $str2, $maxOffset, $maxDistance = 0){
		if (!$str1 || !strlen($str1)) {
			if (!$str2) {
				return 0;
			}
			return strlen($str2);
		}

		if (!$str2 || !strlen($str2)) {
			return strlen($str1);
		}

		$l1 = strlen($str1);
		$l2 = strlen($str2);

		$c1 = 0; $c2 = 0;
		$lcss = 0;
		$local_cs = 0;
		$trans = 0;
		$offset_arr = array();
		while (($c1 < $l1) && ($c2 < $l2)) {
			if (substr($str1, $c1, 1) == substr($str2, $c2, 1)) {
				$local_cs++;
				$isTrans = false;
				$i = 0;
				while ($i < sizeof($offset_arr)) {
					$ofs = $offset_arr[$i];
					if ($c1 <= $ofs['c1'] || $c2 <= $ofs['c2']) {
						$isTrans = abs($c2 - $c1) >= abs($ofs['c2'] - $ofs['c1']);
						if ($isTrans) {
							$trans++;
						} else {
							if (!$ofs['trans']) {
								$ofs['trans'] = true;
								$trans++;
							}
						}
						break;
					} else {
						if ($c1 > $ofs['c2'] && $c2 > $ofs['c1']) {
							array_splice($offset_arr, $i, 1);
						} else {
							$i++;
						}
					}
				}
				array_push($offset_arr, array('c1' => $c1, 'c2' => $c2, 'trans' => $isTrans));
			} else {
				$lcss += $local_cs;
				$local_cs = 0;
				if ($c1 != $c2) {
					$c1 = $c2 = min($c1, $c2);
				}
				for ($i = 0; $i < $maxOffset && ($c1 + $i < $l1 || $c2 + $i < $l2); $i++) {
					if (($c1 + $i < $l1) && (substr($str1, $c1 + $i, 1) == substr($str2, $c2, 1))) {
						$c1 += $i - 1;
						$c2--;
						break;
					}
					if (($c2 + $i < $l2) && (substr($str1, $c1, 1) == substr($str2, $c2 + $i, 1))) {
						$c1--;
						$c2 += $i - 1;
						break;
					}
				}
			}
			$c1++;
			$c2++;
			if ($maxDistance) {
				$temporaryDistance = max($c1, $c2) - $lcss + $trans;
				if ($temporaryDistance >= $maxDistance)
					return $temporaryDistance;
			}
			if (($c1 >= $l1) || ($c2 >= $l2)) {
				$lcss += $local_cs;
				$local_cs = 0;
				$c1 = $c2 = min($c1, $c2);
			}
		}
		$lcss += $local_cs;
		return max($l1, $l2) - $lcss + $trans;
	}

	private function sift4Recursive($answer, $correct){
		foreach ($correct as $string) {
			if($this->sift4PHP($answer, $string, 1) <=  strlen($string)/5){
				return true;
			}
		}
		return false;
	}
}
