<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    //
    use HasFactory;

    protected $table = 'products';
    protected $fillable = ['product_category_id', 'name', 'description', 'image', 'price', 'stocks'];

    public function productCategory(): BelongsTo
    {
        return $this->belongsTo(ProductCategory::class);
    }
}
