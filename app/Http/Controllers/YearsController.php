<?php

namespace App\Http\Controllers;

use App\Models\Year;
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

    protected function validateYear(Request $request)
    {
        return $request->validate([
            'year' => 'required|unique:years|max:40',
            'publish' => 'required|boolean'
        ]);
    }

}
