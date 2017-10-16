<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

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
			if($progress->first()->study_rate > $this->base_study_rate+15)
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
					'streak' => 0
				];
			}
		return response()->json('pre-add', 200);

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
		if($progress->first()->created_at != $progress->first()->updated_at)
			$progress = $progress->shuffle();
		$card = DB::table('study_progress_core')
			->where('item_id', $progress->first()->item_id)
			->join('core_6k_list', 'core_6k_list.id', '=', 'study_progress_core.item_id')
			->select('study_progress_core.*', 'core_6k_list.*')->first();

		$data['correct'] = $card;



		// After X correct answers use text input
		if($data['correct']->study_rate > 30) {
			$data['answer_type'] = 'input';
		} else {
			$data['answer_type'] = 'button';
			$answers = DB::table('study_progress_core')
				->where([
					['item_id', '!=' , $data['correct']->id],
					['created_at', '!=', 'updated_at']
				])
				->inRandomOrder()->take(5)
				->join('core_6k_list', 'core_6k_list.id', '=', 'study_progress_core.item_id')
				->select('core_6k_list.*')->get();
			$answers->push($data['correct']);
			$data['answers'] = $answers->shuffle();
		}





		// Get first 

		// Get the first item in study progress core
		// If empty, set first X cards in upload order and ascending study rate to active
		// From those cards ...............

		// Try to avoid having the same question twice in a row but not prevent completely
		// For question get audio of reading sound and example sentence
		// If received card study rate over Y, change from answer type button to answer type input/text



		/*
		$item_id = 0;
		if(isset($_GET['previous_id']))
			$item_id = $_GET['previous_id'];

		// This gets the last card in the study list that isn't the previously seen in test card.
		$progress = DB::table('study_progress_core')
			->where('user_id', \Auth::id())
			// ->where('item_id', '!=', $item_id)
			->orderBy('study_rate', 'asc')
			->take(3)
			->get();

		if(!$progress->first()){
			// If there are no cards in the list, add the first card in the section's database.
			$card = DB::table('core_6k_list')->first();
		} else {
			// Get last ID. If last ID is over 31 study_rate and less than last_possible_id->id
			// you can add more cards.
			if($progress->first()->study_rate <= 31){
				$shuffled = $progress->shuffle();
				$card = DB::table('core_6k_list')->where('id', $shuffled->first()->item_id)->first();
			} else {
				$last_possible_id = DB::table('core_6k_list')->orderBy('id', 'desc')->first();
				$last_study_id = DB::table('study_progress_core')
					->where('user_id', \Auth::id())
					->orderBy('item_id', 'desc')->first();
				if($last_study_id->item_id < $last_possible_id->id){
					$card = DB::table('core_6k_list')->where('id', $last_study_id->item_id+1)->first();
				}
			}
		}
		$data['correct'] = $card;

		$answers = DB::table('study_progress_core')
			->where('item_id', '!=' , $data['correct']->id )
			->inRandomOrder()->take(5)
			->join('core_6k_list', 'core_6k_list.id', '=', 'study_progress_core.item_id')
			->select('core_6k_list.*')->get();
		$answers->push($data['correct']);
		$data['answer_type'] = 'button';
		$data['answers'] = $answers->shuffle();
		foreach($data['answers'] as $answer)
			$answer->reading_sound = base64_encode(\Storage::get('training_core/'.$answer->reading_sound)); 
		*/
		return response()->json($data, 200, [], JSON_PRETTY_PRINT);

	}

	public function postVocabularyCard(Request $request){
		// Get the question'S ID, NOT THE QUESTION and answer
		// Where in core_6k_list question check answer
		// If true increase study_progress_core score
		// If false reduce points by 5% percent
	}
}
