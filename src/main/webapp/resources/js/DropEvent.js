/**
 * Created by YJIsaac on 2016. 5. 28..
 */

var DropEvent=(function(){
    "use strict"

    var index = 1,
        dom = $("");

    var init = function(_data){

        dom.fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            defaultDate: '2016-05-12',
            selectable: true,
            selectHelper: false,
            select: function(start, end, jsEvent){
                console.log(jsEvent);
                app.inputDialog.init(start, end);
                app.inputDialog.show(jsEvent.pageX, jsEvent.pageY);
            },
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: _data
        });

    }

    var show = function(){

    }

    var hide = function(){

    }





    return {
        init:function(_data){
            console.log("cal init");
            init(_data);
        },

        insertEvent:function(_data){
            console.log(_data);
            dom.fullCalendar('renderEvent', _data, true); // stick? = true
            dom.fullCalendar('unselect');
        },

        removeEvent:function(){

        },

        updateEvent:function(){

        }
    }

});