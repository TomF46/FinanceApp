<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Enums\Roles;

class RetailManager
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->user()->role == Roles::RetailManager) {
            return $next($request);
        }

        return response()->json(['error' => 'User is forbidden from performing this action'], 403);

    }
}
