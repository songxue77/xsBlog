<?php

namespace App\Http\Controllers\LOL;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LOLController extends Controller
{
    function __construct()
    {

    }

    function index(Request $request)
    {
        return view('layouts.index');
    }

}