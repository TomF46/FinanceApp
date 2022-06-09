<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\User;
use App\Enums\Roles;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class AreaManagersController extends Controller
{
    /**
     * Returns list of Area managers who are active
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $areaManagers = User::where('role', '=', Roles::AreaManager)->where('active', true)->get();
        $areaManagers = $areaManagers->map(function ($user) {
            return $user->map();
        });
        return response()->json($areaManagers);
    }

    /**
     * Returns Area Manager by ID
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return response()->json($user->mapAsAreaManager());
    }
}
