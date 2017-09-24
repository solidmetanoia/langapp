<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

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
    	return response()->json(\Auth::user(), 200);
    }

    // Requires:
    // Get user data for display
    // Get study progress
}
