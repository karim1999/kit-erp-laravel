<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use zcrmsdk\crm\setup\restclient\ZCRMRestClient;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //Run Zoho
        $configuration=[
            "client_id"=> env('ZOHO_CLIENT_ID'),
            "client_secret"=> env('ZOHO_CLIENT_SECRET'),
            "redirect_uri"=> env('ZOHO_REDIRECT_URI'),
            "currentUserEmail"=> env('ZOHO_CURRENT_USER_EMAIL'),
            "token_persistence_path"=> dirname(__DIR__)."/.."
        ];

        ZCRMRestClient::initialize($configuration);
//        $oAuthClient = ZohoOAuth::getClientInstance();
//        $refreshToken = env('ZOHO_REFRESH_TOKEN');
//        $userIdentifier = env('ZOHO_CURRENT_USER_EMAIL');
//        $oAuthClient->generateAccessTokenFromRefreshToken($refreshToken,$userIdentifier);
    }
}
