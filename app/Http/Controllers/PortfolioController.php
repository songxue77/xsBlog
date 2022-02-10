<?php


namespace App\Http\Controllers;


class PortfolioController extends Controller
{
    public function index()
    {
        return view('portfolio.index', [
            'content' => 'contents text area'
        ]);
    }
}
