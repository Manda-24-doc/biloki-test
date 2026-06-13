<?php

namespace Database\Factories;

use App\Models\ProductCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ProductCategory>
 */
class ProductCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement([
                'Electronics',
                'Food',
                'Clothing',
                'Books',
                'Furniture'
            ]),
            'description' => $this->faker->sentence(),
            'image' => $this->faker->sentence(),
        ];
    }
}
