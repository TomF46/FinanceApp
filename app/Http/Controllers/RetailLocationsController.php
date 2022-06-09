<?php

namespace App\Http\Controllers;

use App\Models\RetailLocation;
use App\Models\Area;
use App\Models\User;
use App\Enums\Roles;
use App\Filters\RetailLocationSearch;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class RetailLocationsController extends Controller
{
    /**
     * Return paginated list of active retail locations.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $retailLocations = null;

        if ($request->input('paginated', false) == true) {
            $retailLocations = RetailLocation::where('active', true)->paginate(20);
            $retailLocations->getCollection()->transform(function ($retailLocation) {
                return $retailLocation->map();
            });
        } else {
            $retailLocations = RetailLocation::where('active', true)->get()->map(function ($retailLocation) {
                return $retailLocation->map();
            });
        }
        return response()->json($retailLocations);
    }

    /**
     * Returns retail locations that match filter request
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function filter(Request $request)
    {
        $paginator = RetailLocationSearch::apply($request)->paginate(20);
        $paginator->getCollection()->transform(function ($retailLocation){
            return $retailLocation->map();
        });

        return response()->json($paginator);
    }

    /**
     * Returns retail location by its ID.
     *
     * @param RetailLocation $retailLocation
     * @return \Illuminate\Http\Response
     */
    public function show(RetailLocation $retailLocation)
    {
        return response()->json($retailLocation->mapDetailed());
    }
    
    /**
     * Returns retail location data view by its ID.
     *
     * @param RetailLocation $retailLocation
     * @return \Illuminate\Http\Response
     */
    public function showData(RetailLocation $retailLocation)
    {
        return response()->json($retailLocation->mapData());
    }

    /**
     * Store new Retail Location
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
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

    /**
     * Updates the retail location by its ID.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param RetailLocation $retailLocation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, RetailLocation $retailLocation)
    {
        $attributes = $this->validateRetailLocationUpdate($request, $retailLocation);
        $retailLocation->name = $attributes['name'];
        $retailLocation->location = $attributes['location'];

        $area = Area::find($attributes['area_id']);
        if (!$area) return response()->json(['error' => 'Area must exist.'], 400);
        $retailLocation->area_id = $area->id;

        $retailLocation->save();
        $retailLocation = $retailLocation->fresh();
        return response()->json($retailLocation);
    }   

    /**
     * Deactivate the retail location by its ID. (Location is not deleted from DB)
     *
     * @param RetailLocation $retailLocation
     * @return \Illuminate\Http\Response
     */
    public function deactivate(RetailLocation $retailLocation)
    {
        $retailLocation->deactivate();
        return response()->noContent();
    }

    /**
     * Assign manager (User) to Retail Location
     *
     * @param  \Illuminate\Http\Request  $request
     * @param RetailLocation $retailLocation
     * @return \Illuminate\Http\Response
     */
    public function addManager(Request $request, RetailLocation $retailLocation)
    {
        $attributes = $this->validateAddManager($request);

        $user = User::find($attributes['user_id']);
        if (!$user) return response()->json(['error' => 'User must exist.'], 400);
        if ($user->role != Roles::RetailManager ) return response()->json(['error' => 'User must be a retail manager.'], 400);

        $retailLocation->managers()->save($user);
        $retailLocation = $retailLocation->fresh();

        return response()->json($retailLocation);
    }

    /**
     * Deassign manager (User) from Retail Location
     *
     * @param  \Illuminate\Http\Request  $request
     * @param RetailLocation $retailLocation
     * @return \Illuminate\Http\Response
     */
    public function removeManager(RetailLocation $retailLocation, User $user)
    {
        $retailLocation->managers()->detach($user);
        $retailLocation = $retailLocation->fresh();

        return response()->json($retailLocation);
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

    protected function validateAddManager(Request $request)
    {
        return $request->validate([
            'user_id' => ['required', 'exists:users,id'],
        ]);
    }
}
