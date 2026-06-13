<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'product_category_id' => ProductCategory::inRandomOrder()->first()?->id,
            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(),
            'image' => $this->faker->sentence(),
            'price' => $this->faker->randomFloat(2, 5, 500),
            'stocks' => $this->faker->numberBetween(0, 100),
        ];
    }
}
