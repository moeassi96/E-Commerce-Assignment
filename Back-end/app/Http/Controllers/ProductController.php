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
        $productsWithCategory =Product::join('categories', 'products.category_id', '=', 'categories.id')
            ->select('products.*', 'categories.name AS category_name')
            ->get();
            
        return response()->json($productsWithCategory);
    }


    function getProductDetails($product_id){
        $product = Product::select('products.*', 'categories.name as category_name')
        ->Join('categories', 'products.category_id', '=', 'categories.id')
        ->where('products.id', $product_id)
        ->first();

        if ($product) {
            return response()->json($product);

    }}

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


    function updateProduct(Request $request, $product_id) {
        try {
            $product = Product::find($product_id);
    
            if ($request->has('name')) {
                $product->name = $request->input('name');
            }
    
            if ($request->has('price')) {
                $product->price = $request->input('price');
            }
    
            if ($request->has('description')) {
                $product->description = $request->input('description');
            }
    
            if ($request->has('category_name')) {
                $categoryName = $request->input('category_name');
                $categoryId = DB::table('categories')
                    ->where('name', $categoryName)
                    ->value('id');
                $product->category_id = $categoryId;
            }
    
            if ($request->has('image')) {
                $product->image = $request->input('image');
            }
    
            $product->save();
    
            return response()->json(['message' => 'Product updated successfully']);
        } catch (Exception $e) {
            return response()->json(['error' => $e]);
        }
    }
}
