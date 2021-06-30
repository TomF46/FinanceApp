<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class ApplicationsController extends Controller
{
    public function show(Request $request, Application $application)
    {
        return response()->json($application->mapDetail());
    }

    public function submit(Request $request, Application $application)
    {
        $user = $request->user();

        if(!$application->isManagedBy($user)) return response()->json([
            'message' => 'Unauthorized'
        ], 401);

        $attributes = $this->validateApplication($request);

        $application->submit($attributes);
        
        return response()->json([
            'message' => 'Submitted'
        ], 200);
    }

    public function accept(Request $request, Application $application)
    {
        $user = $request->user();

        if(!$application->isAreaManagedBy($user)) return response()->json([
            'message' => 'Unauthorized'
        ], 401);

        $application->accept();
        
        return response()->json([
            'message' => 'Accepted'
        ], 200);
    }

    public function reject(Request $request, Application $application)
    {
        $user = $request->user();

        if(!$application->isAreaManagedBy($user)) return response()->json([
            'message' => 'Unauthorized'
        ], 401);

        $attributes = $this->validateRejectionMessage($request);

        $application->reject($user, $attributes['message']);
        
        return response()->json([
            'message' => 'Rejected'
        ], 200);
    }

    public function showRejectMessage(Request $request, Application $application)
    {
        $message = $application->getRejectionMessage();

        return response()->json($message);
    }

    protected function validateRejectionMessage(Request $request)
    {
        return $request->validate([
            'message' => 'required|string|max:1024'
        ]);
    }

    protected function validateApplication(Request $request)
    {
        return $request->validate([
            'income.dividends' => 'required|numeric|min:0',
            'income.assetSales' => 'required|numeric|min:0',
            'income.maintenanceGrant' => 'required|numeric|min:0',
            'income.sponsorship' => 'required|numeric|min:0',
            'income.rewards' => 'required|numeric|min:0',
            'expenses.rent' => 'required|numeric|min:0',
            'expenses.payroll' => 'required|numeric|min:0',
            'expenses.utilities' => 'required|numeric|min:0',
            'expenses.equipment' => 'required|numeric|min:0',
            'expenses.travel' => 'required|numeric|min:0',
            'expenses.training' => 'required|numeric|min:0',
            'expenses.maintenance' => 'required|numeric|min:0',
            'expenses.employeeBonus' => 'required|numeric|min:0',
            'expenses.employeeExpenses' => 'required|numeric|min:0',
            'sales.*.id' => 'required',
            'sales.*.quantity' => 'required|numeric|min:0',
            

        ]);
    }
}
