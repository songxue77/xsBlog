<?php

namespace App\Http\Controllers\DF;

use App\Http\Controllers\Controller;
use App\Services\DF\MainService;


class MainController extends Controller
{
    private $mainService;

    function __construct(
        MainService $mainService
    )
    {
        $this->mainService = $mainService;
    }

    function index()
    {
        return $this->mainService->serverList();
    }
}
