<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Models\Customer;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'totalCustomers' => Customer::count(),
        'totalProducts' => Product::count(),
        'totalCategories' => ProductCategory::count(),
        'lowStockProducts' => Product::where('stocks', '<=', 5)->count(),
        'recentCustomers' => Customer::latest()->take(4)->get(['id', 'name', 'email', 'created_at']),
        'recentProducts' => Product::with('productCategory')
            ->latest()
            ->take(4)
            ->get(['id', 'name', 'price', 'stocks', 'product_category_id', 'created_at']),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('customers', CustomerController::class)
        ->only('index', 'store', 'update', 'delete');
    Route::resource('products', ProductController::class)
        ->only('index', 'store', 'update', 'destroy');
    Route::resource('categories', ProductCategoryController::class)
        ->only('index', 'store', 'update', 'destroy');
});

require __DIR__ . '/auth.php';
