<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MeController extends Controller
{
    /**
     * Returns boolean indicating if the current user is an admin
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function isAdmin(Request $request)
    {
        return response()->json(
            [
                'isAdmin' => $request->user()->isAdmin()
            ]
        );
    }
}
