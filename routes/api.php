<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', [App\Http\Controllers\AuthController::class, 'login']);
    Route::post('register', [App\Http\Controllers\AuthController::class, 'register']);
    
    Route::group([
        'middleware' => ['auth:api']
    ], function () {
        Route::get('logout', [App\Http\Controllers\AuthController::class, 'logout']);
        Route::get('user', [App\Http\Controllers\AuthController::class, 'user']);
    });
});

Route::middleware(['auth:api'])->group(function () {
    Route::get('/me/isAdmin', [App\Http\Controllers\MeController::class, 'isAdmin']);

    Route::get('/areas', [App\Http\Controllers\AreasController::class, 'index']);
    Route::get('/areas/{area}', [App\Http\Controllers\AreasController::class, 'show']);

    Route::get('/retailLocations', [App\Http\Controllers\RetailLocationsController::class, 'index']);
    Route::get('/retailLocations/{retailLocation}', [App\Http\Controllers\RetailLocationsController::class, 'show']);
});


Route::middleware(['auth:api', 'admin'])->group(function () {
    Route::post('/retailer/register', [App\Http\Controllers\AuthController::class, 'registerRetailer']);
    Route::post('/area/register', [App\Http\Controllers\AuthController::class, 'registerAreaManager']);
    Route::post('/headoffice/register', [App\Http\Controllers\AuthController::class, 'registerHeadOffice']);

    Route::get('/users', [App\Http\Controllers\UsersController::class, 'index']);
    Route::get('/users/{user}', [App\Http\Controllers\UsersController::class, 'show']);
    Route::put('/users/{user}', [App\Http\Controllers\UsersController::class, 'update']);

    Route::post('/areas', [App\Http\Controllers\AreasController::class, 'store']);
    Route::delete('/area/{area}', [App\Http\Controllers\AreasController::class, 'destroy']);
    Route::put('/areas/{area}', [App\Http\Controllers\AreasController::class, 'update']);

    Route::post('/retailLocations', [App\Http\Controllers\RetailLocationsController::class, 'store']);
    Route::delete('/retailLocations/{retailLocation}', [App\Http\Controllers\RetailLocationsController::class, 'destroy']);
    Route::put('/retailLocations/{retailLocation}', [App\Http\Controllers\RetailLocationsController::class, 'update']);
});
