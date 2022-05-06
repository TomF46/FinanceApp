<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\Overview;


class OverviewController extends Controller
{
    public function index()
    {
        $overview = new Overview();
        return response()->json($overview->map());
    }

    public function yearByYearProfitBarChart()
    {
        $overview = new Overview();
        return response()->json($overview->mapYearByYearProfitBarChart());
    }
}
