<?php

namespace App\Http\Controllers\Api\v1;


class DfController
{
    function __construct()
    {

    }

    function index()
    {
        return view('welcome');
    }
}