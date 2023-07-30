<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    function allProducts()
    {
        $products = Product::all();

        return response()->json($products);
    }

    function allProductsWithCategory()
    {
        $productsWithCategory = DB::table('products')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->select('products.*', 'categories.name AS category_name')
            ->get();

        return response()->json($productsWithCategory);
    }

    function deleteProduct($product_id){
        try {
            
            DB::table('products')->where('id', $product_id)->delete();
            return response()->json(['message' => 'Product deleted']);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Product not found']);
        }
    }
}
