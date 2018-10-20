<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/info', function () {
    phpinfo();
});

Route::get('/test', function () {
    Route::get("","DfController@index");
});

Route::group([], function () {

    // Vue 메인
    Route::get("vue","TestController@index");


});

Route::group([], function () {

    // 던파 서버 정보
    Route::get("servers","DfController@serverInfo");



});
