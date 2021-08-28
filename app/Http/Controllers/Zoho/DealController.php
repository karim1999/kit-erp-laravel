<?php

namespace App\Http\Controllers\Zoho;

use App\Http\Controllers\Controller;
use App\Models\Quote;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use zcrmsdk\crm\crud\ZCRMRecord;
use zcrmsdk\crm\setup\org\ZCRMOrganization;
use zcrmsdk\crm\setup\restclient\ZCRMRestClient;
use zcrmsdk\oauth\ZohoOAuth;

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
        $oAuthClient = ZohoOAuth::getClientInstance();
        $access_token= $oAuthClient->getAccessToken(env('ZOHO_CURRENT_USER_EMAIL'));

        $account= null;
        $contact= null;
        $user= null;
        try {
            $deal = $deals_instance->getRecord($id);
            $dealData= $deal->getData();
            $owner = $dealData->getOwner();
            $user_request = Http::withHeaders([
                'Authorization' => 'Zoho-oauthtoken '.$access_token,
            ])->get('https://www.zohoapis.com/crm/v2/users/'.$owner->getId());

            $user= $user_request->json()['users'][0];

            $account_field= $dealData->getFieldValue("Account_Name");
            if ($account_field) {
                $account = $accounts_instance->getRecord($account_field->getEntityId());
            }
//            $contact_field= $dealData->getFieldValue("Contact_Name");
//            if ($contact_field) {
//                $contact = $contacts_instance->getRecord($contact_field->getEntityId());
//            }
            $contacts = $contacts_instance->getRecords();
            $products = $this->getAllRecords($products_instance);
        }catch (\Exception $e){
            abort(404);
        }
        $quotes= Quote::where('zoho_id', $id)->get();

