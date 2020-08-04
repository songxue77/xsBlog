<?php

namespace App\Http\Controllers\DF;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Jenssegers\Agent\Agent;


class DfController extends Controller
{
    function __construct()
    {

    }

    function index(Request $request)
    {
        $client = new \GuzzleHttp\Client();
        $response = $client->request('GET', 'https://api.neople.co.kr/df/servers?apikey=w06grw0LQkBfvq4inVgJ2HUsG1vTceM3');

        //echo $response->getStatusCode();
        //echo $response->getHeader('content-type')[0];
        echo $response->getBody();
        exit;

        //return view('df.layouts.server_list');
    }
}