<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the 'web' middleware group. Now create something great!
|
*/

Route::get('info', function () {
    phpinfo();
});

Route::get('portfolio', 'PortfolioController@index');

// 던전앤파이터(NEOPLE)
Route::group([
    'namespace' => 'DF',
    'as' => 'df::',
], function () {
    Route::group(['prefix' => 'df'], function () {
        // 서버 정보
        Route::get('', 'ServerController@serverList');
        // 캐릭터 검색
        Route::get('servers/characters', 'MainController@characters')->name('characters');
        // 캐릭터 `기본 정보` 조회
        Route::get('servers/characterId', 'MainController@characterId')->name('characterId');
        // 캐릭터 `타임라인 정보` 조회
        Route::get('servers/characterId/timeline', 'MainController@characterTimeline')->name('characterTimeline');
        // 캐릭터 `능력치 정보` 조회
        Route::get('servers/characterId/status', 'MainController@characterStatus')->name('characterStatus');
        // 캐릭터 `장착 장비` 조회
        Route::get('servers/characterId/equip/equipment', 'MainController@equipment')->name('equipment');
        // 캐릭터 `장착 아바타` 조회
        Route::get('servers/characterId/equip/avatar', 'MainController@equipAvatar')->name('equipAvatar');
        // 캐릭터 `장착 크리쳐` 조회
        Route::get('servers/characterId/equip/creature', 'MainController@equipCreature')->name('equipCreature');
        // 캐릭터 `장착 휘장` 조회
        Route::get('servers/characterId/equip/flag', 'MainController@equipFlag')->name('equipFlag');
        // 캐릭터 `스킬 스타일` 조회
        Route::get('servers/characterId/skill/style', 'MainController@skillStyle')->name('skillStyle');
        // 캐릭터 `버프 스킬 강화 장착 장비` 조회
        Route::get('servers/characterId/skill/buff/equip/equipment',
            'MainController@skillBuffEquipment')->name('skillBuffEquipment');
        // 캐릭터 `버프 스킬 강화 장착 아바타` 조회
        Route::get('servers/characterId/skill/buff/equip/avatar',
            'MainController@skillBuffEquipAvatar')->name('skillBuffEquipAvatar');
        // 캐릭터 `버프 스킬 강화 장착 크리쳐` 조회
        Route::get('servers/characterId/skill/buff/equip/creature',
            'MainController@skillBuffEquipCreature')->name('skillBuffEquipCreature');

        // 경매장 등록 아이템 검색
        Route::get('aution', 'MainController@auction')->name('aution');
        // 경매장 등록 아이템 조회
        Route::get('autionNo', 'MainController@autionNo')->name('autionNo');
        // 아이템 검색
        Route::get('items', 'MainController@items')->name('items');
        // 아이템 상세 정보 조회
        Route::get('itemId', 'MainController@itemId')->name('itemId');
        // 직업 정보
        Route::get('jobs', 'MainController@jobs')->name('jobs');
        // 세트 아이템 검색
        Route::get('setItems', 'MainController@setItems')->name('setItems');
        // 세트 아이템 상세 정보 조회
        Route::get('setItemId', 'MainController@setItemId')->name('setItemId');
    });
});

//리그오브레전드(Riot)
Route::group([
    'namespace' => 'LOL',
    'as' => 'lol::',
], function () {
    Route::group(['prefix' => 'lol'], function () {
        // 메인 페이지
        Route::get('', 'LOLController@index')->name('index');

        // 캐릭터명으로 검색
        Route::post('character_search', 'LOLController@search')->name('search');
    });
});

// 좌석 예약 시스템
Route::group([
    'namespace' => 'Work',
    'as' => 'work::',
], function () {
    Route::group(['prefix' => 'work'], function () {
        // 메인 페이지
        Route::get('', 'SeatController@index')->name('index');

        // 등록 & 수정
        ROute::get('form', 'SeatController@form')->name('form');
    });
});
