<?php

namespace App\Http\Controllers\Zoho;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use zcrmsdk\crm\setup\restclient\ZCRMRestClient;

class ProductController extends Controller
{
    //
//    public function search($keyword){
//        $products_instance = ZCRMRestClient::getInstance()->getModuleInstance("Products");
//
//        try {
//            $products = $products_instance->searchRecordsByWord($keyword);
//        }catch (\Exception $e){
//            return response()->json(["message" => $e->getMessage()])->setStatusCode(404);
//        }
//
//        return $products->getResponseJSON();
//    }

    public function pricing($product, $account){
//        $product_instance = ZCRMRestClient::getInstance()->getRecordInstance("Products", $product);
//        $account_instance = ZCRMRestClient::getInstance()->getRecordInstance("Accounts", $account);

        $account_instance = ZCRMRestClient::getInstance()->getModuleInstance("Accounts");
//        return $account_instance->getRecord($account)->getResponseJSON();

        try {
//            $price_books = $account_instance->getAllRelatedLists(); // to get the related list
//            $account_price_books = $account_instance->getRelatedListRecords('Price_Books16')->getData();
//            $product_price_books = $product_instance->getRelatedListRecords('Price_Books')->getData();
            $associated_price_book= $account_instance->getRecord($account)->getData()->getFieldValue('Associated_Price_Book');
            if($associated_price_book){
                $price_book_id= $associated_price_book->getEntityId();
                $price_book_instance = ZCRMRestClient::getInstance()->getRecordInstance("Price_Books", $price_book_id);
                $price_book_products = $price_book_instance->getRelatedListRecords('Products')->getData();
            }else{
                abort(404);
            }
        }catch (\Exception $e){
            return response()->json(["message" => $e->getMessage()])->setStatusCode(404);
        }
        $price= false;
        foreach ($price_book_products as $price_book_product) {
            if($price_book_product->getEntityId() === $product){
                $price= $price_book_product->getFieldValue('list_price');
                break;
            }
        }
//        foreach ($account_price_books as $account_price_book) {
//            if($price)
//                break;
//            $account_price_book_id= $account_price_book->getFieldValue('Related_Price_Book')->getEntityId();
//            foreach ($product_price_books as $product_price_book) {
//                $product_price_book_id= $product_price_book->getEntityId();
//                if($product_price_book_id === $account_price_book_id){
//                    $price= $product_price_book->getFieldValue('list_price');
//                    break;
//                }
//            }
//        }

        if($price){
            return response()->json(["price" => $price])->setStatusCode(200);
        }
        return response()->json(["message" => "Not Found"])->setStatusCode(404);
//        return $product_price_books->getResponseJSON();
    }
}
