<?php

namespace App\Http\Controllers;

use App\Models\Year;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class YearsGraphsController extends Controller
{
    public function areasProfitBarChart(Year $year)
    {
        return response()->json($year->mapAreasProfitBarChart());
    }

    public function retailProfitBarChart(Year $year)
    {
        return response()->json($year->mapRetailProfitBarChart());
    }

    public function retailProfitPieChart(Year $year)
    {
        return response()->json($year->mapRetailProfitPieChart());
    }
}
