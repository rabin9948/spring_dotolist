/**
 * Created by YJIsaac on 2016. 5. 29..
 */
/**
 * Created by YJIsaac on 2016. 5. 28..
 */

var TodoList=(function(){
    "use strict"

    var index = 1,
        dom = $("#todoList");

    var init = function(_data){

        dom.find('.fc-event').each(function() {

            // store data so the calendar knows to render an event upon drop
            $(this).data('event', {
                title: $.trim($(this).text()), // use the element's text as the event title
                stick: true // maintain when user navigates (see docs on the renderEvent method)
            });

            // make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 999,
                revert: true,      // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            });

        });

        dom.find("#btnAddTodo").click(function(){
            app.inputDialog.show($(this).offset().left, $(this).offset.top, 1);
        });

    }

    var show = function(){

    }

    var hide = function(){

    }


    return {
        init:function(_data){
            init(_data);
        },

        insertEvent:function(_data){

            dom.append("<div class='fc-event'>"+_data.title+"</div>");
            dom.find('.fc-event').each(function() {
                $(this).data('event', {
                    title: $.trim($(this).text()), // use the element's text as the event title
                    stick: true // maintain when user navigates (see docs on the renderEvent method)
                });
                $(this).draggable({
                    zIndex: 999,
                    revert: true,      // will cause the event to go back to its
                    revertDuration: 0  //  original position after the drag
                });

            });
            //dom.fullCalendar('renderEvent', _data, true); // stick? = true
            //dom.fullCalendar('unselect');
        },

        removeEvent:function(){

        },

        updateEvent:function(){

        }
    }

});