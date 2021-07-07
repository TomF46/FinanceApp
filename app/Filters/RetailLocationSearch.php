<?php

namespace App\Filters;

use App\Models\RetailLocation;
use Illuminate\Http\Request;

class RetailLocationSearch
{
    public static function apply(Request $filters)
    {
        $retailLocation = (new RetailLocation)->newQuery();

        $retailLocation->where('active', true);

        if ($filters->has('name')) {
            $retailLocation->where('name', 'like', "{$filters->input('name')}%");
        }

        if ($filters->has('location')) {
            $retailLocation->where('location', 'like', "{$filters->input('location')}%");
        }

        return $retailLocation;
    }
}
