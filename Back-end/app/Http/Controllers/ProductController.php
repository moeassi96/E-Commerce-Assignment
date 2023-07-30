<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;

class ProductController extends Controller
{
    function allProducts()
    {
        $products = Product::all();

        return response()->json($products);
    }
}
