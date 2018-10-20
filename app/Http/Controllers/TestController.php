<?php

namespace App\Http\Controllers;


class TestController extends Controller
{
    function __construct()
    {

    }

    public function index()
    {
        return view('layouts.vueTest');
    }
}