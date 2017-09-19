<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware('guest')->except('logout');
	}

	public function login(Request $request){

		$validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'password' => 'required|string|min:4',
        ]);

		if ($validator->fails())
			return response($validator->errors(), 400);

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

			$decoded_response = json_decode($response);

			\Cookie::queue(
				'refreshToken',
				$decoded_response->refresh_token,
				604800, // 14 days
				null,
				null,
				false,
				true // HttpOnly
			);

			$return_data = [
				'access_token' => $decoded_response->access_token,
            	'expires_in' => $decoded_response->expires_in
			];

			// TO DO
			// check if response is not error, if error, 401.
			return response()->json(json_encode($return_data), 200);
		} 
		return response()->json('Unauthorized', 401);
	}

	public function logout(Request $request){

        $accessToken = \Auth::user()->token();

		$refreshToken = $this->db
            ->table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);

        $accessToken->revoke();
        \Cookie::queue(\Cookie::forget('refreshToken'));

        return response()->json(['Logged out'], 200);
	}
}
