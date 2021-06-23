<?php

namespace App\Http\Controllers;

use App\Models\Year;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class YearsController extends Controller
{
    public function index(Request $request)
    {
        $years = Year::all();
        return response()->json($years);
    }

    public function store(Request $request)
    {
        $attributes = $this->validateYear($request);

        $year = Year::create([
            'year' => $attributes['year']
        ]);

        $year->generateApplications();

        return response()->json($year, 201);
    }

    protected function validateYear(Request $request)
    {
        return $request->validate([
            'year' => 'required|unique:years|max:40'
        ]);
    }

}
