<?php

namespace App\Http\Controllers\Zoho;

use App\Http\Controllers\Controller;
use App\Models\Quote;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use zcrmsdk\crm\crud\ZCRMRecord;
use zcrmsdk\crm\setup\org\ZCRMOrganization;
use zcrmsdk\crm\setup\restclient\ZCRMRestClient;
class DealController extends Controller
{
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
        $quotes= Quote::where('zoho_id', $id)->get();

//        return $products->getResponseJSON();
//        return $accounts->getResponseJSON();
//        return $contacts->getResponseJSON();
//        return $users->getResponseJSON();
//        return $deal->getResponseJSON();
        return Inertia::render('Deal/Show', [
            'quotes' => $quotes,
            'productsObj' => $products->getResponseJSON(),
            'usersObj' => $users->getResponseJSON(),
            'contactsObj' => $contacts->getResponseJSON(),
            'accountsObj' => $accounts->getResponseJSON(),
            'current_deal_id' => $id,
            'current_deal' => $deal->getResponseJSON(),
//            'current_quotes' => $quotes,
        ]);
    }
    public function saveQuote($id, Request $request){
        $dealsIns = ZCRMRestClient::getInstance()->getModuleInstance("Quotes");
        $deal = ZCRMRecord::getInstance("Quotes", null);

        $dealInfo= $request->all();
        $itemsInfo= $request->post('items');
        $termsInfo= $request->post('terms');
        $billingInfo= $request->post('billing');
        $shippingInfo= $request->post('shipping');

        $dealRecords= [];
        $this->setRecordValue($this->buildData($dealInfo, config("zoho.mapDealToZohoQuotes")), $deal);
        $this->setRecordValue($this->buildData($billingInfo, config("zoho.mapBillingToZohoQuotes")), $deal);
        $this->setRecordValue($this->buildData($shippingInfo, config("zoho.mapShippingToZohoQuotes")), $deal);

//        $deal->setFieldValue("Payment_Terms_Details", $this->buildNestedData($termsInfo, config("zoho.mapPaymentTermsToZohoDeals")));

//        return $this->buildNestedData(array_filter($itemsInfo, function($item){
//            return $item["type"] != "Hardware" && $item["type"] != "Service";
//            }), config("zoho.mapItemsToZohoDeals"));

//        $deal->setFieldValue("Hardware_Table", $this->buildNestedData(array_filter($itemsInfo, function($item){return $item["type"] === "Hardware"; }), config("zoho.mapItemsToZohoDeals")));
//        $deal->setFieldValue("Pro_Service_Table", $this->buildNestedData(array_filter($itemsInfo, function($item){return $item["type"] === "Service"; }), config("zoho.mapItemsToZohoDeals")));
//        $deal->setFieldValue("Quoted_Items", $this->buildNestedData($itemsInfo, config("zoho.mapItemsToZohoQuotes")));
        $deal->setFieldValue("Product_Details", $this->buildNestedData($itemsInfo, config("zoho.mapItemsToZohoQuotesProducts")));
        //$finalData["items"]= $this->buildData($shippingInfo, config("zoho.mapItemsToZohoDeals"));

        array_push($dealRecords, $deal);
        $responseIn= $dealsIns->upsertRecords($dealRecords);
        return $responseIn->getResponseJSON();
    }
    public function pushQuote($id, Request $request){
        $this->saveQuote($id, $request);
        return back()->with(["flash" => ["type" => "success", "msg"=> "The Quote was pushed successfully."]]);
    }

    public function buildData($info, $keys){
        $arr= [];
        foreach ($info as $key => $value) {
            if(!is_array($value) && array_key_exists($key, $keys)){
                $value= $this->checkDate($keys[$key], $value);
                $value= $this->checkDouble($keys[$key], $value);
                $arr[$keys[$key]]= $value;
            }
        }
        return $arr;
    }
    public function buildNestedData($info, $keys){
        $arr= [];
        foreach ($info as $data) {
            $arr[]= $this->buildData($data, $keys);
        }
        return $arr;
    }
    public function checkDate($key, $value){
        if(in_array($key, config("zoho.date_data"))){
            return Carbon::parse($value)->isoFormat("YYYY-MM-DD");
        }
        return $value;
    }
    public function checkDouble($key, $value){
        if(in_array($key, config("zoho.double_data"))){
            return floatval($value);
        }
        return $value;
    }
    public function setRecordValue($arr, $record){
        foreach ($arr as $key => $value) {
            $record->setFieldValue($key, $value);
        }
    }
    public function saveDeal($id, Request $request){
        $dealsIns = ZCRMRestClient::getInstance()->getModuleInstance("Deals");
        $deal = ZCRMRecord::getInstance("Deals", $id);
        $dealInfo= $request->all();
        $itemsInfo= $request->post('items');
        $termsInfo= $request->post('terms');
        $billingInfo= $request->post('billing');
        $shippingInfo= $request->post('shipping');

        $dealRecords= [];
        $this->setRecordValue($this->buildData($dealInfo, config("zoho.mapDealToZohoDeals")), $deal);
        $this->setRecordValue($this->buildData($billingInfo, config("zoho.mapBillingToZohoDeals")), $deal);
        $this->setRecordValue($this->buildData($shippingInfo, config("zoho.mapShippingToZohoDeals")), $deal);

        $deal->setFieldValue("Payment_Terms_Details", $this->buildNestedData($termsInfo, config("zoho.mapPaymentTermsToZohoDeals")));

//        return $this->buildNestedData(array_filter($itemsInfo, function($item){
//            return $item["type"] != "Hardware" && $item["type"] != "Service";
//            }), config("zoho.mapItemsToZohoDeals"));

        $deal->setFieldValue("Hardware_Table", $this->buildNestedData(array_filter($itemsInfo, function($item){return $item["type"] === "Hardware"; }), config("zoho.mapItemsToZohoDeals")));
        $deal->setFieldValue("Pro_Service_Table", $this->buildNestedData(array_filter($itemsInfo, function($item){return $item["type"] === "Service"; }), config("zoho.mapItemsToZohoDeals")));
        $deal->setFieldValue("Quote_Table", $this->buildNestedData(array_filter($itemsInfo, function($item){return $item["type"] != "Hardware" && $item["type"] != "Service"; }), config("zoho.mapItemsToZohoDeals")));
        //$finalData["items"]= $this->buildData($shippingInfo, config("zoho.mapItemsToZohoDeals"));

        array_push($dealRecords, $deal);
        $responseIn= $dealsIns->updateRecords($dealRecords);
        return $responseIn->getResponseJSON();
    }
    public function pushDeal($id, Request $request){
        $this->saveDeal($id, $request);
        return back()->with(["flash" => ["type" => "success", "msg"=> "The deal was pushed successfully."]]);
    }

    public function push($id, Request $request){
        $this->saveDeal($id, $request);
        $this->saveQuote($id, $request);

        return back()->with(["flash" => ["type" => "success", "msg"=> "The quote was pushed successfully."]]);
    }
}
