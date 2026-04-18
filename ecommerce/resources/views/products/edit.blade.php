@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Edit Product</h1>
    <form action="{{ route('products.update', $product->id) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')

        <input type="text" name="name" placeholder="Product Name" class="form-control mb-2" value="{{ $product->name }}">
        <input type="text" name="description" placeholder="Product Description" class="form-control mb-2" value="{{ $product->description }}">
        <input type="number" name="price" placeholder="Product Price" class="form-control mb-2" value="{{ $product->price }}">
        <input type="number" name="stock" placeholder="Product Stock" class="form-control mb-2" value="{{ $product->stock }}">
        <input type="file" name="image" class="form-control mb-2">

        <button type="submit" class="btn btn-primary">Update Product</button>
    </form>
</div>
@endsection