<?php

namespace App\Http\Controllers\LOL;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Ixudra\Curl\Facades\Curl;

class LOLController extends Controller
{
    function __construct()
    {

    }

    function index(Request $request)
    {
        return view('lol.index');
    }

    function search(Request $request)
    {

        $search_name = $request->input('champion_search');
        $api_key = "RGAPI-44da2616-2877-44ed-b7c6-ff9e736e56cf";

        $response = Curl::to('https://kr.api.riotgames.com/lol/summoner/v3/summoners/by-name/'.$search_name.'?api_key='.$api_key)
            ->get();

        if ($response) {
            $json_result = json_decode($response, 1);
        }

        echo "<xmp>"; print_r($json_result); echo "</xmp>";
        exit;
    }

}