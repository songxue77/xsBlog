<!DOCTYPE html>
<!--[if IE 7]> <html lang="ko-KR" class="no-js lt-ie10 lt-ie9 lt-ie8 ie7"> <![endif]-->
<!--[if IE 8]> <html lang="ko-KR" class="no-js lt-ie10 lt-ie9 ie8">        <![endif]-->
<!--[if IE 9]> <html lang="ko-KR" class="no-js lt-ie10 ie9">               <![endif]-->
<!--[if !IE]><!-->
<html lang="ko-KR" class="no-js">
<!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>리그오브레전드 자료정보실</title>
    <link rel="stylesheet" href="{{asset(Util::autoVersion('/css/plugins/bxslider/bxslider.css'))}}" />
    <link rel="stylesheet" href="{{asset(Util::autoVersion('/css/plugins/jquery-ui-1.21.1/jquery-ui.min.css'))}}" />

    <script src="{{asset(Util::autoVersion('/js/plugins/jquery-1.12.4.min.js'))}}"></script>
    <script src="{{asset(Util::autoVersion('/js/plugins/jquery-ui-1.21.1/jquery-ui.min.js'))}}"></script>
    <script src="{{asset(Util::autoVersion('/js/plugins/bxslider/jquery.bxslider.min.js'))}}"></script>
    <script src="{{asset(Util::autoVersion('/js/plugins/bxslider/bxslider.js'))}}"></script>
    <!--[if lte IE 9]> <script src="{{asset(Util::autoVersion('/js/common/place_holder.js'))}}"></script> <![endif]-->
    <!--[if IE 7]><script src="{{asset(Util::autoVersion('/js/common/json2.js'))}}"></script><![endif]-->
    <script src="{{asset(Util::autoVersion('/js/common/common.js'))}}"></script>

    <script>
        window.MemberIdx = '{{session("member_idx")}}';
        @if(env('APP_ENV_CHAR'))
            window.app_env_char = "{{env('APP_ENV_CHAR')}}";
        @endif
    </script>
</head>
<body>
<div id="wrap">
    {{-- family-site-box --}}
    {{--@include('layouts.includes._pc_lnb')--}}
    {{-- family-site-box --}}

    {{-- header --}}
    @include('layouts.pc_header')
    {{-- //header --}}

    {{-- contents --}}
    <div id="contents">
        @yield('content')
    </div>
    {{-- //contents --}}

    {{-- footer --}}
    @include('layouts.pc_footer')
    {{-- //footer --}}

    {{-- Layers --}}
    <div class="layer-pop-dimmed" id="dimmed"></div>
    {{-- //Layers --}}

    {{-- Loading --}}
    <div class="loading-layer-dimmed"></div>
    <div class="loading-layer" data-count="0"></div>
    {{-- //Loading --}}

    {{-- Templates --}}
    {{--@yield('templates')--}}
    {{-- //Templates --}}
</div>
@if (!empty(session()->get('errorMsg')))
    <script>
        utils.alert("{{session()->get('errorMsg')}}");
    </script>
@endif
{{-- scripts --}}
<script src="{{asset(Util::autoVersion('/js/plugins/printThis/printThis.js'))}}"></script>
<script src="{{asset(Util::autoVersion('/js/common/ui.js'))}}"></script>
<!-- daum editor -->
<link rel="stylesheet" href="/js/plugins/daumeditor/css/editor.css">
<script src="/js/plugins/daumeditor/js/editor_loader.js"></script>
<script src="/js/plugins/daumeditor/js/editor_creator.js"></script>
<script src="{{asset(Util::autoVersion('/js/common/daum_editor.js'))}}"></script>
@yield('scripts')
{{-- //scripts --}}

</body>
</html>