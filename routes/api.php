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

    Route::get('/retailManagers/{user}', [App\Http\Controllers\RetailManagersController::class, 'show']);
    Route::get('/areaManagers/{user}', [App\Http\Controllers\AreaManagersController::class, 'show']);

    Route::get('/years', [App\Http\Controllers\YearsController::class, 'index']);
    Route::get('/applications/{application}', [App\Http\Controllers\ApplicationsController::class, 'show']);

    Route::get('/products', [App\Http\Controllers\ProductsController::class, 'index']);


});


Route::middleware(['auth:api', 'admin'])->group(function () {
    Route::post('/retailer/register', [App\Http\Controllers\AuthController::class, 'registerRetailer']);
    Route::post('/area/register', [App\Http\Controllers\AuthController::class, 'registerAreaManager']);
    Route::post('/headoffice/register', [App\Http\Controllers\AuthController::class, 'registerHeadOffice']);

    Route::get('/users', [App\Http\Controllers\UsersController::class, 'index']);
    Route::get('/users/{user}', [App\Http\Controllers\UsersController::class, 'show']);
    Route::put('/users/{user}', [App\Http\Controllers\UsersController::class, 'update']);
    Route::post('/users/{user}/deactivate', [App\Http\Controllers\UsersController::class, 'deactivate']);

    Route::post('/areas', [App\Http\Controllers\AreasController::class, 'store']);
    Route::delete('/area/{area}', [App\Http\Controllers\AreasController::class, 'destroy']);
    Route::put('/areas/{area}', [App\Http\Controllers\AreasController::class, 'update']);
    Route::post('/areas/{area}/managers', [App\Http\Controllers\AreasController::class, 'addManager']);
    Route::post('/areas/{area}/managers/{user}/remove', [App\Http\Controllers\AreasController::class, 'removeManager']);
    Route::post('/areas/{area}/deactivate', [App\Http\Controllers\AreasController::class, 'deactivate']);


    Route::post('/retailLocations', [App\Http\Controllers\RetailLocationsController::class, 'store']);
    Route::delete('/retailLocations/{retailLocation}', [App\Http\Controllers\RetailLocationsController::class, 'destroy']);
    Route::put('/retailLocations/{retailLocation}', [App\Http\Controllers\RetailLocationsController::class, 'update']);
    Route::post('/retailLocations/{retailLocation}/managers', [App\Http\Controllers\RetailLocationsController::class, 'addManager']);
    Route::post('/retailLocations/{retailLocation}/managers/{user}/remove', [App\Http\Controllers\RetailLocationsController::class, 'removeManager']);
    Route::post('/retailLocations/{retailLocation}/deactivate', [App\Http\Controllers\RetailLocationsController::class, 'deactivate']);

    Route::get('/areaManagers', [App\Http\Controllers\AreaManagersController::class, 'index']);
    Route::get('/retailManagers', [App\Http\Controllers\RetailManagersController::class, 'index']);

    Route::post('/products', [App\Http\Controllers\ProductsController::class, 'store']);
    Route::post('/products/{product}/deactivate', [App\Http\Controllers\ProductsController::class, 'deactivate']);

});

Route::middleware(['auth:api', 'headOffice'])->group(function () {
    Route::post('/years', [App\Http\Controllers\YearsController::class, 'store']);
});
