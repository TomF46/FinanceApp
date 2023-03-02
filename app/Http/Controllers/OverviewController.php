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

    public function downloadYearByYearCSV(){
        $overview = new Overview();
        $fileName = 'YearByYearOverview.csv';
        $headers = array(
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        );
        
        return response()->stream($overview->mapYearByYearOverviewCSV(), 200, $headers);
    }

    public function downloadAllApplicationsCSV(){
        $overview = new Overview();
        $fileName = 'AllApplications.csv';
        $headers = array(
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        );
        
        return response()->stream($overview->mapApplicationsAsCSV(), 200, $headers);
    }
}
