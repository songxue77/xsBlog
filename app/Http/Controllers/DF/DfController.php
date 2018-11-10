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
        $__AGENT = new Agent();

        return view('layouts.index');
    }
}