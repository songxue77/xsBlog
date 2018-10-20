@extends('layouts.pc_master')

@section('content')

    <ul id="example-1">
        <li v-for="item in items">
            @{{ item.message }}
        </li>
    </ul>

<script type="text/javascript">

    var example1 = new Vue({
        el: '#example-1',
        data: {
            items: [
                { message: 'Foo' },
                { message: 'Bar' }
            ]
        }
    })

</script>

@endsection