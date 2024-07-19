<?php

namespace App\Http\Controllers;

use App\Http\Requests\CarCreateRequest;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->query('search');
        $status = $request->query('status');

        $data = Car::orderByDesc('created_at');

        if ($status) {
            $data = $data->where('status', $status);
        }

        if ($search) {
            $data = $data->where(DB::raw("CONCAT(`brand`, ' ', `model`)"), 'LIKE', "%{$search}%");
        }

        $data = $data->get();

        return Inertia::render('Car/Car', [
            'data' => $data,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Car/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CarCreateRequest $request)
    {
        try {
            Car::create($request->validated());

            return to_route('car.index');
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
