<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\User;
use App\Enums\Roles;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class RetailManagersController extends Controller
{
    /**
     * Returns list of Retail managers who are active
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $retailManagers = User::where('role', '=', Roles::RetailManager)->where('active', true)->get();
        $retailManagers = $retailManagers->map(function ($user) {
            return $user->map();
        });
        return response()->json($retailManagers);
    }

    /**
     * Returns Retail Manager by ID
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return response()->json($user->mapAsRetailManager());
    }
}
