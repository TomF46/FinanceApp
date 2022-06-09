<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\RetailLocation;


class RetailLocationGraphsController extends Controller
{
    /**
     * Returns graph data for given retail location
     *
     * @param RetailLocation $retailLocation
     * @return \Illuminate\Http\Response
     */
    public function yearByYearProfitBarChart(RetailLocation $retailLocation)
    {
        return response()->json($retailLocation->mapYearByYearProfitBarChart());
    }
}
