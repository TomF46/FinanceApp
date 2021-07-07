<?php

namespace App\Filters;

use App\Models\Area;
use Illuminate\Http\Request;

class AreaSearch
{
    public static function apply(Request $filters)
    {
        $area = (new Area)->newQuery();

        $area->where('active', true);

        if ($filters->has('name')) {
            $area->where('name', 'like', "{$filters->input('name')}%");
        }

        return $area;
    }
}
