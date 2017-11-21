<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['auth:api']], function () {
	Route::post('/logout', 'Auth\LoginController@logout');
	Route::get('/me', 'UserController@me');

	Route::get('/japanese/vocabulary/core', 'StudyController@getVocabularyCard');
	Route::post('/japanese/vocabulary/core', 'StudyController@postVocabularyCard');
	Route::get('/japanese/vocabulary/n{level}', 'StudyController@getNLevelCard')->where('level', '[1-5]');
	Route::post('/japanese/kanji/n{level}', 'StudyController@postNLevelCard')->where('level', '[1-5]');
});

Route::get('/{path?}', function () {
    return response()->json(['Invalid route'], 404);
})->where('path', '.*');
