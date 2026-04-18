@extends('layouts.app')

@section('content')

<div>
      <a href="{{ route('products.index') }}" class="btn btn-secondary mb-2">Back to Products</a>
      <form action="{{ route('products.store') }}" method="POST"  enctype="multipart/form-data">
            @csrf

            <input type="text" name="name" placeholder="Product Name" class="form-control mb-2">
            <input type="text" name="description" placeholder="Product Description" class="form-control mb-2">
            <input type="number" name="price" placeholder="Product Price" class="form-control mb-2">
            <input type="number" name="stock" placeholder="Product Stock" class="form-control mb-2">
            <select name="category_id" class="form-control mb-2">
                  <option value="">Select Category</option>
                  @foreach($categories as $category)
                        <option value="{{ $category->id }}">{{ $category->name }}</option>
                  @endforeach
            </select>

            <input type="file" name="image" class="form-control mb-2">
            <button type="submit" class="btn btn-primary">Create Product</button>
      </form>
</div>
    
@endsection