<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\Area;


class AreaGraphsController extends Controller
{
    /**
     * Returns graph data for given Area
     *
     * @param Area $area
     * @return \Illuminate\Http\Response
     */
    public function yearByYearProfitBarChart(Area $area)
    {
        return response()->json($area->mapYearByYearProfitBarChart());
    }

    /**
     * Returns graph data for given Area
     *
     * @param Area $area
     * @return \Illuminate\Http\Response
     */
    public function retailerProfitContributionBarChart(Area $area)
    {
        return response()->json($area->mapRetailerProfitContributionBarChart());
    }
}
