<?php

namespace App\Http\Controllers\Zoho;

use App\Http\Controllers\Controller;
use App\Models\Quote;
use Illuminate\Http\Request;
use Inertia\Inertia;
use zcrmsdk\crm\setup\org\ZCRMOrganization;
use zcrmsdk\crm\setup\restclient\ZCRMRestClient;

class DealController extends Controller
{
    //
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return object|string
     */
    public function show($id)
    {
        //
        $deals_instance = ZCRMRestClient::getInstance()->getModuleInstance("Deals");
        $orgIns = ZCRMOrganization::getInstance(); // to get the organization instance
        $contacts_instance = ZCRMRestClient::getInstance()->getModuleInstance("Contacts");
        $accounts_instance = ZCRMRestClient::getInstance()->getModuleInstance("Accounts");
        $products_instance = ZCRMRestClient::getInstance()->getModuleInstance("Products");

        try {
            $users= $orgIns->getAllUsers();
            $deal = $deals_instance->getRecord($id);
            $contacts = $contacts_instance->getRecords();
            $accounts = $accounts_instance->getRecords();
            $products = $products_instance->getRecords();
        }catch (\Exception $e){
            abort($e->getCode());
        }
//        $quotes= Quote::where('zoho_id', $id)->get();

//        return $products->getResponseJSON();
//        return $accounts->getResponseJSON();
//        return $contacts->getResponseJSON();
//        return $users->getResponseJSON();
//        return $deal->getResponseJSON();
        return Inertia::render('Deal/Show', [
            'productsObj' => $products->getResponseJSON(),
            'usersObj' => $users->getResponseJSON(),
            'contactsObj' => $contacts->getResponseJSON(),
            'accountsObj' => $accounts->getResponseJSON(),
            'current_deal_id' => $id,
            'current_deal' => $deal->getResponseJSON(),
//            'current_quotes' => $quotes,
        ]);
    }
}
