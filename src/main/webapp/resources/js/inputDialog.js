/**
 * Created by YJIsaac on 2016. 5. 28..
 */

var InputDialog =(function(){
    "use strict"

    var index = 1,
        type = "list",
        dom = $("#inputDialog"),
        domTitle = null,
        domCreate = null,
        domCancel = null,
        domStartTime = null,
        domEndTime = null,
        dataTitle = null,
        dataStartDate = null,
        dataEndDate = null,
        dataTeam = null,
        callWhere = null;

    domStartTime = dom.find("#startTime");
    domEndTime = dom.find("#startTime");

    var init = function(start, end){
        dataTitle = null;
        dataStartDate = start;
        dataEndDate = end;
        dataTeam = null;
        domTitle.val(dataTitle);
    }

    var show = function(_x, _y, _option){
        console.log("OPTION" + _option);
        callWhere = _option;
        dom.css({left:_x, top:_y});
        dom.fadeIn();
        domTitle.focus();
    }

    var hide = function(){
        console.log(dom);
        dom.hide();
        domTitle.val(null);
        console.log("hide");
    }


    domTitle = dom.find("#title");
    domCreate = dom.find("#btnCreate");
    domCancel = dom.find("#btnCancel");

    domCreate.click(function(){

        var inputData;

        var title  = domTitle.val();
        var eventData;

        //시간표에서 생성 다이얼로그를 호출했으면
        if(callWhere != 1){
            if (title) {
                eventData = {
                    title: title,
                    start: dataStartDate,
                    end: dataEndDate
                };
                console.log(eventData);
            }
            app.calendar.insertEvent(eventData);

            $.ajax({
                url:'/list/register',
                type:'POST',
                contentType: 'application/json;charset=UTF-8',
                dataType:'json',
                data: JSON.stringify({"uid": 4, "title":title, "start":dataStartDate.format(), "end":dataEndDate.format()}),
                success:function(data){
                    console.log("완료!");

                },
                error:function(jqXHR, textStatus, errorThrown){
                    console.log(textStatus);
                    console.log(jqXHR);
                    console.log(errorThrown);
                }
            });

            hide();
            init();
        }
            //TodoList에서 호출했으면
        else{
            if (title) {
                app.todoList.insertEvent({"title":title});

                $.ajax({
                    url:'/list/register',
                    type:'POST',
                    contentType: 'application/json;charset=UTF-8',
                    dataType:'json',
                    data: JSON.stringify({"uid": 4, "title":title, "start":null, "end":null}),
                    success:function(data){
                        console.log("완료!");

                    },
                    error:function(jqXHR, textStatus, errorThrown){
                        console.log(textStatus);
                        console.log(jqXHR);
                        console.log(errorThrown);
                    }
                });


            }

            hide();
            init();
        }
    });

    domCancel.click(function(){
        console.log("cancel");
        hide();
    });


    return {
        init:function(_start, _end){
            init(_start, _end);
            hide();
        },

        show:function(_x, _y, _option){
            show(_x, _y, _option);
        },

        hide:function(){
            hide();
        },

    }

});