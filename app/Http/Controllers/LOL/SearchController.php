<?php

namespace App\Http\Controllers\LOL;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SearchController extends Controller
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
    }

}