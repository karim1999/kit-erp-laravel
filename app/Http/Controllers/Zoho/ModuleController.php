<?php

namespace App\Http\Controllers\Zoho;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use zcrmsdk\crm\setup\restclient\ZCRMRestClient;

class ModuleController extends Controller
{
    //
    public function search($module, $keyword){
        $module_instance = ZCRMRestClient::getInstance()->getModuleInstance($module);

        try {
            $results = $module_instance->searchRecordsByWord($keyword);
        }catch (\Exception $e){
            return response()->json(["message" => $e->getMessage()])->setStatusCode(404);
        }

        return $results->getResponseJSON();
    }
}
