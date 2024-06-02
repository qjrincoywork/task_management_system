<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::namespace('App\Http\Controllers\Api')->group(function () {
    Route::post('/register', 'UserController@register')->name('user.register');
    Route::post('/login', 'UserController@login')->name('user.login');
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', function (Request $request) {
            return $request->user();
        });

        Route::post('/logout', 'UserController@logout');
        Route::apiResource('/task', 'TaskController');
    });
});
