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

    function addProduct(Request $request){

        $name = $request->input('name');
        $description = $request->input('description');
        $image = $request->input('image');
        $price = $request->input('price');
        $categoryName = $request->input('category_name');

        $categoryId = DB::table('categories')
            ->where('name', $categoryName)
            ->value('id');

        $toadd = [
            'name' => $name,
            'description' => $description,
            'image' => $image,
            'price' => $price,
            'category_id' => $categoryId,
        ];
    
        DB::table('products')->insert($toadd);
    
        if ($productId) {
            return response()->json(['message' => 'Product added successfully', 'product_id' => $productId]);
        } else {
            return response()->json(['message' => 'Failed to add product']);
        }

    }
}
