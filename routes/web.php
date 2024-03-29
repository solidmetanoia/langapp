<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/login', function () {
    return view('index');
})->name('login');

Route::post('/login', 'Auth\LoginController@login');
Route::post('/login/refresh', 'Auth\LoginController@refresh');

Route::post('/register', 'Auth\RegisterController@register');

Route::get('/{path?}', function () {
    return view('index');
})->where('path', '.*');
