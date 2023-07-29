<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;

class CartController extends Controller
{
    function addCart($user_id)
    {
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


