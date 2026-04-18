<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class ProductsController extends Controller
{
    // 🟢 GET products (public)
    public function index(Request $request)
    {
        $query = Product::query();
        $query->with('category'); // 🔥 مهم

        if ($request->filled('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('in_stock')) {
            if ($request->in_stock == 1) {
                $query->where('stock', '>', 0);
            } else {
                $query->where('stock', '=', 0);
            }
        }

        return response()->json(
            $query->latest()->paginate($request->per_page ?? 10)
        );
    }

    // 👑 CREATE product
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
        }

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'category_id' => $request->category_id,
            'image' => $imagePath,
        ]);

        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product
        ]);
    }

    

    // 👁 SHOW product
    public function show($id)
    {
        $product = Product::findOrFail($id);

        return response()->json($product);
    }

    // ✏️ UPDATE product
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|string',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric',
            'stock' => 'sometimes|integer',
            'category_id' => 'sometimes|exists:categories,id',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $imagePath = $product->image;

        // إذا جا image جديد → نحيد القديم
        if ($request->hasFile('image')) {

            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }

            $imagePath = $request->file('image')->store('products', 'public');
        }

        $product->update([
            'name' => $request->name ?? $product->name,
            'description' => $request->description ?? $product->description,
            'price' => $request->price ?? $product->price,
            'stock' => $request->stock ?? $product->stock,
            'category_id' => $request->category_id ?? $product->category_id,
            'image' => $imagePath,
        ]);

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product
        ]);
    }

    // 🗑 DELETE product
    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        // حذف الصورة من storage
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ]);
    }
}