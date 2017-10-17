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
	public function getVocabularyCard(){

		// Eventually replace 'card' with 'word' maybe

		// Get <step> items from <study progress> where <authorized user's ID>
		$progress = DB::table('study_progress_core')
			->where('user_id', \Auth::id())
			// ->where('item_id', '!=', $item_id)
			->orderBy('study_rate', 'asc')
			->orderBy('updated_at', 'asc')
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

		// return response()->json($add_new, 200);

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
					'streak' => 0
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
		} 

		// If card has not been updated
		if($progress->first()->updated_at != NULL)
			$progress = $progress->shuffle();
		$card = DB::table('study_progress_core')
			->where('item_id', $progress->first()->item_id)
			->join('core_6k_list', 'core_6k_list.id', '=', 'study_progress_core.item_id')
			->select('study_progress_core.study_rate', 'core_6k_list.*')->first();

		$data['correct'] = $card;



		// After X correct answers use text input
		if($data['correct']->study_rate > 30) {
			$data['answer_type'] = 'input';
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
		$correct = DB::table('core_6k_list')
			->where([
				'id' => $data['question'],
				'meaning' => $data['answer'] // later should be not static meaning but received
			])->first();
		$progress = DB::table('study_progress_core')
			->where([
				'user_id' => \Auth::id(),
				'item_id' => $data['question']
			])->first();

		DB::beginTransaction();
		if($correct){
			$proc = DB::table('study_progress_core')
				->where([
					'user_id' => \Auth::id(),
					'item_id' => $data['question']
				])
				->update([
					'streak' => $progress->streak + 1,
					'study_rate' => $progress->study_rate + 1 + $progress->streak * .25,
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
					'study_rate' => $progress->study_rate * .95,
					'updated_at' => Carbon::now()
				]);
			$output['status'] = 'fail';
		}
		$output['proc'] = $proc;
		DB::commit();
		return response()->json($output, 200);
	}
}
