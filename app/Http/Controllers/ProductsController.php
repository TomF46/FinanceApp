<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class ProductsController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::where('active', true)->get()->map(function ($product) {
            return $product->map();
        });
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $attributes = $this->validateProduct($request);

        $product = Product::create([
            'name' => $attributes['name'],
            'productCode' => $attributes['productCode'],
            'price' => $attributes['price']
        ]);

        return response()->json($product, 201);
    }

    public function update(Request $request, Product $product)
    {
        $attributes = $this->validateProduct($request);
        $product->name = $attributes['name'];
        $product->productCode = $attributes['productCode'];
        $product->price = $attributes['price'];
        $product->update($attributes);
        $product = $product->fresh();
        return response()->json($product);
    }

    public function show(Product $product)
    {
        return response()->json($product->map());
    }

    public function deactivate(Product $product)
    {
        $product->deactivate();
        return response()->noContent();
    }

    protected function validateProduct(Request $request)
    {
        return $request->validate([
            'name' => 'required|max:40',
            'productCode' => 'required|unique:products|max:10',
            'price' => 'required'
        ]);
    }

}
