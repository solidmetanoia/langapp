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
    }

    // Requires:
    // Get card
    // Update card
    // Get card by study type
    // .....
    public function getVocabularyCard(){

        // Get the first item in study progress core
        // If empty, set first X cards in upload order and ascending study rate to active
        // From those cards ...............

        // Try to avoid having the same question twice in a row but not prevent completely
        // For question get audio of reading sound and example sentence
        // If received card study rate over Y, change from answer type button to answer type input/text
        
        return response()->json([], 200, [], JSON_PRETTY_PRINT);
        
    }

    public function postVocabularyCard(Request $request){
        // Get the question and answer
        // Where in core_6k_list question check answer
        // If true increase study_progress_core score
        // If false reduce points by 5% percent
    }
}
