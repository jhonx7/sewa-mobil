<?php

namespace App\Http\Controllers;

use App\Http\Requests\RentalCreateRequest;
use App\Models\Rental;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class RentalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rentals = Rental::with('car')->where('user_id', auth()->id())->get();
        return Inertia::render('Rental/Rental', [
            'rentals' => $rentals
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RentalCreateRequest $request)
    {
        try {
            $startDate = Carbon::parse($request->rental_date);
            $endDate = Carbon::parse($request->return_date);
            if ($startDate > $endDate) {
                throw ValidationException::withMessages([
                    'rental_date' => ['Tanggal mulai tidak boleh lebih dari tanggal selesai'],
                ]);
            }
            // if ($startDate < now()) {
            //     throw ValidationException::withMessages([
            //         'rental_date' => ['Tanggal mulai tidak boleh kurang dari hari ini'],
            //     ]);
            // }
            $exist = Rental::where('car_id', $request->car_id)
                ->where(function ($query) use ($startDate, $endDate) {
                    return $query->whereBetween(DB::raw("DATE(`rental_date`)"), [$startDate, $endDate])
                        ->orWhereBetween(DB::raw("DATE(`return_date`)"), [$startDate, $endDate]);
                })->exists();

            if ($exist) {
                throw ValidationException::withMessages([
                    'rental_date' => ['Mobil tidak tersedia pada rentang tanggal ini'],
                    'return_date' => ['Mobil tidak tersedia pada rentang tanggal ini'],
                ]);
            }

            Rental::create([
                'user_id' => auth()->id(),
                'car_id' => $request->car_id,
                'rental_date' => $request->rental_date,
                'return_date' => $request->return_date,
            ]);

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
