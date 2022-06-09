<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\Overview;


class OverviewController extends Controller
{

    /**
     * Returns data overview
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $overview = new Overview();
        return response()->json($overview->map());
    }

    /**
     * Returns overview graph data
     *
     * @return \Illuminate\Http\Response
     */
    public function yearByYearProfitBarChart()
    {
        $overview = new Overview();
        return response()->json($overview->mapYearByYearProfitBarChart());
    }
}
