<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Enums\Roles;

class HeadOffice
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
        if ($request->user()->role == Roles::Administrator || $request->user()->role == Roles::HeadOffice) {
            return $next($request);
        }

        return response()->json(['error' => 'Unauthorized.'], 401);
    }
}
