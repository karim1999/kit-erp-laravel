<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    use HasFactory;
    protected $with= ["items", "term"];

    public function items(){
        return $this->hasMany(Item::class);
    }
    public function term(){
        return $this->belongsTo(Term::class);
    }
}
