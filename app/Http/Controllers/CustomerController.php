<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    //
    public function index(Request $request): Response
    {
        [$search, $sort] = $this->normalizeSearchAndSort($request);

        $customersQuery = Customer::query()
            ->when($search !== '', function (Builder $query) use ($search) {
                $query->where(function ($subQuery) use ($search) {
                    $subQuery->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('address', 'like', "%{$search}%")
                        ->orWhere('number', 'like', "%{$search}%");
                });
            });

        $this->applyCreatedAtSort($customersQuery, $sort);

        $customers = $customersQuery->paginate(5)->withQueryString();

        return Inertia::render('Customers/Index', [
            'customers' => $customers,
            'search' => $search,
            'sort' => $sort,
        ]);
    }
}
