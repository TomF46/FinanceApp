<?php

namespace App\Filters;

use App\Models\Application;
use Illuminate\Http\Request;

class ApplicationSearch
{
    public static function apply(Request $filters)
    {
        $application = (new Application)->newQuery();

        if ($filters->has('year') && $filters->input('year') !== null) {
            $application->where('year_id', $filters->input('year'));
        }

        if ($filters->has('status') && $filters->input('status') !== null) {
            $application->where('status', $filters->input('status'));
        }

        if ($filters->has('priority') && $filters->input('priority') !== null) {
            $application->where('priority', $filters->input('priority'));
        }

        

        return $application;
    }
}
