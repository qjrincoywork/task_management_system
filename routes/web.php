<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::view('/', 'login');
Route::view('/register', 'register');
Route::get('/login', function () {
    return view('login');
});
// Route::get('/login', 'login');
// Route::middleware('auth:sanctum')->group(function () {
//     Route::view('/', 'login');
// });
