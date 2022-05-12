<?php

namespace App\Filters;

use App\Models\User;
use Illuminate\Http\Request;

class UserSearch
{
    public static function apply(Request $filters)
    {
        $user = (new User)->newQuery();

        $user->where('active', true);


        if ($filters->has('firstName')) {
            $user->where('firstName', 'like', "{$filters->input('firstName')}%");
        }

        if ($filters->has('lastName')) {
            $user->where('lastName', 'like', "{$filters->input('lastName')}%");
        }

        if ($filters->has('role') && $filters->input('role') !== null) {
            $user->where('role', $filters->input('role'));
        }

        return $user;
    }
}
