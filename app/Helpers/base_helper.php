<?php

if (!function_exists('chkRes')) {
    /**
     * 배열 및 리소스 체킹
     * @param $datas
     * @return bool
     */
    function chkRes($datas)
    {
        return (is_resource($datas) || (is_array($datas) && count($datas)));
    }
}

if (!function_exists('add_hyphen')) {
    /**
     * 전화번호 하이프(-) 삽입
     * @param $hp_no
     * @return mixed
     */
    function add_hyphen($hp_no)
    {
        return preg_replace("/(0(?:2|[0-9]{2}))([0-9]+)([0-9]{4}$)/" , "\\1-\\2-\\3" , $hp_no);
    }
}

if (!function_exists('alert_msg')) {
    function alert_msg($msg='', $url='') {

        if (!$msg) $msg = '올바른 방법으로 이용하세요.';
        echo "<meta http-equiv='content-type' content='text/html' charset='utf8'>";
        echo "<script type='text/javascript'>alert('".$msg."');";
        if (!$url) {
            echo "history.go(-1);";
            echo "</script>";
        }
        if ($url){
            echo "window.location.href = '".$url."';";
            echo "</script>";
        }
        exit;
    }
}

if (!function_exists('dateHelper')) {
    /**
     * 날짜 추가/차감 계산 헬퍼함수
     * @param string $type [add,sub]
     * @param $interval [P1Y, P1M, P1D] :: Class DateInterval
     * @param string $format
     * @param null $date
     * @return mixed
     */
    function dateHelper($type = 'add', $interval = null, $format = 'Y-m-d', $date = null) {
        $datetime = new DateTime($date);
        if ($interval) {
            $datetime->{$type}(new DateInterval($interval));
        }
        if ($format == 'timestamp') {
            return $datetime->getTimestamp();
        } else {
            return $datetime->format($format);
        }
    }
}

if (!function_exists('arrayKeyToCamelCase')) {
    function arrayKeyToCamelCase($array, $isInnerArray = false)
    {
        if (!is_array($array)) {
            return null;
        }

        $tempArray = [];
        foreach ($array as $key => $value) {
            if ($isInnerArray && is_array($value)) {
                $value = arrayKeyToCamelCase($value, $isInnerArray);
            }

            $tempArray[camel_case($key)] = $value;
        }

        return $tempArray;
    }
}

if (!function_exists('arrayKeyToStudlyCase')) {
    function arrayKeyToStudlyCase($array, $isInnerArray = false)
    {
        if (!is_array($array)) {
            return null;
        }

        $tempArray = [];
        foreach ($array as $key => $value) {
            if ($isInnerArray && is_array($value)) {
                $value = arrayKeyToStudlyCase($value, $isInnerArray);
            }

            $tempArray[studly_case($key)] = $value;
        }

        return $tempArray;
    }
}

if (!function_exists('json_result')) {
    /**
     * json return 값 리턴
     * @param $ret_cd
     * @param $ret_msg
     * @param bool $is_error
     * @return array
     */
    function json_result($ret_cd, $ret_msg, $is_error = false) {
        return [
            'ret_cd' => $ret_cd,
            'ret_msg' => $ret_msg,
            'ret_status' => (($is_error === true) ? 500 : 200)
        ];
    }
}

if (!function_exists('jsonResult')) {
    /**
     * json return 값 리턴(camel 용)
     * @param $retCd
     * @param $retMsg
     * @param bool $isError
     * @return array
     */
    function jsonResult($retCd, $retMsg, $isError = false) {
        return [
            'retCd' => $retCd,
            'retMsg' => $retMsg,
            'retStatus' => (($isError === true) ? 500 : 200)
        ];
    }
}