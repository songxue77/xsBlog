<?php

declare(strict_types=1);

namespace App\Http\Controllers\DF;

use App\Http\Controllers\Controller;
use App\Services\DF\ServerService;

class ServerController extends Controller
{
    private $serverService;

    function __construct(
        ServerService $serverService
    ) {
        $this->serverService = $serverService;
    }

    function serverList()
    {
        $servers = $this->serverService->serverList();

        return response()->json($servers);
    }
}
