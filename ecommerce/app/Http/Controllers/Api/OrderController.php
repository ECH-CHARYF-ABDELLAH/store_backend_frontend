<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{



    public function userOrders(Request $request)
    {
        $user = auth()->user();

        $query = Order::with(['items.product'])
            ->where('user_id', $user->id);

        // 🔍 filter by product name
        if ($request->filled('product')) {
            $query->whereHas('items.product', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->product . '%');
            });
        }

        // 💰 filter by price
        if ($request->filled('min_price')) {
            $query->where('total_price', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('total_price', '<=', $request->max_price);
        }

        // 📊 sort price
        if ($request->filled('price_sort')) {
            $query->orderBy('total_price', $request->price_sort);
        }

        // 📅 sort date
        if ($request->filled('date_sort')) {
            $query->orderBy('created_at', $request->date_sort);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $orders = $query->paginate(10);

        return response()->json($orders);
    }

    public function adminIndex(Request $request)
    {
        $query = Order::with(['user', 'items.product']);

        // 🔍 filter by user name
        if ($request->filled('user')) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->user . '%');
            });
        }

        // 🔍 filter by product name
        if ($request->filled('product')) {
            $query->whereHas('items.product', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->product . '%');
            });
        }

        // 💰 filter by min price
        if ($request->filled('min_price')) {
            $query->where('total_price', '>=', $request->min_price);
        }

        // 💰 filter by max price
        if ($request->filled('max_price')) {
            $query->where('total_price', '<=', $request->max_price);
        }

        // ⬆️⬇️ sort by price
        if ($request->filled('price_sort')) {
            $query->orderBy('total_price', $request->price_sort); // asc | desc
        }

        // 📅 sort by date
        if ($request->filled('date_sort')) {
            $query->orderBy('created_at', $request->date_sort); // asc | desc
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $orders = $query->paginate(10);

        return response()->json($orders);
    }
    public function checkout()
    {
        $user = auth()->user();

        $cartItems = CartItem::with('product')
            ->where('user_id', $user->id)
            ->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Cart empty'], 400);
        }

        DB::beginTransaction();

        try {

            // 🧾 1. Create Order
            $order = Order::create([
                'user_id' => $user->id,
                'total_price' => 0,
                'status' => 'pending',
                'payment_method' => 'stripe',
            ]);

            $total = 0;

            foreach ($cartItems as $item) {

                // 🔐 LOCK PRODUCT (prevent race condition)
                $product = \App\Models\Product::where('id', $item->product_id)
                    ->lockForUpdate()
                    ->first();

                // ❌ stock validation
                if ($product->stock < $item->quantity) {
                    DB::rollBack();

                    return response()->json([
                        'message' => 'Not enough stock',
                        'product' => $product->name,
                        'available_stock' => $product->stock
                    ], 400);
                }

                // 📦 create order item (snapshot price)
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $product->price,
                ]);

                // 🔥 decrease stock
                $product->decrement('stock', $item->quantity);

                $total += $product->price * $item->quantity;
            }

            // 💰 update total
            $order->update([
                'total_price' => $total
            ]);

            // 🧹 clear cart (optional هنا ولا ف webhook)
            CartItem::where('user_id', $user->id)->delete();

            DB::commit();

            return response()->json([
                'order_id' => $order->id,
                'total' => $total,
                'status' => 'success'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Checkout failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
