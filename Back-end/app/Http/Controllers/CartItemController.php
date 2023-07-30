<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartItem;
use Illuminate\Database\QueryException;

class CartItemController extends Controller
{
    public function addItemToCart(Request $request)
    {
        try {
            // Assuming this code is inside a controller method that receives a $request object
            $cartItem = CartItem::create([
                'product_id' => $request->product_id,
                'cart_id' => $request->cart_id,
            ]);

            return response()->json([
                'message' => 'Item added to cart successfully.',
                'cart_item' => $cartItem,
            ]);
        } catch (QueryException $error) {
            // Handle the QueryException here
            return response()->json([
                'message' => 'Error adding item to cart.',
                'error' => $error->getMessage(), 
            ]);
        }
    }
}