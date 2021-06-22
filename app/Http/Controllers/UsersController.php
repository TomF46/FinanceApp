<?php

namespace App\Http\Controllers;

// use App\Filters\UserSearch;
use App\Models\User;
use App\Models\Role;
use App\Enums\Roles;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function index(Request $request)
    {
        $users = User::orderBy('role', 'asc')->paginate(20);
        $users->getCollection()->transform(function ($user) use ($request) {
            return $user->map();
        });
        return response()->json($users);
    }

    // public function filter(Request $request)
    // {
    //     $paginator = UserSearch::apply($request)->paginate(20);
    //     $paginator->getCollection()->transform(function ($user) use ($request) {
    //         return $user->map($request->User());
    //     });

    //     return response()->json($paginator);
    // }

    public function show(Request $request, User $user)
    {
        return response()->json($user->map());
    }

    public function update(Request $request, User $user)
    {
        return response()->json(['message' => 'Not Implemented!'], 501);
    }
}
