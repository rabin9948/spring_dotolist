<%--
  Created by IntelliJ IDEA.
  User: tak
  Date: 2016-05-29
  Time: 오전 2:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <meta charset='utf-8' />
  <meta name="viewport" content="width=device-width, user-scalable=no">
  <link href='${pageContext.request.contextPath}/resources/css/fullcalendar/fullcalendar.css' rel='stylesheet' />
  <link href='${pageContext.request.contextPath}/resources/css/fullcalendar/fullcalendar.print.css' rel='stylesheet' media='print' />
  <link href='${pageContext.request.contextPath}/resources/css/FullCalendar.css' rel='stylesheet'/>
  <link href='${pageContext.request.contextPath}/resources/css/Filter.css' rel='stylesheet'/>

  <link href='${pageContext.request.contextPath}/resources/css/todoList.css' rel='stylesheet'/>
  <link href='${pageContext.request.contextPath}/resources/css/home.css' rel='stylesheet'/>

  <script src='${pageContext.request.contextPath}/resources/js/moment.min.js'></script>
  <script src='${pageContext.request.contextPath}/resources/js/jquery.min.js'></script>
  <script src='${pageContext.request.contextPath}/resources/js/fullcalendar/fullcalendar.js'></script>
  <script src='${pageContext.request.contextPath}/resources/js/jquery-ui.js'></script>

  <style>





    .absolute{
      position: absolute;
    }

    .info{
      width:200px;
      height:100px;
      background-color: white;
      z-index: 999999;
      -webkit-box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75);
      -moz-box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75);
      box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75);
      padding:15px;
    }

  </style>
</head>
<body>
${userVO.id} 회원 <a href="/signup/update">회원수정</a>
<div id="inputDialog" class="hidden absolute info">
  <input type="text" id="title" placeholder="제목"/>
  <input type="text" id="startTime" placeholder="시작"/>
  <input type="text" id="endTime" placeholder="종료"/>
  <input type="text" placeholder="팀원"/><br>
  <input type="button" id="btnCreate" value="create"/>
  <input type="button" id="btnCancel" value="cancel"/>
</div>



<div id='calendar'></div>


<div id="filter">
  <input type='button' class='item' color="class1" />
  <input type='button' class='item' color="class2" />
  <input type='button' class='item' color="class3" />
  <input type='button' class='item' color="class4" />
  <input type='button' class='item' color="class5" />
  <input type='button' class='item' color="class6" />
  <input type='button' class='item' color="class7" />
</div>

<div id='todoList'>
  <span id="title">Undecided</span>
  <input type="button" id="btnAddTodo" value="+"/><br/>
  <div class='fc-event'>My Event 1</div>
  <div class='fc-event'>My Event 2</div>
  <div class='fc-event'>My Event 3</div>
  <div class='fc-event'>My Event 4</div>
  <div class='fc-event'>My Event 5</div>


</div>


<script src="${pageContext.request.contextPath}/resources/js/inputDialog.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/FullCalendar.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/todoList.js"></script>

<script>

  dom = $('#calendar');
  app = {

    inputDialog : InputDialog(),
    calendar : FullCalendar(),
    todoList : TodoList(),
    eventsData : [

    ],
    oldeventsData : null
  }

  app.oldeventsData = jQuery.extend(true, {}, app.eventsData);;
  app.inputDialog.init();
  app.todoList.init();

  app.calendar.init(app.eventsData);
  setInterval(function(){

    if(app.eventsData != app.oldeventsData){
      app.calendar.init(app.eventsData);
      app.oldeventsData = app.eventsData;
    }
  }, 2000);

  app.eventsData.push({"title":"abcd", "start":"2016-05-23", "end":"2016-05-24"});
  console.log(app.eventsData);
  //app.calendar.insertClass("History", "2016-03-09", '2016-06-09', 14, 16);

  //$("#inputDialog").fadeOut(300);
  $("#filter .item").click(function(){
    app.calendar.filter($(this).attr("color"));
  });




  function ajaxPostJson(_url) {
    var data = null;
	$.post( _url, function( _data ) {
	  data = _data;
      console.log("!!!!!!!!!");
      console.log(data);
      parsingDataArray(data);
    });


  }

  ajaxPostJson("/4");



  //받아온 데이터 분석
  function parsingDataArray(_data){
    for(var i=0; i<_data.length; i++){
      var item = _data[i];

      //1학기
      if(item.type == 1){
         app.calendar.insertClass(item.title,item.day,"2016-03-01", '2016-06-09', 14, 16, item.className);
      }

      //2학기
      else if(item.type==2) {

      }

      //1회성 이벤트
      else if(item.type == 0){
        console.log(item);
        if(item.start == null && item.end == null){
          app.todoList.insertEvent(item);
        }

        else{
          item.start =  new Date(item.start);
          item.end =  new Date(item.end);
          app.calendar.insertEvent(item);
        }
      }

    }
  }
//
//  parsingDataArray(
//          ajaxGetJson("http://192.168.0.3:8080/list/4"));


</script>
</body>
</html>
