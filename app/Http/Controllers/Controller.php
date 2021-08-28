<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function getAllRecords($instance){
        $records= [];
        $page= 1;
        $num= 200;
//        return $instance->getRecords(["page"=>$page, "per_page"=>$num])->getResponseJSON();

        while(true){
            $newRecords= $instance->getRecords(["page"=>$page, "per_page"=>$num])->getResponseJSON();
            $records= array_merge($records, $newRecords["data"]);
            $page++;

            if(!$newRecords['info']['more_records'])
                break;
        }
        return ["data" => $records];
    }
}
