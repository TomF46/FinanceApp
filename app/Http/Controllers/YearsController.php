<?php

namespace App\Http\Controllers;

use App\Models\Year;
use App\Enums\ApplicationStatus;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class YearsController extends Controller
{
    /**
     * Returns list of Years
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $years = Year::all()->map(function ($year) {
            return $year->map();
        });
        return response()->json($years);
    }

    /**
     * Returns the Year by its ID.
     *
     * @param Year $year
     * @return \Illuminate\Http\Response
     */
    public function show(Year $year)
    {
        return response()->json($year->mapDetail());
    }

    /**
     * Stores a new Year
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $attributes = $this->validateYear($request);

        $year = Year::create([
            'year' => $attributes['year'],
            'published' => $attributes['publish']
        ]);

        if($year->published) $year->generateApplications();

        return response()->json($year, 201);
    }

    public function publish(Request $request, Year $year)
    {
        $year->publish();
        return response()->noContent();
    }

    public function getApplicationsForYear(Request $request, Year $year)
    {
        $applications = $year->applications()->paginate(20);
        $applications->getCollection()->transform(function ($application) {
            return $application->map();
        });

        return response()->json($applications);
    }

    public function downloadApplicationsAsCSV(Year $year){
        $fileName = $year->year . 'Applications.csv';
        $headers = array(
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        );
        
        return response()->stream($year->mapApplicationsAsCSV(), 200, $headers);
    }

    public function setPriorityLevel(Request $request, Year $year)
    {
        $user = $request->user();

        $attributes = $this->validatePriorityLevel($request);

        $year->setPriorityLevelForApplications($attributes['priority']);

        $year = $year->fresh();
        return response()->json($year->map());
    }

    protected function validatePriorityLevel(Request $request)
    {
        return $request->validate([
            'priority' => 'required'
        ]);
    }

    protected function validateYear(Request $request)
    {
        return $request->validate([
            'year' => 'required|unique:years|max:40',
            'publish' => 'required|boolean'
        ]);
    }

}
