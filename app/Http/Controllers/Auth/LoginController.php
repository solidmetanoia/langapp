<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/youcant';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function login(Request $request){

        $login_data = [
            'username' => $request->input('username'),
            'password' => $request->input('password')
        ];

        if (\Auth::once($login_data)) {
            $login_data['grant_type'] = 'password';
            $login_data['client_id'] = env('CLIENT_ID', '');
            $login_data['client_secret'] = env('CLIENT_SECRET', '');
            $login_data['scope'] = '';

            // set post fields
            $curl = curl_init();
            curl_setopt_array($curl, array(
              CURLOPT_URL => "http://learnlang.app/oauth/token",
              CURLOPT_RETURNTRANSFER => true,
              CURLOPT_ENCODING => "",
              CURLOPT_MAXREDIRS => 10,
              CURLOPT_TIMEOUT => 30,
              CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
              CURLOPT_CUSTOMREQUEST => "POST",
              CURLOPT_POSTFIELDS => $login_data,
            ));

            // execute
            $response = curl_exec($curl);

            if(curl_errno($curl)){
                echo 'error:' . curl_error($curl);
                return response()->json($response, curl_errno($curl));
            }
            // close the connection
            curl_close($curl);


            // TO DO
            // check if response is not error, if error, 401.
            return response()->json($response, 200);
        } 
        return response()->json('Unauthorized', 401);
    }
}
