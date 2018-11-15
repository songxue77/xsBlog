<?php

return [

    'REGIONAL_ENDPOINTS'    =>  [
        'BR'    =>  [ // 브라질
            'SERVICE PLATFORM'  =>  'BR1',
            'HOST'  =>  'br1.api.riotgames.com'
        ],
        'EUNE'    =>  [ // 유럽
            'SERVICE PLATFORM'  =>  'EUNE1',
            'HOST'  =>  'eun1.api.riotgames.com'
        ],
        'EUW'    =>  [ // 유럽
            'SERVICE PLATFORM'  =>  'EUW1',
            'HOST'  =>  'euw1.api.riotgames.com'
        ],
        'JP'    =>  [ // 일본
            'SERVICE PLATFORM'  =>  'JP1',
            'HOST'  =>  'jp1.api.riotgames.com'
        ],
        'KR'    =>  [ // 한국
            'SERVICE PLATFORM'  =>  'KR1',
            'HOST'  =>  'kr.api.riotgames.com'
        ],
        'LAN'    =>  [ // 북미
            'SERVICE PLATFORM'  =>  'LA1',
            'HOST'  =>  'la1.api.riotgames.com'
        ],
        'LAS'    =>  [ // 북미
            'SERVICE PLATFORM'  =>  'LA2',
            'HOST'  =>  'la2.api.riotgames.com'
        ],
        'NA'    =>  [ // 북미
            'SERVICE PLATFORM'  =>  'NA1',
            'HOST'  =>  'na1.api.riotgames.com'
        ],
        'OCE'    =>  [
            'SERVICE PLATFORM'  =>  'OC1',
            'HOST'  =>  'oc1.api.riotgames.com'
        ],
        'TR'    =>  [
            'SERVICE PLATFORM'  =>  'TR1',
            'HOST'  =>  'tr1.api.riotgames.com'
        ],
        'RU'    =>  [ // 러시아?
            'SERVICE PLATFORM'  =>  'RU1',
            'HOST'  =>  'ru.api.riotgames.com'
        ],
        'PBE'    =>  [ // 테스트
            'SERVICE PLATFORM'  =>  'PBE1',
            'HOST'  =>  'pbe1.api.riotgames.com'
        ]
    ],

    'RESPONSE CODES'    =>  [
        '200'   =>  'Success',
        '400'   =>  'Bad Request',
        '401'   =>  'Unauthoritzed',
        '403'   =>  'Forbidden',
        '404'   =>  'Not Found',
        '415'   =>  'Unsupported Media Type',
        '429'   =>  'Rate Limit Exceeded',
        '500'   =>  'Internal Server Error',
        '503'   =>  'Service Unavailable',
    ]

];