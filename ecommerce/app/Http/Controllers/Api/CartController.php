<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function add(Request $request)
    {
        CartItem::create([
            'user_id' => auth()->id(),
            'product_id' => $request->product_id,
            'quantity' => $request->quantity
        ]);

        return response()->json(['message' => 'added']);
    }
    public function checkout()
    {
        $items = CartItem::where('user_id', auth()->id())->get();

        $total = 0;

        foreach ($items as $item) {
            $total += $item->product->price * $item->quantity;
        }

        $order = Order::create([
            'user_id' => auth()->id(),
            'total_price' => $total
        ]);

        foreach ($items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->product->price
            ]);
        }

        CartItem::where('user_id', auth()->id())->delete();

        return response()->json(['message' => 'order done']);
    }
    public function getCart(Request $request)
    {
        $query = CartItem::with(['product.category'])
            ->where('user_id', auth()->id());

        // 🔍 filter by product name
        if ($request->filled('name')) {
            $query->whereHas('product', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->name . '%');
            });
        }

        // 🏷️ filter by category
        if ($request->filled('category_id')) {
            $query->whereHas('product', function ($q) use ($request) {
                $q->where('category_id', $request->category_id);
            });
        }

        // 💰 sort by price
        if ($request->sort === 'asc') {
            $query->join('products', 'cart_items.product_id', '=', 'products.id')
                ->orderBy('products.price', 'asc')
                ->select('cart_items.*');
        } elseif ($request->sort === 'desc') {
            $query->join('products', 'cart_items.product_id', '=', 'products.id')
                ->orderBy('products.price', 'desc')
                ->select('cart_items.*');
        }

        // 📄 pagination
        $items = $query->paginate(6);

        return response()->json($items);
    }

    public function countCart()
    {
        $count = CartItem::where('user_id', auth()->id())
            ->sum('quantity');

        return response()->json([
            'count' => $count
        ]);
    }

    public function updateQuantity(Request $request, $id)
    {
        $item = CartItem::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $item->update([
            'quantity' => $request->quantity
        ]);

        return response()->json(['message' => 'updated']);
    }

    public function deleteItem($id)
    {
        $item = CartItem::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $item->delete();

        return response()->json(['message' => 'deleted']);
    }
}
