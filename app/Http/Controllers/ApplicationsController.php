<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class ApplicationsController extends Controller
{
    public function show(Request $request, Application $application)
    {
        return response()->json($application->mapDetail());
    }
}
