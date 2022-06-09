<?php

namespace App\Http\Controllers;

use App\Models\Year;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class YearsGraphsController extends Controller
{
    /**
     * Returns graph data for given Year
     *
     * @param Year $year
     * @return \Illuminate\Http\Response
     */
    public function areasProfitBarChart(Year $year)
    {
        return response()->json($year->mapAreasProfitBarChart());
    }

    /**
     * Returns graph data for given Year
     *
     * @param Year $year
     * @return \Illuminate\Http\Response
     */
    public function retailProfitBarChart(Year $year)
    {
        return response()->json($year->mapRetailProfitBarChart());
    }

    /**
     * Returns graph data for given Year
     *
     * @param Year $year
     * @return \Illuminate\Http\Response
     */
    public function retailProfitPieChart(Year $year)
    {
        return response()->json($year->mapRetailProfitPieChart());
    }
}
