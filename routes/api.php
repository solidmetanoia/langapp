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
	$n_restrictions = ['level' => '[1-5]', 'type' => 'vocabulary||kanji'];
	Route::post('/logout', 'Auth\LoginController@logout');
	Route::get('/me', 'UserController@me');

	Route::get('/japanese/vocabulary/core', 'StudyController@getVocabularyCard');
	Route::post('/japanese/{type}/core', 'StudyController@postJapaneseCard');
	Route::get('/japanese/{type}/n{level}', 'StudyController@getNLevelCard')->where($n_restrictions);
	Route::post('/japanese/{type}/n{level}', 'StudyController@postJapaneseCard')->where($n_restrictions);
});

Route::get('/{path?}', function () {
    return response()->json(['Invalid route'], 404);
})->where('path', '.*');
