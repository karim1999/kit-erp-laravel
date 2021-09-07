<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use zcrmsdk\crm\setup\restclient\ZCRMRestClient;

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

    public function getRelatedProducts($id, $module= "Accounts", $related_list= "Price_Books16", $products= []){
        $account_instance = ZCRMRestClient::getInstance()->getRecordInstance($module, $id);
//        $products= [];
        try {
            $account_price_books = $account_instance->getRelatedListRecords($related_list)->getData();
            foreach ($account_price_books as $account_price_book) {
                try {
                    $price_book_name= $account_price_book->getFieldValue('Price_Book_Price_List')->getLookupLabel();
                    $price_book_id= $account_price_book->getFieldValue('Price_Book_Price_List')->getEntityId();
                    $price_book = ZCRMRestClient::getInstance()->getRecordInstance("Price_Books", $price_book_id);
                    $new_products= $price_book->getRelatedListRecords("products")->getResponseJSON();
                    foreach ($new_products["data"] as $index => $product) {
                        $new_products["data"][$index]["price_book_id"]= $price_book_id;
                        $new_products["data"][$index]["price_book_name"]= $price_book_name;
                    }
                    $products= array_merge($products, $new_products["data"]);
                }catch (\Exception $e){

                }
            }

        }catch (\Exception $e){
            return [];
        }


        return $products;
    }
}
