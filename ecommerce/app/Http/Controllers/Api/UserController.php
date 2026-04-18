<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // 📄 GET all users
    public function index(Request $request)
    {
        $query = User::query();

        // 🔍 search by name/email
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        // 🎭 filter by role
        if ($request->filled('role')) {
            $query->where('role', $request->role);
        }

        // 📅 sort
        if ($request->filled('date_sort')) {
            $query->orderBy('created_at', $request->date_sort);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        return response()->json($query->paginate(10));
    }

    // ❌ DELETE user
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        // 🚫 prevent deleting yourself (important)
        if ($user->id === auth()->id()) {
            return response()->json([
                'message' => 'You cannot delete yourself'
            ], 403);
        }

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully'
        ]);
    }

    // 🔄 UPDATE role
    public function updateRole(Request $request, $id)
    {
        $request->validate([
            'role' => 'required|in:admin,user'
        ]);

        $user = User::findOrFail($id);

        $user->update([
            'role' => $request->role
        ]);

        return response()->json([
            'message' => 'Role updated',
            'user' => $user
        ]);
    }
}