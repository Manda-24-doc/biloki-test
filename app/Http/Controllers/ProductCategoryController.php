<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductCategoryController extends Controller
{
    //
    public function index(Request $request): Response
    {
        [$search, $sort] = $this->normalizeSearchAndSort($request);

        $categoriesQuery = ProductCategory::query()
            ->when($search !== '', function (Builder $query) use ($search) {
                $query->where(function ($subQuery) use ($search) {
                    $subQuery->where('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            });

        $this->applyCreatedAtSort($categoriesQuery, $sort);

        $categories = $categoriesQuery->paginate(5)->withQueryString();

        return Inertia::render('Categories/Index', [
            'categories' => $categories,
            'search' => $search,
            'sort' => $sort,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $data['image'] = $this->storeImagePath($request, 'image', 'categories');

        ProductCategory::create($data);

        return redirect()->route('categories.index');
    }

    public function update(Request $request, ProductCategory $category)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $data['image'] = $this->storeImagePath(
            $request,
            'image',
            'categories',
            $category->image,
        );

        $category->update($data);

        return redirect()->route('categories.index');
    }

    public function destroy(ProductCategory $category)
    {
        $this->deleteStoredImage($category->image);
        $category->delete();

        return redirect()->route('categories.index');
    }
}
