<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
	<title>Home</title>
</head>
<body>
<h1>
	Hello world!  
</h1>

<P>  The time on the server is ${serverTime}. </P>
</body>
</html>


eventsData : [
{
id:'1',
className:'class1',
title: 'All Day Event',
start: '2016-05-01',

},
{
id:'1',
className:'class2',
title: 'Long Event',
start: '2016-05-07',
end: '2016-05-10'
},
{
id:'1',
className:'class3',
title: 'Repeating Event',
start: '2016-05-09T16:00:00'
},
{
id:'1',
className:'my',
title: 'Repeating Event',
start: '2016-05-16T16:00:00'
},
{
title: 'Conference',
start: '2016-05-11',
end: '2016-05-13'
},
{
title: 'Meeting',
start: '2016-05-12T10:30:00',
end: '2016-05-12T12:30:00'
},
{
title: 'Lunch',
start: '2016-05-12T12:00:00'
},
{
title: 'Meeting',
start: '2016-05-12T14:30:00'
},
{
title: 'Happy Hour',
start: '2016-05-12T17:30:00'
},
{
title: 'Dinner',
start: '2016-05-12T20:00:00'
},
{
title: 'Birthday Party',
start: '2016-05-13T07:00:00
},
{
title: 'Click for Google',
url: 'http://google.com/',
start: '2016-05-28'
}
]