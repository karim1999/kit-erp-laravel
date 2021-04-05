<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('deals/{id}', "App\\Http\\Controllers\\Zoho\\DealController@show");
Route::resource('quotes', "App\\Http\\Controllers\\QuoteController")->only(['store', 'show', 'update', 'destroy']);

Route::post('deals/{id}/push', "App\\Http\\Controllers\\Zoho\\DealController@push");
Route::post('deals/{id}/push/deal', "App\\Http\\Controllers\\Zoho\\DealController@pushDeal");
Route::post('deals/{id}/push/quote', "App\\Http\\Controllers\\Zoho\\DealController@pushQuote");
Route::post('deals/{id}/push/terms', "App\\Http\\Controllers\\Zoho\\DealController@pushTerms");

Route::get('search/{module}/{keyword}', "App\\Http\\Controllers\\Zoho\\ModuleController@search");
Route::get('products/{product}/pricing/{account}', "App\\Http\\Controllers\\Zoho\\ProductController@pricing");
