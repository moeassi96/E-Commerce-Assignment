<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartItemController extends Controller
{
    function addItemToCart(Request $request)
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

    function getCartItems($cart_id)
    {
        try {
            $cartItems = DB::table('cart_items')
            ->join('products', 'cart_items.product_id', '=', 'products.id')
            ->select('cart_items.id', 'cart_items.cart_id', 'cart_items.product_id', 'cart_items.quantity', 'products.*')
            ->where('cart_items.cart_id', $cart_id)
            ->get();

            return response()->json([
                'cart_items' => $cartItems,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error fetching cart items.',
                'error' => $e->getMessage(),
            ]);
        }
    }

    function deleteCartItem($cart_id, $product_id)
    {

        $cartItem = CartItem::where('cart_id', $cart_id)->where('product_id', $product_id)->first();

        
        if ($cartItem) {
            $cartItem->delete();

            return response()->json([
                'message' => 'Cart item deleted successfully.',
            ]);
        }

        return response()->json([
            'message' => 'Cart item not found.',
        ]);
    }

    function deleteMyCartItems($cart_id)
    {

        $deletedItems = CartItem::where('cart_id', $cart_id)->delete();

        return response()->json([
            'message' => 'My cart is emptied',
        ]);
    }



    
}