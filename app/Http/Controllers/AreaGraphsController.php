<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\Area;


class AreaGraphsController extends Controller
{

    public function yearByYearProfitBarChart(Area $area)
    {
        return response()->json($area->mapYearByYearProfitBarChart());
    }

    public function retailerProfitContributionBarChart(Area $area)
    {
        return response()->json($area->mapRetailerProfitContributionBarChart());
    }
}
