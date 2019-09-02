@extends('work.pc_master')

@section('content')

<link rel="stylesheet" href="{{asset(Util::autoVersion('/css/seat/button.css'))}}" />
<link rel="stylesheet" href="{{asset(Util::autoVersion('/css/seat/seat.css'))}}" />
<script src="{{asset(Util::autoVersion('/js/seat/main.js'))}}"></script>

<div id="CreateRoom">
    <form id="SetSeatForm" method="post" action="./seat.action.php">
        <input type="hidden" name="w" value="<?=!empty($no) ? 'u' : 'w'?>" />

        <?php if (!empty($no)) { ?>
        <input type="hidden" name="no" value="<?=$no?>" />
        <?php } ?>

        <input type="hidden" name="option_type" value="allow" />
        <input type="hidden" name="screen" value="<?=$info['screen']?>" />
        <input type="hidden" name="line_seat_arr" value="<?=$info['line_group']?>" />
        <input type="hidden" name="seat_name_arr" value="<?=$info['names']?>" />

        <input type="hidden" name="allow" value="<?=$info['allow']?>" />
        <input type="hidden" name="empty" value="<?=$info['empty']?>" />
        <input type="hidden" name="impossible" value="<?=$info['impossible']?>" />

        <input type="hidden" name="reservation" value="<?=$info['reservation']?>" />

    </form>

    <div class="StatusColor">
        <div class="Clear"></div>
    </div> <!-- .StatusColor End -->

    <div class="Options">
        <dl>
            <dt>
                <a href="#;" class="btn-gradient yellow small set_seat_type entrance_set">1</a>
                <a href="#;" class="btn-gradient gray small set_seat_type passage_set">2</a>
                <a href="#;" class="btn-gradient green small set_seat_type board_set">3</a>
                <a href="#;" class="btn-gradient blue small set_seat_type monitor_set">4</a>
                <a href="#;" class="btn-gradient black small set_seat_type impossible_set">5</a>
                <a href="#;" class="btn-gradient red small set_seat_type empty_set">6</a>
            </dt>
            <dd>
                <button type="button" id="Reset">취소</button>
                <button type="button" id="SetSeatSave">저장</button>
            </dd>
            <dd>
                <ul>
                    <li><span id="TotalSeatchCnt">0</span></li>
                    <li class="Line">/</li>
                    <li><span id="AllowSeatCnt">0</span></li>
                    <li class="Line">/</li>
                    <li></li>
                    <li class="Line">/</li>
                    <li><span id="EmptySeatCtn">0</span></li>
                    <li class="Line">/</li>
                    <li><span id="ImpossibleSeatCnt">0</span></li>
                    <li class="Line DisplayHide">/</li>
                    <li class="DisplayHide"><span id="LimitSeatTotal">0</span></li>
                </ul>
            </dd>
        </dl>
        <div class="Clear"></div>
    </div> <!-- .Options End -->

    <div class="Room">
    </div> <!-- .Room End -->
</div> <!-- #CreateRoom End -->

@endsection