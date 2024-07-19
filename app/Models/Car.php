<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Car extends Model
{
    use HasFactory;
    protected $fillable = [
        'brand',
        'model',
        'license_plate',
        'cost',
        'status',
    ];

    protected $appends = ['detail'];
    public function getDetailAttribute()
    {
        return $this->brand . ' ' . $this->model . ' ' . $this->license_plate;
    }
    public function rentals(): HasMany
    {
        return $this->hasMany(Rental::class);
    }
}
