<?php

namespace App\Filters;

use App\Models\Application;
use Illuminate\Http\Request;

class ApplicationSearch
{
    public static function apply(Request $filters)
    {
        $application = (new Application)->newQuery();

        if ($filters->has('year')) {
            $application->where('year_id', $filters->input('year'));
        }

        return $application;
    }
}
