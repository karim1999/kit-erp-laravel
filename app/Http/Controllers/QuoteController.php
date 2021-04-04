<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use zcrmsdk\crm\setup\org\ZCRMOrganization;
use zcrmsdk\crm\setup\restclient\ZCRMRestClient;

class QuoteController extends Controller
{
    public function saveQuote(Request $request, $id= false) {
        $data= [
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
            "description"=> $request->post('description'),
            "notes"=> $request->post('notes'),
        ];
        if(!$id){
            $version= 1;
            $final= Quote::where('zoho_id', $request->post('zoho_id'))->orderBy('created_at', 'desc')->first();
            if($final)
                $version+= $final->version;
            $data["quote_no"]= "QT-V".$version."-".Carbon::now()->isoFormat("DDMMYY");
            $data["version"]= $version;
            $quote= Quote::create($data);
        }else{
            $quote= Quote::firstOrCreate(["id" => $id], $data);
            $quote->update($data);
        }

        if($id){
            $quote->shipping()->delete();
            $quote->billing()->delete();
            $quote->shipping()->destroy();
            $quote->billing()->destroy();
            $quote->terms()->delete();
            $quote->items()->delete();
            $quote->terms()->destroy();
            $quote->items()->destroy();
        }

        $quote->shipping()->create($request->post('shipping'));
        $quote->billing()->create($request->post('billing'));

        foreach ($request->post('paymentTerms') as $term){
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

        try {
            $users= $orgIns->getAllUsers();
            $deal = $deals_instance->getRecord($zoho_id);
            $contacts = $contacts_instance->getRecords();
            $accounts = $accounts_instance->getRecords();
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
            'usersObj' => $users->getResponseJSON(),
            'contactsObj' => $contacts->getResponseJSON(),
            'accountsObj' => $accounts->getResponseJSON(),
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
