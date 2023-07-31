<?php

namespace App\Http\Controllers;
use App\Models\Favorite;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FavoriteController extends Controller
{
    function addFavorite($user_id, $product_id)
    {
       
        $favorite = Favorite::create([
            'user_id' => $user_id,
            'product_id' => $product_id,
        ]);

        return response()->json(['message' => 'Favorite added successfully']);
    }

    public function getFavoritesByUserId($user_id)
    {
        
        $favoriteProductIds = DB::select('SELECT product_id FROM favorites WHERE user_id = ?', [$user_id]);

  
        $productIds = array_column($favoriteProductIds, 'product_id');
        $favoriteProducts = DB::table('products')
            ->whereIn('id', $productIds)
            ->get();

        // Return the favorite products as a JSON response
        return response()->json($favoriteProducts);
    }

    public function removeFavorite($user_id, $product_id)
{
   
        $favorite = Favorite::where('user_id', $user_id)->where('product_id', $product_id)->first();

        $favorite->delete();

        return response()->json(['message' => 'Favorite removed']);

  
}
}
