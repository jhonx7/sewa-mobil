<?php

namespace Database\Seeders;

use App\Models\Car;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cars = [
            ["brand" => "Toyota", "model" => "Camry", "license_plate" => "ABC123", "cost" => rand(100, 500) * 1000],
            ["brand" => "Honda", "model" => "Civic", "license_plate" => "XYZ456", "cost" => rand(100, 500) * 1000],
            ["brand" => "Ford", "model" => "Focus", "license_plate" => "QWE789", "cost" => rand(100, 500) * 1000],
            ["brand" => "Chevrolet", "model" => "Malibu", "license_plate" => "ASD234", "cost" => rand(100, 500) * 1000],
            ["brand" => "Nissan", "model" => "Altima", "license_plate" => "ZXC567", "cost" => rand(100, 500) * 1000],
            ["brand" => "BMW", "model" => "3 Series", "license_plate" => "RTY345", "cost" => rand(100, 500) * 1000],
            ["brand" => "Mercedes-Benz", "model" => "C-Class", "license_plate" => "FGH678", "cost" => rand(100, 500) * 1000],
            ["brand" => "Audi", "model" => "A4", "license_plate" => "JKL890", "cost" => rand(100, 500) * 1000],
            ["brand" => "Volkswagen", "model" => "Passat", "license_plate" => "BNM123", "cost" => rand(100, 500) * 1000],
            ["brand" => "Hyundai", "model" => "Elantra", "license_plate" => "MNB456", "cost" => rand(100, 500) * 1000],
        ];

        Car::insert($cars);
    }
}
