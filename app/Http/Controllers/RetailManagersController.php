<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\User;
use App\Enums\Roles;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class RetailManagersController extends Controller
{
    public function index(Request $request)
    {
        $retailManagers = User::where('role', '=', Roles::RetailManager)->get();
        $retailManagers = $retailManagers->map(function ($user) {
            return $user->map();
        });
        return response()->json($retailManagers);
    }
}
