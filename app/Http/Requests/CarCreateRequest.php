<?php

namespace App\Http\Requests;

use App\Models\Car;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CarCreateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'brand' => 'required',
            'model' => 'required',
            'license_plate' => ['required', Rule::unique(Car::class)],
            'cost' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'brand.required' => 'Merek harus di isi',
            'model.required' => 'Model harus di isi',
            'license_plate.required' => 'Nomor Plat harus di isi',
            'license_plate.unique' => 'Nomor Plat sudah terdaftar',
            'cost.required' => 'Biaya sewa perhari harus di isi',
        ];
    }
}
