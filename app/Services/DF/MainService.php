<?php

namespace App\Services\DF;

use App\Libraries\Util;
use Ixudra\Curl\Facades\Curl;
use Exception;


class MainService
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

            $apiResponse = Curl::to($this->apiUrl.'/df/servers')
                ->withData(['apikey' => $this->apiKey])
                ->get();

            $result = json_decode($apiResponse, true);

            if (isset($result['error'])) {
                throw new Exception('API CALL ERROR');
            }

            $responseResult = Util::responseResult('0000', 'server list');
            $responseResult['data']['serviceList'] = $result['rows'];

        } catch (Exception $e) {
            $responseResult = Util::responseResult('9999', $e->getMessage());
        }

        return $responseResult;
    }

}
