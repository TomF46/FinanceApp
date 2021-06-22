<?php

namespace App\Http\Controllers;

use App\Models\Area;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class AreasController extends Controller
{
    public function index(Request $request)
    {
        $areas = null;

        if ($request->input('paginated', false) == true) {
            $areas = Area::paginate(20);
            $areas->getCollection()->transform(function ($area) {
                return $area->map();
            });
            return response()->json($areas);
        } else {
            $areas = Area::all()->map(function ($area) {
                return $area->map();
            });
        }
    return response()->json($areas);
    }

    public function show(Area $area)
    {
        return response()->json($area->map());
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

    public function destroy(Area $area)
    {
        $area->delete();
        return response()->noContent();
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
}
