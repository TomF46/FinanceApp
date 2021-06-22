<?php

namespace App\Http\Controllers;

use App\Models\RetailLocation;
use App\Models\Area;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class RetailLocationsController extends Controller
{
    public function index(Request $request)
    {
        $retailLocations = null;

        if ($request->input('paginated', false) == true) {
            $retailLocations = RetailLocation::paginate(20);
            $retailLocations->getCollection()->transform(function ($retailLocation) {
                return $retailLocation->map();
            });
        } else {
            $retailLocations = RetailLocation::all()->map(function ($retailLocation) {
                return $retailLocation->map();
            });
        }
        return response()->json($retailLocations);
    }

    public function show(RetailLocation $retailLocation)
    {
        return response()->json($retailLocation->map());
    }

    public function store(Request $request)
    {
        $attributes = $this->validateRetailLocation($request);

        $area = Area::find($attributes['area_id']);
        if (!$area) return response()->json(['error' => 'Area must exist.'], 400);

        $retailLocation = RetailLocation::create([
            'name' => $attributes['name'],
            'location' => $attributes['location'],
            'area_id' => $area->id,
        ]);

        return response()->json($retailLocation, 201);
    }

    public function update(Request $request, RetailLocation $retailLocation)
    {
        $attributes = $this->validateRetailLocationUpdate($request, $retailLocation);
        $retailLocation->name = $attributes['name'];
        $retailLocation->location = $attributes['location'];

        $area = Area::find($attributes['area_id']);
        if (!$area) return response()->json(['error' => 'Area must exist.'], 400);
        $retailLocation->area = $area;

        $retailLocation->update($attributes);
        $retailLocation = $retailLocation->fresh();
        return response()->json($retailLocation);
    }

    public function destroy(RetailLocation $retailLocation)
    {
        $retailLocation->delete();
        return response()->noContent();
    }

    protected function validateRetailLocation(Request $request)
    {
        return $request->validate([
            'name' => 'required|unique:retail_locations|max:40',
            'location' => 'required|unique:retail_locations|max:60',
            'area_id' => ['required', 'exists:areas,id'],
        ]);
    }

    protected function validateRetailLocationUpdate(Request $request, RetailLocation $retailLocation)
    {
        return $request->validate([
            'name' => ['required', 'max:40', Rule::unique('retail_locations')->ignore($retailLocation)],
            'location' => ['required', 'max:60', Rule::unique('retail_locations')->ignore($retailLocation)],
            'area_id' => ['required', 'exists:areas,id']
        ]);
    }
}
