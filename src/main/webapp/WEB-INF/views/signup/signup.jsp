<%--
  Created by IntelliJ IDEA.
  User: broduck
  Date: 2016. 5. 28.
  Time: 오후 3:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" href= "${pageContext.request.contextPath}/resources/css/Login.css" type="text/css"/>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery.js"></script>
</head>
<body>
<!--
<form action="/signup/check" method="post">
    id  <input type="text" name="id">
    pw  <input type="password" name="password">
    mail <input type="text" name="email">
    <input type="submit">
</form>
-->

<form action="/signup/check" method="post" id="registerform">
    <div class="cont">
        <div class="demo">
            <div class="login">
                <div class="login__form">
                    <div class="login__row">
                        <svg class="login__icon name svg-icon" viewBox="0 0 20 20">
                        <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8" />
                    </svg>
                        <input type="text" name="id" class="login__input name"  placeholder="Username"/>
                    </div>
                    <div class="login__row">
                        <svg class="login__icon pass svg-icon" viewBox="0 0 20 20">
                            <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
                        </svg>
                        <input type="password"  name="password" class="login__input pass" placeholder="Password"/>
                    </div>

                    <div class="login__row">
                        <svg class="login__icon pass svg-icon" viewBox="0 0 20 20">
                            <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
                        </svg>
                        <input type="email" id="email"  name="email" class="login__input name" placeholder="e-mail"/>
                    </div>


                    <button type="button" class="login__submit">Sign Up</button>
                </div>
            </div>
        </div>
    </div>
</form>

<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/Register.js"></script>


</body>
</html>
