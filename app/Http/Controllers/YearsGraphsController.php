<?php

namespace App\Http\Controllers;

use App\Models\Year;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class YearsGraphsController extends Controller
{
    public function retailBarChart(Year $year)
    {
        return response()->json($year->mapRetailBarChart());
    }

    public function profitPieChart(Year $year)
    {
        return response()->json($year->mapProfitPieChart());
    }
}
