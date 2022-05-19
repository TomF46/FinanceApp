<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\RetailLocation;


class RetailLocationGraphsController extends Controller
{

    public function yearByYearProfitBarChart(RetailLocation $retailLocation)
    {
        return response()->json($retailLocation->mapYearByYearProfitBarChart());
    }
}
