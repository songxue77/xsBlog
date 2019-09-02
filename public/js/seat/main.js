$(function(){
    // 우측 좌석 상태(카운트) 노출 여부
    var display_check = function ($this) {
        $("#LimitSeatTotal").text(0); // 좌석 선택 카운트 초기화

        var status = $('input[name=option_type]').val();

        if (status != 'allow') {
            $('#CreateRoom .Options li').each(function(){
                if ($(this).index() == 0) { return; }
                if ($(this).index() == 9 || $(this).index() == 10) {
                    $("#LimitSeatTotal").text($('#CreateRoom .Seat dl dd.'+(status == 'empty' ? 'Empty' : 'Impossible')).length);
                    $(this).removeClass('DisplayHide');
                    return;
                }

                $(this).addClass('DisplayHide');
            });
        } else {
            $('#CreateRoom .Options li').each(function(){
                if ($(this).index() == 0) { return; }
                if ($(this).index() == 9 || $(this).index() == 10) { $(this).addClass('DisplayHide'); return; }
                $(this).removeClass('DisplayHide');
            });
        }
    };

    var set_class_seat_cnt = function(status) {
        if (status == 'total') {
            $("#ImpossibleSeatCnt").text($('#CreateRoom .Seat dl dd.Impossible').length);
            $("#EmptySeatCtn").text($('#CreateRoom .Seat dl dd.Empty').length);
            $("#AllowSeatCnt").text($('#CreateRoom .Seat dl dd.On').length);
        } else {
            switch (status) {
                case 'Impossible' :
                    $("#ImpossibleSeatCnt").text($('#CreateRoom .Seat dl dd.Impossible').length);
                    $("#LimitSeatTotal").text($('#CreateRoom .Seat dl dd.Impossible').length);
                    break;
                case 'empty' :
                    $("#EmptySeatCtn").text($('#CreateRoom .Seat dl dd.Empty').length);
                    $("#LimitSeatTotal").text($('#CreateRoom .Seat dl dd.Empty').length);
                    break;
                case 'allow' :
                default : $("#AllowSeatCnt").text($('#CreateRoom .Seat dl dd.On').length);
            }
        }
    };

    var set_create_class_seat = function () {
        var class_room = $('#CreateRoom');
        var room = $('#CreateRoom .Room');

        var w = $('input[name=w]').val(); // 모드
        var line_seat_arr = $('input[name=line_seat_arr]').val(); // 분단별 좌석수, 세로열
        var seat_name_arr = $('input[name=seat_name_arr]').val(); // 좌석별 네이밍
        seat_name_arr = seat_name_arr.split(',');
        line_seat_arr = line_seat_arr.split('|');

        var allow = "";
        var empty = "";
        var impossible = "";
        var reservation = "";
        if (w == 'u') { // 좌석 수정시 저장된 내용을 가져온다.
            allow = $('input[name=allow]').val();
            empty = $('input[name=empty]').val();
            impossible = $('input[name=impossible]').val();
            reservation = $('input[name=reservation]').val();

            allow = allow.split(',');
            empty = empty.split(',');
            impossible = impossible.split(',');
            reservation = reservation.split(',');
        }

        var group = line_seat_arr.length; // 총 분단 수
        var html = "";

        html += "<div id='selectable' class='Seat'>";

        var seat_name_cnt = 0;
        for (var t = 0; t < group; t++) {
            var seat_info = line_seat_arr[t].split(':');
            var seat = seat_info[0]; // 한 라인에 가로 좌석 갯수
            var group_height = seat_info[1]; // 분단 세로 열

            html += "<table cellspacing='0' cellpadding='0'>";
            html += "<tbody>";

            var cnt = 0;
            for (var j = 0; j < group_height; j++) {
                html += "<tr>";
                html += "<td>";
                html += "<dl>";

                for (var s = 0; s < seat; s++) {
                    var seat_name = seat_name_arr[seat_name_cnt + s] + "-" + (j + 1);

                    var add = "";

                    if (impossible.indexOf(seat_name) > -1) { // 예약 불가 좌석
                        add = "Impossible";
                    } else if (empty.indexOf(seat_name) > -1) { // 비지정석
                        add = "Empty";
                    } else if (reservation.indexOf(seat_name) <= -1 && allow.indexOf(seat_name) > -1) { // 예약 가능이지만 예약좌석으로 지정될 경우
                        add = "On";
                    } else if (reservation.indexOf(seat_name) > -1) { // 예약좌석인경우
                        add = "No";
                    }

                    html += "<dd class='"+add+"' line='"+(t+1)+"' idx='"+(cnt + s)+"'>"+seat_name+"</dd>";
                }

                html += "</dl>";
                html += "</td>";
                html += "</tr>";

                cnt = cnt + s;
            }

            html += "</tbody>";
            html += "</table>";

            seat_name_cnt += parseInt(seat);
        }

        html += "<div class='Clear'></div>";
        html += "</div>";
        html += "</div>";

        room.append(html);

        var screen_length = $('#CreateRoom .Room .Screen ul li').length; // 스크린 갯수
        var screen_width = $('#CreateRoom .Room .Screen ul li').width() + 2; // 기본 가로값 + 좌우 border 1px씩
        var screen_position = (screen_width  * screen_length) + (50 * (screen_length - 1));

        $('#CreateRoom .Screen').css({width:screen_position+'px', margin:'0 auto'});

        var table_length = $('#CreateRoom .Seat table').length;
        var table_width = 0;
        $('#CreateRoom .Seat table').each(function(){
            table_width += $(this).width();
        });

        var table_position = table_width + (20 * (table_length - 1));

        $('#CreateRoom .Seat').css({width:table_position+'px', margin:'50px auto'});

        var total_seat_cnt = $("#CreateRoom .Seat dl dd").length; // 총좌석 수
        $("#TotalSeatchCnt").text(total_seat_cnt);

        set_class_seat_cnt('total'); // 카운트 조정
    };

    set_create_class_seat();

    // 좌석 다중선택
    $("#selectable").selectable({
        filter:"dd",
        autoRefresh: false,
        cancel: "",
        touch: "fit",
        create : function (event, ui) {
            console.log('Init completed');
        },
        selecting : function (event, ui) {
            console.log('Selecting');
        },
        /*unselecting : function (event, ui) {
            console.log('Unselecting');
        },*/
        start : function (event, ui) {
            console.log('Start');
        },
        stop : function (event, ui) {
            console.log('Stop');
        },
        selected : function (event, ui) { // 완료시
            console.log('Selected');
            var status = $('input[name=option_type]').val(); // 설정 모드를 가져온다.

            switch (status) {
                case 'empty' : seat_status = "Empty"; break; // 비지정석
                case 'Impossible' : seat_status = "Impossible"; break; // 예약 불가 설정
                case 'allow' : // 가능 좌석
                default : seat_status = 'On';
            }

            var dd = ui.selected;
            var line = dd.attributes['line'].value; // 배열 번호로 할시 익스에서 순서가 달라져서 오류를 띄움
            var idx = dd.attributes['idx'].value;

            // 선택한 좌석 정보
            var selected = $("#selectable table").eq(line-1).find("dd:eq("+idx+")");
            console.log(selected);
            return;
            if (selected.hasClass('No') == true || selected.hasClass('Empty') == true || selected.hasClass('Impossible') == true) {
                selected.removeClass(seat_status).removeClass('ui-selected');
                set_class_seat_cnt(status);
                return;
            }

            if (selected.hasClass('On') == true) {
                selected.removeClass(seat_status).removeClass('ui-selected');
                set_class_seat_cnt(status);
                return;
            }

            if (selected.hasClass(seat_status) == true) {
                selected.removeClass(seat_status).removeClass('ui-selected');
            } else {
                selected.addClass(seat_status);
            }

            set_class_seat_cnt(status);
        },
        /*unselected : function (event, ui) {
            console.log('unselected');
        },*/
    });

    // 비지정석 설정
    $("#EmptySeatSet").on('click', function(){
        if ($(this).hasClass('On') == true) {
            $('#CreateRoom .Options button').removeClass('On');
        } else {
            $('#CreateRoom .Options button').removeClass('On');
            $(this).addClass('On');
        }

        $('input[name=option_type]').val($(this).hasClass('On') == true ? 'empty' : 'allow');

        display_check($(this)); // 좌석 상태 업데이트
    });

    // 예약 불가 설정
    $("#ImpossibleSet").on('click', function(){
        if ($(this).hasClass('On') == true) {
            $('#CreateRoom .Options button').removeClass('On');
        } else {
            $('#CreateRoom .Options button').removeClass('On');
            $(this).addClass('On');
        }

        $('input[name=option_type]').val($(this).hasClass('On') == true ? 'Impossible' : 'allow');

        display_check($(this)); // 좌석 상태 업데이트
    });

    // 취소 버튼 클릭시 좌석을 초기화 한다 (예약 좌석을 제외하고)
    $("#Reset").on('click', function(){
        $("#CreateRoom .Seat dl dd").each(function(){
            $(this).removeClass('Empty').removeClass('Impossible').removeClass('On').removeClass('ui-selected');
        });

        $('#AllowSeatCnt').text('0'); // 예약 가능
        $('#EmptySeatCtn').text('0'); // 비지정석
        $('#ImpossibleSeatCnt').text('0'); // 예약불가
    });

    // 좌석 설정 저장하기
    $('#SetSeatSave').on('click', function(){

        // 예약 가능 좌석
        var allow = new Array();
        $('#CreateRoom .Seat dl dd.On').each(function(){
            allow.push($(this).text());
        });
        $('input[name=allow]').val(allow);

        // 비지정석
        var empty = new Array();
        $('#CreateRoom .Seat dl dd.Empty').each(function(){
            empty.push($(this).text());
        });
        $('input[name=empty]').val(empty);

        // 예약불가 좌석
        var impossible = new Array();
        $('#CreateRoom .Seat dl dd.Impossible').each(function(){
            impossible.push($(this).text());
        });
        $('input[name=impossible]').val(impossible);

        $('#SetSeatForm').submit();
    });
});