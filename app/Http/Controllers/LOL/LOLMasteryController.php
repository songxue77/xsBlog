<?php

namespace App\Http\Controllers\LOL;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LOLMasteryController extends Controller
{
    function __construct()
    {

    }

    function index(Request $request)
    {
        return view('layouts.index');
    }

    function getChampionMasteryBySummonerId(Request $request)
    {

    }

    function getChampionMasteryBySummonerIdAndChampinion(Request $request)
    {

    }

    function getScoreBySummonerId(Request $request)
    {

    }

}