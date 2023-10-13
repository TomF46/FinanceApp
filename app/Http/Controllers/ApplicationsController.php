<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class ApplicationsController extends Controller
{
    /**
     * Returns selected application by ID
     *
     * @param Application $application
     * @return \Illuminate\Http\Response
     */
    public function show(Application $application)
    {
        return response()->json($application->mapDetail());
    }

    /**
     * Submits application by ID
     *
     * @param  \Illuminate\Http\Request  $request
     * @param Application $application
     * @return \Illuminate\Http\Response
     */
    public function submit(Request $request, Application $application)
    {
        $user = $request->user();

        if(!$application->isManagedBy($user)) return response()->json([
            'message' => 'User is forbidden from performing this action'
        ], 403);

        $attributes = $this->validateApplication($request);

        $application->submit($attributes);
        
        return response()->json([
            'message' => 'Submitted'
        ], 200);
    }

    /**
     * Accepts application by ID
     *
     * @param  \Illuminate\Http\Request  $request
     * @param Application $application
     * @return \Illuminate\Http\Response
     */
    public function accept(Request $request, Application $application)
    {
        $user = $request->user();

        if(!$application->isAreaManagedBy($user)) return response()->json([
            'message' => 'User is forbidden from performing this action'
        ], 403);

        $application->accept();
        
        return response()->json([
            'message' => 'Accepted'
        ], 200);
    }

    /**
     * Rejects application by ID
     *
     * @param  \Illuminate\Http\Request  $request
     * @param Application $application
     * @return \Illuminate\Http\Response
     */
    public function reject(Request $request, Application $application)
    {
        $user = $request->user();

        if(!$application->isAreaManagedBy($user)) return response()->json([
            'message' => 'User is forbidden from performing this action'
        ], 403);

        $attributes = $this->validateRejectionMessage($request);

        $application->reject($user, $attributes['message']);
        
        return response()->json([
            'message' => 'Rejected'
        ], 200);
    }

    /**
     * Returns rejection message linked to rejected application with ID
     *
     * @param Application $application
     * @return \Illuminate\Http\Response
     */
    public function showRejectMessage(Application $application)
    {
        $message = $application->getRejectionMessage();

        return response()->json($message);
    }

    /**
     * Returns investment summary linked to accepted application with ID
     *
     * @param Application $application
     * @return \Illuminate\Http\Response
     */
    public function showInvestment(Application $application)
    {
        $investment = $application->investment->map();
        return response()->json($investment);
    }

    public function setPriorityLevel(Request $request, Application $application)
    {
        $user = $request->user();

        $attributes = $this->validatePriorityLevel($request);

        $application->setPriorityLevel($attributes['priority']);

        $application = $application->fresh();
        return response()->json($application->map());
    }

    protected function validatePriorityLevel(Request $request)
    {
        return $request->validate([
            'priority' => 'required'
        ]);
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
