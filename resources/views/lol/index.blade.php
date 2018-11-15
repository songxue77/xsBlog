@extends('lol.lol_master')

@section('content')

    <div class="inner">
        <form class="form-horizontal" method="POST" id="character_search_form" name="character_search_form" action="{{route('lol::search')}}">
            {!! csrf_field() !!}
            <input type="text" class="main_input" name="champion_search">
            <button type="submit">제출</button>
        </form>
    </div>

@endsection