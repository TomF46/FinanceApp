<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MeController extends Controller
{
    public function isAdmin(Request $request)
    {
        return response()->json(
            [
                'isAdmin' => $request->user()->isAdmin()
            ]
        );
    }
}
