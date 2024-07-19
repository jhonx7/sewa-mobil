<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Rental;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payments = Payment::with('rental.car')->whereHas('rental', function ($query) {
            return $query->where('user_id', auth()->id());
        })->get();
        return Inertia::render('Payment/Payment', [
            'payments' => $payments,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'license_plate' => 'required',
        ]);

        try {
            $rental = Rental::where('user_id', auth()->id())->where('status', 'Ongoing')->whereHas('car', function ($query) use ($request) {
                return $query->where('license_plate', $request->license_plate);
            })->first();

            if (!$rental) {
                throw ValidationException::withMessages([
                    'license_plate' => 'Anda tidak menyewa mobil dengan nomor plat ini',
                ]);
            }


            $rental_date = new DateTime($rental->rental_date);
            $today = now();

            $interval = $rental_date->diff($today);

            $totalDay = $interval->days;
            $amount = $totalDay * $rental->car->cost;

            Payment::create([
                'rental_id' => $rental->id,
                'payment_date' => $today,
                'total_day' => $totalDay,
                'amount' => $amount,
            ]);

            $rental->update([
                'status' => 'Completed',
            ]);
            
            return to_route('payment.index');
        } catch (\Throwable $th) {
            throw $th;
        }
    }

}
