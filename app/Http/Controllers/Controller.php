<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

abstract class Controller
{
    protected function normalizeSearchAndSort(Request $request): array
    {
        $search = trim((string) $request->query('search', ''));
        $sort = $request->query('sort', 'recent');

        return [$search, $sort === 'old' ? 'old' : 'recent'];
    }

    protected function applyCreatedAtSort(Builder $query, string $sort): Builder
    {
        return $query->orderBy('created_at', $sort === 'old' ? 'asc' : 'desc');
    }

    protected function storeImagePath(
        Request $request,
        string $field,
        string $directory,
        ?string $existingPath = null,
    ): ?string {
        if (! $request->hasFile($field)) {
            return $existingPath;
        }

        if ($existingPath) {
            Storage::disk('public')->delete($existingPath);
        }

        return $request->file($field)->store($directory, 'public');
    }

    protected function deleteStoredImage(?string $path): void
    {
        if ($path) {
            Storage::disk('public')->delete($path);
        }
    }
}
