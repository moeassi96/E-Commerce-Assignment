<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CartController;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});


Route::post('/add-cart/{user_id}', [CartController::class, 'addCart']);
Route::get('/get-cart-id/{user_id}', [CartController::class, 'getCartId']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




Route::get('/batata', [GetRequests::class,"hello"]);
Route::get('/chips', [GetRequests::class,"hello1"]);
Route::get('/choc', [GetRequests::class,"hello2"]);