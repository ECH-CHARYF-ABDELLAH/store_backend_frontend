<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // 👤 users count
        $users = User::count();

        // 📦 products count
        $products = Product::count();

        // 📁 categories count
        $categories = Category::count();

        // 💰 total sales (paid orders)
        $totalSales = Order::where('status', 'paid')->sum('total_price');

        // 📊 orders per day (chart data)
        $salesByDay = Order::select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('SUM(total_price) as total')
            )
            ->where('status', 'paid')
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        return response()->json([
            'users' => $users,
            'products' => $products,
            'categories' => $categories,
            'total_sales' => $totalSales,
            'sales_by_day' => $salesByDay,
        ]);
    }
}