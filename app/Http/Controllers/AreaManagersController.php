<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\User;
use App\Enums\Roles;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class AreaManagersController extends Controller
{
    public function index(Request $request)
    {
        $areaManagers = User::where('role', '=', Roles::AreaManager)->get();
        $areaManagers = $areaManagers->map(function ($user) {
            return $user->map();
        });
        return response()->json($areaManagers);
    }

    public function show(Request $request, User $user)
    {
        return response()->json($user->mapAsAreaManager());
    }
}
