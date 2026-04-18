<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\ProductsController;
use App\Http\Controllers\Api\CategoriesController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\api\OrderController;
use App\Http\Controllers\api\StripeController;
use App\Http\Controllers\Api\UserController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
      return $request->user();
});
Route::middleware('auth:sanctum')->group(function () {});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/auth/google', [AuthController::class, 'loginGoogle']);




// 👤 public
Route::get('/products', [ProductsController::class, 'index']);
Route::get('/products/{id}', [ProductsController::class, 'show']);
Route::get('/categories', [CategoriesController::class, 'index']);

// 👑 admin فقط
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
      Route::post('/products', [ProductsController::class, 'store']);
      Route::put('/products/{id}', [ProductsController::class, 'update']);
      Route::delete('/products/{id}', [ProductsController::class, 'destroy']);
      Route::post('/products', [ProductsController::class, 'store']);
      Route::put('/products/{id}', [ProductsController::class, 'update']);
      Route::delete('/products/{id}', [ProductsController::class, 'destroy']);




      Route::post('/categories', [CategoriesController::class, 'store']);
      Route::put('/categories/{id}', [CategoriesController::class, 'update']);
      Route::delete('/categories/{id}', [CategoriesController::class, 'destroy']);
      Route::get('/category/{id}', [CategoriesController::class, 'show']);
      Route::get('/admin/users', [UserController::class, 'index']);
      Route::delete('/admin/users/{id}', [UserController::class, 'destroy']);
      Route::put('/admin/users/{id}/role', [UserController::class, 'updateRole']);
      Route::get('/admin/orders', [OrderController::class, 'adminIndex']);
      Route::get('/admin/dashboard', [DashboardController::class, 'index']);

      // Route::get('/admin/users', [UserController::class, 'index']);
});



Route::middleware('auth:sanctum')->group(function () {
      Route::post('/cart/add', [CartController::class, 'add']);
      // Route::post('/checkout', [CartController::class, 'checkout']);
      Route::get('/cart', [CartController::class, 'getCart']);
      Route::get('/cart/count', [CartController::class, 'countCart']);
      Route::put('/cart/{id}', [CartController::class, 'updateQuantity']);
      Route::delete('/cart/{id}', [CartController::class, 'deleteItem']);

      Route::get('/me', [AuthController::class, 'me']);
      Route::post('/logout', [AuthController::class, 'logout']);


      // 🛒 Checkout (create order from cart)
      Route::post('/checkout', [OrderController::class, 'checkout']);

      // 💳 Create Stripe payment session
      Route::post('/stripe/session/{orderId}', [StripeController::class, 'createSession']);

      // 📦 Get user orders
      Route::get('/orders', [OrderController::class, 'index']);

      // 📦 Get single order
      Route::get('/orders/{id}', [OrderController::class, 'show']);

      // 🔥 mark order as paid (fallback after success page)
      Route::post('/orders/{id}/mark-paid', [OrderController::class, 'markPaid']);
      Route::middleware('auth:sanctum')->get('/orders', [OrderController::class, 'userOrders']);
      Route::post('/stripe/webhook', [StripeController::class, 'webhook']);
});
