<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Filters\ProductSearch;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class ProductsController extends Controller
{

    /**
     * Return list of active products.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::where('active', true)->get()->map(function ($product) {
            return $product->map();
        });
        return response()->json($products);
    }

    /**
     * Returns Products that match filter request
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function filter(Request $request)
    {
        $paginator = ProductSearch::apply($request)->paginate(20);
        $paginator->getCollection()->transform(function ($product){
            return $product->map();
        });

        return response()->json($paginator);
    }

    public function salesData(Request $request)
    {
        $paginator = ProductSearch::apply($request)->paginate(20);
        $paginator->getCollection()->transform(function ($product){
            return $product->mapWithSalesData();
        });

        return response()->json($paginator);
    }

    /**
     * Store new product
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $attributes = $this->validateProduct($request);

        $product = Product::create([
            'name' => $attributes['name'],
            'description' => $attributes['description'],
            'productCode' => $attributes['productCode'],
            'price' => $attributes['price'],
            'cost' => $attributes['cost']
        ]);

        return response()->json($product, 201);
    }

    /**
     * Updates the product by its ID.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param Product $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $attributes = $this->validateProductUpdate($request, $product);
        $product->name = $attributes['name'];
        $product->description = $attributes['description'];
        $product->productCode = $attributes['productCode'];
        $product->price = $attributes['price'];
        $product->cost = $attributes['cost'];
        $product->update($attributes);
        $product = $product->fresh();
        return response()->json($product);
    }

    /**
     * Returns product by its ID.
     *
     * @param Product $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return response()->json($product->map());
    }

    /**
     * Deactivate the product by its ID. (Product is not deleted from DB)
     *
     * @param Product $product
     * @return \Illuminate\Http\Response
     */
    public function deactivate(Product $product)
    {
        $product->deactivate();
        return response()->noContent();
    }

    protected function validateProduct(Request $request)
    {
        return $request->validate([
            'name' => 'required|max:40',
            'description' => 'required|max:255',
            'productCode' => 'required|unique:products|max:10',
            'price' => 'required',
            'cost' => 'required',
        ]);
    }

    protected function validateProductUpdate(Request $request, Product $product)
    {
        return $request->validate([
            'name' => 'required|max:40',
            'description' => 'required|max:255',
            'productCode' => ['required', Rule::unique('products')->ignore($product), 'max:10'],
            'price' => 'required',
            'cost' => 'required',
        ]);
    }

}
