<%--
  Created by IntelliJ IDEA.
  User: broduck
  Date: 2016. 5. 28.
  Time: 오후 3:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<html>
<head>
    <title>Title</title>

    <link rel="stylesheet" href= "${pageContext.request.contextPath}/resources/css/Login.css" type="text/css"/>
    <link rel="stylesheet" href= "${pageContext.request.contextPath}/resources/css/checkbox.css" type="text/css"/>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery.js"></script>

</head>
<body>
<!--
        id  <input type="text" name="id">
        pw  <input type="password" name="password">
            <input type="checkbox" name="useCookie"> 로그인 유지
        <input type="submit">


    <a href="/signup/signup">회원가입</a>
    -->

<form action="/user/loginPost" method="post" id="loginForm">
    <div class="cont">
        <div class="demo">
            <div class="login">
                <div class="login__check"></div>
                <div class="login__form">
                    <div class="login__row">
                        <svg class="login__icon name svg-icon" viewBox="0 0 20 20">
                            <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8" />
                        </svg>
                        <input type="text" name="id" class="login__input name" placeholder="Username"/>
                    </div>
                    <div class="login__row">
                        <svg class="login__icon pass svg-icon" viewBox="0 0 20 20">
                            <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
                        </svg>
                        <input type="password"  name="password" class="login__input pass" placeholder="Password"/>

                    </div>
                    <div class="login__row">
                        <div class="checkbox custom">
                            <input id="box1" class="css-checkbox" type="checkbox" name="useCookie" />
                            <label for="box1" class="css-label-red" ></label>
                            <span style="color: lightgray;font-size: 15px;margin-left: 14px;">Remember me!</span>

                        </div>
                    </div>
                    <button type="button" class="login__submit">Sign in</button>

                    <p class="login__signup">Don't have an account? &nbsp;<a  href="/signup/signup">Sign up</a></p>
                </div>
            </div>
        </div>
    </div>
</form>

</body>

<script>
    var result = '${msg}';

    if (result == 'FAIL') {
        alert("아이디나 비밀번호가 맞지 않습니다. 다시 한번 확인해주세요.");
    }



    var result2 = '${msg2}';

    if (result == 'success') {
        alert("회원 가입 성공");
    }
    else if(result == 'fail'){
        alert("아이디 중복")
    }

</script>

<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/Login.js"></script>


</html>