//        return $products->getResponseJSON();
//        return $accounts->getResponseJSON();
//        return $contacts->getResponseJSON();
//        return $users->getResponseJSON();
//        return $deal->getResponseJSON();
        return Inertia::render('Deal/Show', [
            'quotes' => $quotes,
            'productsObj' => $products,
            'usersObj' => [
                "data"=> [$user]
            ],
            'contactsObj' => $contacts->getResponseJSON(),
            'accountsObj' => $account->getResponseJSON(),
            'current_deal_id' => $id,
            'current_deal' => $deal->getResponseJSON(),
//            'current_quotes' => $quotes,
        ]);
    }
    public function saveProducts($products){
        if(count($products) === 0){
            return [];
        }
        $products= array_values($products);
        $productsIns = ZCRMRestClient::getInstance()->getModuleInstance("Products");
        $mappedProducts= $this->buildNestedData($products, config("zoho.mapItemsToZohoProducts"));
        $productsFinal= [];
//        return $mappedProducts;
        foreach ($mappedProducts as $current){
            $product = ZCRMRecord::getInstance("Products", null);
            foreach ($current as $key => $value){
                $product->setFieldValue($key, $value);
            }
            $productsFinal[]= $product;
        }
        $response= $productsIns->upsertRecords($productsFinal);
        $result= [];
        foreach ($response->getEntityResponses() as $key => $responseIns) {
            $details= $responseIns->getDetails();
            $current= array_merge($products[$key], ["product_id"=> $details["id"]]);
            $result[]= $current;
        }
        return $result;
    }
    public function saveQuote($id, Request $request){
        $oAuthClient = ZohoOAuth::getClientInstance();
        $access_token= $oAuthClient->getAccessToken(env('ZOHO_CURRENT_USER_EMAIL'));

        $dealsIns = ZCRMRestClient::getInstance()->getModuleInstance("Quotes");
        $deal = ZCRMRecord::getInstance("Quotes", null);

        $dealInfo= $request->all();
        $itemsInfo= $request->post('items');
        $termsInfo= $request->post('terms');
        $billingInfo= $request->post('billing');
        $shippingInfo= $request->post('shipping');

        $is_text_arr= $this->saveProducts(array_filter($itemsInfo, function($item){return $item["is_text"]; }));
        $other_products_arr= array_filter($itemsInfo, function($item){return !$item["is_text"]; });
        $itemsInfo= array_merge($other_products_arr, $is_text_arr);

        $dealRecords= [];
        $deal->setFieldValue("Deal_Name", $id);
        $this->setRecordValue($this->buildData($dealInfo, config("zoho.mapDealToZohoQuotes")), $deal);
        $this->setRecordValue($this->buildData($billingInfo, config("zoho.mapBillingToZohoQuotes")), $deal);
        $this->setRecordValue($this->buildData($shippingInfo, config("zoho.mapShippingToZohoQuotes")), $deal);

//        $deal->setFieldValue("Payment_Terms_Details", $this->buildNestedData($termsInfo, config("zoho.mapPaymentTermsToZohoDeals")));

//        return $this->buildNestedData(array_filter($itemsInfo, function($item){
//            return $item["type"] != "Hardware" && $item["type"] != "Service";
//            }), config("zoho.mapItemsToZohoDeals"));

//        $deal->setFieldValue("Hardware_Table", $this->buildNestedData(array_filter($itemsInfo, function($item){return $item["group"] === "Hardware"; }), config("zoho.mapItemsToZohoDeals")));
//        $deal->setFieldValue("Pro_Service_Table", $this->buildNestedData(array_filter($itemsInfo, function($item){return $item["group"] === "Services"; }), config("zoho.mapItemsToZohoDeals")));
//        $deal->setFieldValue("Product_Details", $this->buildNestedData(array_filter($itemsInfo, function($item){return $item["group"] !== "Services" && $item["group"] !== "Hardware"; }), config("zoho.mapItemsToZohoDeals")));
        $deal->setFieldValue("Product_Details", $this->buildNestedData($itemsInfo, config("zoho.mapItemsToZohoQuotesProducts")));
//        $deal->setFieldValue("Quoted_Items", $this->buildNestedData($itemsInfo, config("zoho.mapItemsToZohoQuotes")));
        //$finalData["items"]= $this->buildData($shippingInfo, config("zoho.mapItemsToZohoDeals"));

        array_push($dealRecords, $deal);
        $responseIn= $dealsIns->upsertRecords($dealRecords);
        $new_id= $responseIn->getResponseJSON()['data'][0]['details']['id'];
        $quote_request = Http::withHeaders([
            'Authorization' => 'Zoho-oauthtoken '.$access_token,
        ])->put('https://www.zohoapis.com/crm/v2.1/Quotes', [
            "data" => [
                [
                    "id"=> $new_id,
                    "Quoted_Items" => $this->buildNestedData($itemsInfo, config("zoho.mapItemsToZohoQuotes")),
                ]
            ],
        ]);

//        dd($quote_request->json());
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

        $is_text_arr= $this->saveProducts(array_filter($itemsInfo, function($item){return $item["is_text"]; }));
        $other_products_arr= array_filter($itemsInfo, function($item){return !$item["is_text"]; });
        $itemsInfo= array_merge($other_products_arr, $is_text_arr);

        $dealRecords= [];
        $this->setRecordValue($this->buildData($dealInfo, config("zoho.mapDealToZohoDeals")), $deal);
        $this->setRecordValue($this->buildData($billingInfo, config("zoho.mapBillingToZohoDeals")), $deal);
        $this->setRecordValue($this->buildData($shippingInfo, config("zoho.mapShippingToZohoDeals")), $deal);

        $deal->setFieldValue("Payment_Terms_Details", $this->buildNestedData($termsInfo, config("zoho.mapPaymentTermsToZohoDeals")));

//        return $this->buildNestedData(array_filter($itemsInfo, function($item){
//            return $item["type"] != "Hardware" && $item["type"] != "Service";
//            }), config("zoho.mapItemsToZohoDeals"));

        $mapGroupToCategory=config("zoho.mapGroupToCategory");
        $hardware_items= array_filter($itemsInfo, function($item) use ($mapGroupToCategory){
            $type= $item["type"];
            if ($type && key_exists($type, $mapGroupToCategory)) {
                return config("zoho.mapGroupToCategory")[$type] === "hardware";
            }
            return false;
        });
        $software_items= array_filter($itemsInfo, function($item) use ($mapGroupToCategory){
            $type= $item["type"];
            if ($type && key_exists($type, $mapGroupToCategory)) {
                return config("zoho.mapGroupToCategory")[$type] === "software";
            }
            return false;
        });
        $service_items= array_filter($itemsInfo, function($item) use ($mapGroupToCategory){
            $type= $item["type"];
            if ($type && key_exists($type, $mapGroupToCategory)) {
                return config("zoho.mapGroupToCategory")[$type] === "service";
            }
            return true;
        });
        $deal->setFieldValue("Hardware_Table", $this->buildNestedData($hardware_items, config("zoho.mapItemsToZohoDeals")));
        $deal->setFieldValue("Pro_Service_Table", $this->buildNestedData($service_items, config("zoho.mapItemsToZohoDeals")));
        $deal->setFieldValue("Quote_Table", $this->buildNestedData($software_items, config("zoho.mapItemsToZohoDeals")));
//        $finalData["items"]= $this->buildData($shippingInfo, config("zoho.mapItemsToZohoDeals"));

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
    public function saveTerms($id, Request $request){
        $termsIns = ZCRMRestClient::getInstance()->getModuleInstance("Payment_Terms1");
        $termRecord = ZCRMRecord::getInstance("Payment_Terms1", null); // to get the instance of the record

        $termsInfo= $request->post('terms');
        $account= $request->post('account');
        $contact= $request->post('contact');
        $deal_name= $request->post('deal_name');

        $termRecords= [];

        $termRecord->setFieldValue("Related_Account_Name", $account);
        $termRecord->setFieldValue("Related_Contact_Name", $contact);
        $termRecord->setFieldValue("Quote_Name", $deal_name);

        $termRecord->setFieldValue("Deal_Name", $id);
        $termRecord->setFieldValue("Payment_Term_Status", "Revision Required");
        $termRecord->setFieldValue("Approval_For1", "Deal");
        $termRecord->setFieldValue("Approval_Status_Reason", "Renegotiate Payment Terms");
        $termRecord->setFieldValue("Payment_Terms_Table", $this->buildNestedData($termsInfo, config("zoho.mapPaymentTermsToZohoDeals")));

        array_push($termRecords, $termRecord);
        $responseIn= $termsIns->upsertRecords($termRecords);
        return $responseIn->getResponseJSON();
    }

    public function pushTerms($id, Request $request){
        $result= $this->saveTerms($id, $request);
        return back()->with(["flash" => ["type" => "success", "msg"=> "The terms were requested for approval successfully."]]);
    }
}
