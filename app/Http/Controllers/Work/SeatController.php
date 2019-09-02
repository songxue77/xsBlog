<?php

namespace App\Http\Controllers\Work;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Jenssegers\Agent\Agent;

class SeatController extends Controller
{
    public function __construct()
    {

    }

    public function index()
    {

    }

    public function form()
    {
        $info = [
            'screen' => 1,
            'line_group' => '9:18',
            'names' => 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P',
            'empty' => '',
            'impossible' => '',
            'allow' => '',
            'reservation' => ''
        ];

        dump($info);

        $data = [
            'info'  =>  $info
        ];

        return view('work.admin.seat.form', $data);
    }
}