<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoriesController extends Controller
{
    // 🟢 INDEX + FILTER + SORT
    public function index(Request $request)
    {
        $query = Category::query();

        // 🔍 filter by name
        if ($request->filled('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        // 📊 include products count
        $query->withCount('products');

        // 🔃 sort by products count
        if ($request->filled('sort')) {
            $direction = $request->direction ?? 'desc';

            if ($request->sort === 'products_count') {
                $query->orderBy('products_count', $direction);
            }
        } else {
            $query->orderBy('id', 'desc');
        }

        return response()->json(
            $query->paginate(10)
        );
    }
    public function show($id)
    {
        $category = Category::findOrFail($id);

        return response()->json($category);
    }

    // 🟢 STORE
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = Category::create([
            'name' => $request->name,
        ]);

        return response()->json([
            'message' => 'Category created',
            'category' => $category
        ]);
    }

    // ✏️ UPDATE
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category->update([
            'name' => $request->name,
        ]);

        return response()->json([
            'message' => 'Category updated',
            'category' => $category
        ]);
    }

    // 🗑 DELETE
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json([
            'message' => 'Category deleted'
        ]);
    }
}
