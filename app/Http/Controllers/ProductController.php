<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    //
    public function index(Request $request): Response
    {
        [$search, $sort] = $this->normalizeSearchAndSort($request);

        $productsQuery = Product::with('productCategory')
            ->when($search !== '', function (Builder $query) use ($search) {
                $query->where(function ($subQuery) use ($search) {
                    $subQuery->where('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhereHas('productCategory', function ($categoryQuery) use ($search) {
                            $categoryQuery->where('name', 'like', "%{$search}%");
                        });
                });
            });

        $this->applyCreatedAtSort($productsQuery, $sort);

        $products = $productsQuery->paginate(5)->withQueryString();
        $categories = ProductCategory::all();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'search' => $search,
            'sort' => $sort,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'product_category_id' => 'required|exists:products_categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'price' => 'required|numeric',
            'stocks' => 'required|integer',
        ]);

        $data['image'] = $this->storeImagePath($request, 'image', 'product');

        Product::create($data);

        return redirect()->route('products.index');
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'product_category_id' => 'required|exists:products_categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'price' => 'required|numeric',
            'stocks' => 'required|integer',
        ]);

        $data['image'] = $this->storeImagePath(
            $request,
            'image',
            'product',
            $product->image,
        );

        $product->update($data);

        return redirect()->route('products.index');
    }

    public function destroy(Product $product)
    {
        $this->deleteStoredImage($product->image);
        $product->delete();

        return redirect()->route('products.index');
    }
}
