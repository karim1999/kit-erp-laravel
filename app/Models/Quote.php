<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    use HasFactory;
    protected $with= ["items", "terms", "shipping", "billing"];
    protected $guarded= [];
    protected $casts= [
        "valid_from"=> "date",
        "valid_to"=> "date",
    ];

    public function items(){
        return $this->hasMany(Item::class);
    }
    public function terms(){
        return $this->hasMany(PaymentTerm::class);
    }
    public function shipping(){
        return $this->hasOne(Shipping::class);
    }
    public function billing(){
        return $this->hasOne(Billing::class);
    }
    public function quotes(){
        return $this->hasMany(Quote::class);
    }
}
