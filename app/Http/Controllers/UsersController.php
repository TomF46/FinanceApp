<?php

namespace App\Http\Controllers;

use App\Filters\UserSearch;
use App\Models\User;
use App\Enums\Roles;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;


class UsersController extends Controller
{
    /**
     * Return paginated list of active users.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::orderBy('role', 'asc')->where('active', true)->paginate(20);
        $users->getCollection()->transform(function ($user){
            return $user->map();
        });
        return response()->json($users);
    }

    /**
     * Returns Users that match filter request
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function filter(Request $request)
    {
        $paginator = UserSearch::apply($request)->paginate(20);
        $paginator->getCollection()->transform(function ($user){
            return $user->map();
        });

        return response()->json($paginator);
    }

    /**
     * Returns the user given by its ID.
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return response()->json($user->mapDetailed());
    }

    /**
     * Updates the user given by its ID.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $attributes = $this->validateUpdate($request);
        $user->update($attributes);
        $user = $user->fresh();
        return response()->json($user);
    }

    /**
     * Deactivate the user given by its ID. (User is not deleted from DB)
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function deactivate(User $user)
    {
        $user->active = false;
        $user->save();
        return response()->noContent();
    }

    /**
     * Updates password for the user given by its ID. (Admins can change non admins passwords)
     *
     * @param  \Illuminate\Http\Request  $request
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function changePassword(Request $request, User $user)
    {
        $attributes = $this->validatePasswordChange($request);
        
        $user->password = bcrypt($attributes['password']);
        $user->save();
        return response()->json([
            'message' => 'Password changed'
        ], 200);
    }

    protected function validateUpdate(Request $request)
    {
        return $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255'
        ]);
    }

    protected function validatePasswordChange(Request $request)
    {
        return $request->validate([
            'password' => 'required|string|confirmed'
        ]);
    }

}
