<?php

namespace App\Libraries;

use Carbon\Carbon;

class Util
{
    /**
     * @param $query
     * @param array $keys
     * @return array
     * @desc {query and vo}의 key 비교 후 불필요한 key 삭제
     */
    public static function queryMatch($query, $keys=[])
    {
        foreach($keys as $key=>$value) {
            if (!strpos($query, ":$key\n") && !strpos($query, ":$key ") && !strpos($query, ":$key")) {
                unset($keys[$key]);
            }
        }
        return $keys;
    }

    /**
     * @param $value1
     * @param $value2
     * @return mixed
     *
     * @desc $value1이 빈값이면 $value2로 대체
     */
    public static function ne($value1="", $value2="")
    {
        if (empty($value1) || trim($value1) == "") {
            if (is_numeric($value1)) {
                return $value1;
            }
            return $value2;
        } else {
            return $value1;
        }
    }

    /**
     * @param string $path
     * @return string
     * 리소스 파일의 자동 버전 관리
     */
    public static function autoVersion($path='')
    {
        if (!empty($path)) {

            $split = explode("?", $path);

            if (count($split) > 1) {
                $source = $split[0];
                $params = "&". $split[1];
            } else {
                $source = $path;
                $params = '';
            }

            $basePath = public_path();
            $fileSrc = $basePath . $source;
            $pathInfo = pathinfo($fileSrc);
            $version = "";
            if (file_exists($fileSrc)) {
                $version = "?". filemtime($fileSrc);
            }
            if (!empty($params)) {
                return $source . $version . $params;
            }
            return $path . $version;
        }

    }

    public static function getProductPattern($routePath)
    {
        switch ($routePath) {

            case 'general' :
                return '단과';
                break;

            case 'freePass' :
                return '프리패스';
                break;

            case 'refund' :
                return '환급반';
                break;

            case 'life' :
                return '평생반';
                break;

            case 'correction' :
                return '첨삭';
                break;

            case 'mockTest' :
                return '모의고사';
                break;

            case 'mp3' :
                return 'MP3';
                break;

            default :
                return '단과';

        }
    }

    public static function getCouponType($routePath)
    {
        switch ($routePath) {
            case 'mp3':
                return 'MP3';
                break;
            case 'pc':
                return 'PC다운';
                break;
            case 'class':
                return '강좌';
                break;
            case 'book':
                return '교재';
                break;
            case 'mobile':
                return '모바일다운';
                break;
            case 'delivery':
                return '배송비';
                break;
            case 'extend':
                return '수강연장';
                break;
            default: return '';
        }
    }

    public static function format($pattern, $date)
    {
        return Carbon::parse($date)->format($pattern);
    }

    public static function dateDiff($stringDate1, $stringDate2)
    {
        $date1 = Carbon::parse($stringDate1);
        $date2 = Carbon::parse($stringDate2);

        return $date1->diffInDays($date2);
    }

    public static function dateAdd($stringDate, $days)
    {
        return Carbon::parse($stringDate)->addDays($days);
    }

    public static function mask($fs, $s)
    {
        $string = $fs . $s;
        $size = ( strlen($fs) > strlen($s) )? strlen($fs) : strlen($s);
        return substr($string, strlen($s), $size);
    }

    public static function percent($total, $n)
    {
        if (empty($total) || $total == 0) {
            return 0;
        }
        return round($n / $total * 100);
    }

    public static function arrayDiff($array, $target, $findKey)
    {
        $result = clone $array;

        foreach($result as  $index => $value) {
            foreach ($target as $item) {
                if ($value->$findKey == $item->$findKey) {
                    $result->pull($index);
                }
            }
        }
        return $result;
    }

    /**
     * second to minute
     */
    public static function sec2min($sec, $text='')
    {
        return ($sec / 60);
    }

    public static function checkInfoClose(string $info)
    {
        $config = json_decode(request()->cookie('config'));
        if (!empty($config->is_info_close)) {
            if (in_array($info, $config->is_info_close)) {
                return true;
            }
        }
        return false;
    }

    public static function blockTags($txt)
    {
        $returnValue = $txt;

        if(!empty($returnValue)){
            $returnValue = str_replace('<script','&#60;script', $returnValue);
            $returnValue = str_replace('</script','&#60;/script', $returnValue);
            $returnValue = str_replace('<iframe','&#60;iframe', $returnValue);
            $returnValue = str_replace('</iframe','&#60;/iframe', $returnValue);
            $returnValue = str_replace('<frame','&#60;frame', $returnValue);
            $returnValue = str_replace('</frame','&#60;/frame', $returnValue);
            $returnValue = str_replace('<html','&#60;html', $returnValue);
            $returnValue = str_replace('</html','&#60;/html', $returnValue);
            $returnValue = str_replace('<meta','&#60;meta', $returnValue);
            $returnValue = str_replace('</meta','&#60;/meta', $returnValue);
            $returnValue = str_replace('<link','&#60;link', $returnValue);
            $returnValue = str_replace('</link','&#60;/link', $returnValue);
            $returnValue = str_replace('<head','&#60;head', $returnValue);
            $returnValue = str_replace('</head','&#60;/head', $returnValue);
            $returnValue = str_replace('<body','&#60;body', $returnValue);
            $returnValue = str_replace('</body','&#60;/body', $returnValue);
            $returnValue = str_replace('<form','&#60;form', $returnValue);
            $returnValue = str_replace('</form','&#60;/form', $returnValue);
            $returnValue = str_replace('<style','&#60;style', $returnValue);
            $returnValue = str_replace('</style','&#60;/style', $returnValue);
            $returnValue = str_replace('<!','&#60;!', $returnValue);
            $returnValue = str_replace('<%','&#60;%', $returnValue);
            $returnValue = str_replace('<?','&#60;?', $returnValue);
            $returnValue = str_replace('wrap','', $returnValue);
            $returnValue = str_replace('{{','&#123;&#123;', $returnValue);
            $returnValue = str_replace('}}','&#125;&#125;', $returnValue);
        }

        return $returnValue;
    }
}