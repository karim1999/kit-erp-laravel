<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    protected $guarded= [];
    protected $casts= [
        "is_text"=> "boolean"
    ];

    public function quote(){
        return $this->belongsTo(Quote::class);
    }

}
