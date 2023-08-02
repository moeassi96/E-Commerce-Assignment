<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    function addCart($user_id)
    {
        // $user = Auth::user();
        // dd($user);
        $cart = Cart::create([
            'user_id' => $user_id,
        ]);

        return response()->json([
            'message' => 'Cart created successfully',
            'cart' => $cart,
        ]);
    }

    function getCartId($user_id)
    {
        $cart = Cart::where('user_id', $user_id)->first();

        return response()->json([
            'cart_id' => $cart->id,
        ]);
    }


}


