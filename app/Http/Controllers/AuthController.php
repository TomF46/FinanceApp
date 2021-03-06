<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\User;
use App\Enums\Roles;

class AuthController extends Controller
{
    /**
     * Create a new user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $attributes = $this->validateRegistration($request);
        $user = new User([
            'firstName' => $attributes['firstName'],
            'lastName' => $attributes['lastName'],
            'email' => $attributes['email'],
            'password' => bcrypt($attributes['password'])
        ]);
        $user->save();
        return response()->json([
            'message' => 'Successfully created user!'
        ], 201);
    }

    /**
     * Create a new user with head office role
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function registerHeadOffice(Request $request)
    {
        $attributes = $this->validateRegistration($request);
        $this->registerWithRole($attributes, Roles::HeadOffice);
        
        return response()->json([
            'message' => 'Successfully created head office user!'
        ], 201);
    }

    /**
     * Create a new user with area manager role
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function registerAreaManager(Request $request)
    {
        $attributes = $this->validateRegistration($request);
        $this->registerWithRole($attributes, Roles::AreaManager);
        
        return response()->json([
            'message' => 'Successfully created area manager!'
        ], 201);
    }

    /**
     * Create a new user with retailer role
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function registerRetailer(Request $request)
    {
        $attributes = $this->validateRegistration($request);
        $this->registerWithRole($attributes, Roles::RetailManager);
        
        return response()->json([
            'message' => 'Successfully created retail manager!'
        ], 201);
    }

    /**
     * Return access token if details match stored user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $attributes = $this->validateLogin($request);
        $credentials = request(['email', 'password']);

        if (!Auth::guard('web')->attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);

        $user = $request->user();

        if($user->active == false) return response()->json([
            'message' => 'Unauthorized'
        ], 401);

        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;

        if ($request->remember_me) $token->expires_at = Carbon::now()->addWeeks(1);

        $token->save();

        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'user_id' => $user->id,
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }

    /**
     * Revoke access token for current user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Return currently logged in user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function user(Request $request)
    {
        return response()->json($request->user()->map());
    }

    /**
     * Updates password for the current user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function changePassword(Request $request)
    {
        $user = $request->user();
        $attributes = $this->validatePasswordChange($request);

        if (!Auth::guard('web')->attempt(['email' => $user->email, 'password' => $attributes['currentPassword']]))
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);

        $user->password = bcrypt($attributes['password']);
        $user->save();
        return response()->json([
            'message' => 'Password changed'
        ], 200);

    }


    protected function registerWithRole($attributes, $role)
    {
        $user = new User([
            'firstName' => $attributes['firstName'],
            'lastName' => $attributes['lastName'],
            'email' => $attributes['email'],
            'role' => $role,
            'password' => bcrypt($attributes['password'])
        ]);
        $user->save();
    }

    protected function validateRegistration(Request $request)
    {
        return $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed'
        ]);
    }

    protected function validateLogin(Request $request)
    {
        return $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);
    }

    protected function validatePasswordChange(Request $request)
    {
        return $request->validate([
            'currentPassword' => 'required|string',
            'password' => 'required|string|confirmed'
        ]);
    }
}
