<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use DB;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    public function me(){
      $core['seen'] = DB::table('study_progress_core')
                ->where([
                    ['user_id', '=', \Auth::id()],
                    ['updated_at', '!=', null]
                  ])->count();
      $core['total'] = DB::table('core_6k_list')->count();
      $data = [
        'user' => \Auth::user(),
        'progress' => [
          'core' => $core
        ]
      ];
    	return response()->json($data, 200);
    }

    // Requires:
    // Get user data for display
    // Get study progress
}
