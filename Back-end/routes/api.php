<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});


Route::post('/add-cart/{user_id}', [CartController::class, 'addCart']);
Route::get('/get-cart-id/{user_id}', [CartController::class, 'getCartId']);

Route::get('/getallproducts', [ProductController::class, 'allProducts']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



