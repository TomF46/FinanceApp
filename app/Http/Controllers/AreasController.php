<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\User;
use App\Enums\Roles;
use App\Filters\AreaSearch;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class AreasController extends Controller
{
    public function index(Request $request)
    {
        $areas = null;

        if ($request->input('paginated', false) == true) {
            $areas = Area::where('active', true)->paginate(20);
            $areas->getCollection()->transform(function ($area) {
                return $area->map();
            });
            return response()->json($areas);
        } else {
            $areas = Area::where('active', true)->get()->map(function ($area) {
                return $area->map();
            });
        }
    return response()->json($areas);
    }

    public function filter(Request $request)
    {
        $paginator = AreaSearch::apply($request)->paginate(20);
        $paginator->getCollection()->transform(function ($area){
            return $area->map();
        });

        return response()->json($paginator);
    }

    public function show(Area $area)
    {
        return response()->json($area->mapDetail());
    }

    public function showData(Area $area)
    {
        return response()->json($area->mapData());
    }

    public function store(Request $request)
    {
        $attributes = $this->validateArea($request);

        $area = Area::create([
            'name' => $attributes['name']
        ]);

        return response()->json($area, 201);
    }

    public function update(Request $request, Area $area)
    {
        $attributes = $this->validateAreaUpdate($request, $area);
        $area->name = $attributes['name'];
        $area->update($attributes);
        $area = $area->fresh();
        return response()->json($area);
    }

    public function deactivate(Area $area)
    {
        $area->deactivate();
        return response()->noContent();
    }

    public function addManager(Request $request, Area $area)
    {
        $attributes = $this->validateAddManager($request);

        $user = User::find($attributes['user_id']);
        if (!$user) return response()->json(['error' => 'User must exist.'], 400);
        if ($user->role != Roles::AreaManager ) return response()->json(['error' => 'User must be an area manager.'], 400);

        $area->managers()->save($user);
        $area = $area->fresh();

        return response()->json($area);
    }

    public function removeManager(Area $area, User $user)
    {
        $area->managers()->detach($user);
        $area = $area->fresh();

        return response()->json($area);
    }

    protected function validateArea(Request $request)
    {
        return $request->validate([
            'name' => 'required|unique:areas|max:40'
        ]);
    }

    protected function validateAreaUpdate(Request $request, Area $area)
    {
        return $request->validate([
            'name' => ['required', 'max:40', Rule::unique('areas')->ignore($area)]
        ]);
    }

    protected function validateAddManager(Request $request)
    {
        return $request->validate([
            'user_id' => ['required', 'exists:users,id'],
        ]);
    }
}
