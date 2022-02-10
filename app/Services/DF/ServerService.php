<?php

declare(strict_types=1);

namespace App\Services\DF;

use Exception;
use App\Libraries\Util;
use Illuminate\Support\Facades\Http;

class ServerService
{
    private $apiUrl;
    private $apiKey;

    public function __construct()
    {
        $this->apiUrl = config('df.api_url');
        $this->apiKey = config('df.api_key');
    }

    public function serverList()
    {
        try {
            $apiResponse = Http::get($this->apiUrl.'/df/servers', [
                'apikey' => $this->apiKey
            ]);

            $header = $apiResponse->headers();
            $body = $apiResponse->json();
            dd($body);

            $responseResult = Util::responseResult('0000', 'server list');
            $responseResult['data']['serviceList'] = $result['rows'];
        } catch (Exception $e) {
            $responseResult = Util::responseResult('9999', $e->getMessage());
        }

        return $responseResult;
    }
}
