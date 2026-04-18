<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('products', \App\Http\Controllers\ProductController::class);
    Route::resource('categories', \App\Http\Controllers\CategoryController::class);
});

require __DIR__ . '/auth.php';


// api routes
// Route::get('/api/products', [\App\Http\Controllers\Api\productsController::class, 'index']);
use App\Http\Controllers\Api\AuthController;

// Route::post('/api/login', [AuthController::class, 'login']);
// Route::post('/api/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');