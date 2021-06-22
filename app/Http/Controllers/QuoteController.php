<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use zcrmsdk\crm\setup\org\ZCRMOrganization;
use zcrmsdk\crm\setup\restclient\ZCRMRestClient;
use zcrmsdk\oauth\ZohoOAuth;

class QuoteController extends Controller
{
    public function saveQuote(Request $request, $id= false) {
        $data= [
            "quote_id"=> $request->post('quote_id'),
            "zoho_id"=> $request->post('zoho_id'),
            "status"=> $request->post('status'),
            "approval_status"=> $request->post('approval_status'),
            "sales_person"=> $request->post('sales_person'),
            "contact"=> $request->post('contact'),
            "account"=> $request->post('account'),
            "include_shipping"=> $request->post('include_shipping'),
            "include_billing"=> $request->post('include_billing'),
            "deal_name"=> $request->post('deal_name'),
            "valid_from"=> $request->post('valid_from'),
            "valid_to"=> $request->post('valid_to'),
            "vat"=> $request->post('vat'),
            "customs"=> $request->post('customs'),
            "description"=> $request->post('description'),
            "notes"=> $request->post('notes'),
        ];
        if(!$id){
            $version= 1;
            $final= Quote::where('zoho_id', $request->post('zoho_id'))->orderBy('created_at', 'desc')->first();
            if($data['quote_id']){
                $copying_from_quote= Quote::findOrFail($data['quote_id']);
                $copying_from_quote_last_child= $copying_from_quote->quotes()->latest()->first();
                $current_version_num_arr= [];
//                dd($copying_from_quote_last_child);
                if($copying_from_quote_last_child){
                    $data["version"]= $copying_from_quote_last_child->version;
                    $data["nested"]= $copying_from_quote_last_child->nested | 1;
                    $current_version_num_arr= explode("-",$copying_from_quote_last_child->quote_no);
                    $current_version_num_arr[2]= "V".(str_replace("V","",$current_version_num_arr[2])+($version/($data["nested"]*10)));
                }else{
                    $data["version"]= 1;
                    $data["nested"]= $copying_from_quote->nested+1;
                    $current_version_num_arr= explode("-",$copying_from_quote->quote_no);
                    $current_version_num_arr[2]= "V".str_replace("V","",$current_version_num_arr[2]).".1";
                }
                $current_version_num_arr[3]= Carbon::now()->isoFormat("DDMMYY");
                $data["quote_no"]= implode("-", $current_version_num_arr);
            }else{
                $deals_instance = ZCRMRestClient::getInstance()->getModuleInstance("Deals");
                $deal = $deals_instance->getRecord($data["zoho_id"]);
                $Opportunity_Auto_No= $deal->getData()->getData()['Opportunity_Auto_No'];
                $Opportunity_Auto_No_Arr= explode("-",$Opportunity_Auto_No);
                $deal_num= "None";
                if($Opportunity_Auto_No_Arr && count($Opportunity_Auto_No_Arr) > 1){
                    $deal_num= $Opportunity_Auto_No_Arr[1];
                }
                if($final)
                    $version+= $final->version;

                $data["quote_no"]= "QT-".$deal_num."-V".$version."-".Carbon::now()->isoFormat("DDMMYY");
                $data["version"]= $version;
            }

            $quote= Quote::create($data);
        }else{
            $quote= Quote::firstOrCreate(["id" => $id], $data);
            $quote->update($data);
        }

        if($id){
            $quote->shipping()->delete();
            $quote->billing()->delete();

            $quote->terms()->delete();
            $quote->items()->delete();
        }

        $quote->shipping()->create(collect($request->post('shipping'))->except(["id"])->toArray());
        $quote->billing()->create(collect($request->post('billing'))->except(["id"])->toArray());

        foreach ($request->post('paymentTerms') as $term){
            $term["days"]= $term["days"] || 0;
            $term["value"]= $term["value"] || 0;
            $term["percent"]= $term["percent"] || 0;
            if(!$term["end_date"])
                unset($term["end_date"]);
            $quote->terms()->create(collect($term)->only(["percent", "value", "type", "method", "days", "end_date"])->toArray());
        }
        foreach ($request->post('items') as $item){
            $quote->items()->create(collect($item)->only([
                "product_id",
                "quantity",
                "discount_percent",
                "part_number",
                "vendor_part_number",
                "type",
                "name",
                "description",
                "unit",
                "cost_price",
                "unit_price",
                "margin",
                "margin_percent",
                "is_text",
                "discount",
                "gross",
                "net",
            ])->toArray());
        }

        return $quote;
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function store(Request $request)
    {
        $quote= $this->saveQuote($request);
        return redirect()->route('quotes.show', $quote->id)->with(["flash" => ["type" => "success", "msg"=> "The quote was saved successfully."]]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function show(Quote $quote)
    {
        $zoho_id= $quote->zoho_id;

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
            $deal = $deals_instance->getRecord($zoho_id);
            $dealData= $deal->getData();
            $owner = $dealData->getOwner();
            $user_request = Http::withHeaders([
                'Authorization' => 'Zoho-oauthtoken '.$access_token,
            ])->get('https://www.zohoapis.com/crm/v2/users/'.$owner->getId());

            $user= $user_request->json()['users'][0];
            $contacts = $contacts_instance->getRecords();
            $account_field= $dealData->getFieldValue("Account_Name");
            if ($account_field) {
                $account = $accounts_instance->getRecord($account_field->getEntityId());
            }
            $products = $products_instance->getRecords();
        }catch (\Exception $e){
            abort($e->getCode());
        }
        $quotes= Quote::where('zoho_id', $zoho_id)->get();
//        return $products->getResponseJSON();
//        return $accounts->getResponseJSON();
//        return $contacts->getResponseJSON();
//        return $users->getResponseJSON();
//        return $deal->getResponseJSON();
        return Inertia::render('Deal/Show', [
            'quotes' => $quotes,
            'quote' => $quote,
            'productsObj' => $products->getResponseJSON(),
            'usersObj' => [
                "data"=> [$user]
            ],
            'contactsObj' => $contacts->getResponseJSON(),
            'accountsObj' => $account->getResponseJSON(),
            'current_deal_id' => $zoho_id,
            'current_deal' => $deal->getResponseJSON(),
        ]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Quote $quote
     * @return RedirectResponse
     */
    public function update(Request $request, Quote $quote)
    {
        $quote= $this->saveQuote($request, $quote->id);
        return back()->with(["flash" => ["type" => "success", "msg"=> "The quote was updated successfully."]]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Quote $quote
     * @return RedirectResponse
     */
    public function destroy(Quote $quote)
    {
        $quote->delete();
        return back();
    }
}
