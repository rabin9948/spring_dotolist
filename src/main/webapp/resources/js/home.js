/**
 * Created by YJIsaac on 2016. 5. 28..
 */
/*

 Home.js - 홈리스트 씬

 public
 - init();
 - unInit();
 - show();
 - hide();
 - getName();
 - trigger(vtouch, isLOCKHIT, isLOCKAREA, isDISPLAY, isSWITCH, isPHOTO, isTHERMO, isMUSIC);

 0 MovieList
 1 Live
 2 Dart
 3 Cheese
 // 4 Address
 5 Keyboard
 6 KidsList
 7 SportsList
 8 DramaList
 9 Thermo
 10 MusicPlayer
 11 PhotoList

 */

var Home = (function () {
    "use strict";

    var index = 1,
        type = "list",
        dom = $("#Scene-Home"),
        domItemList = null,
        domTotalPage = null,
        domCurrentPage = null,
        count = 0,
        select = [],
        timer = [],
        showDuration = 100,
        inputLast = null,
        inputSpeed = 0,
        inputCount = 0,
        inputTimer = null,
        inputDuration = 300;

    var moveIndex = function (_index) { // 절대적인 index로 움직임

        if (_index < 1) _index = 1;

        if (_index > domItemList.length - 2) _index = domItemList.length - 2;

        index = _index;

        updateView();

    };

    var moveRelativeIndex = function (_index) { //지금 현재의 상태에서 상대적으로 움직임

        _index = index + _index;

        moveIndex(_index);

    };

    //특정 index를 선택
    //0.1초 후에 다시 원상복구가 되야 한다.
    //애니메이션 중에 또 눌릴 경우 시간이 리셋되야 한다.
    var selectIndex = function (_index) {

        index = _index;

        select[_index] = 1;

        updateView();

    };

    var selectRelativeIndex = function (_index, _trigger, _swipe) {

        if (_index < 0 || _index > 3) return;

        if (_trigger == "D") {

            Effect.quickDown($(domItemList.eq(index - 1 + _index)));

        } else {

            if (_swipe == "L" || _swipe == "R") {

                if (_swipe == "L") {

                    Message.isReady = false; // 잠시 락을 위한 변수

                    setTimeout(function () {

                        Message.isReady = true;

                    }, 500);

                    moveRelativeIndex(10);

                } else if (_swipe == "R") {

                    Message.isReady = false; // 잠시 락을 위한 변수

                    setTimeout(function () {

                        Message.isReady = true;

                    }, 500);

                    moveRelativeIndex(-10);

                }

            } else {

                Effect.up($(domItemList.eq(index - 1 + _index)), function () {

                    selectedIndex(index - 1 + _index);

                }, 480);

            }

        }

    };

    var selectedIndex = function (_index) { // 절대적인 index로 움직임

        if (_index < 1) index = 1;
        else if (_index > domItemList.length - 2) index = domItemList.length - 2;
        else index = _index;

        if (_index == 0) app.setScene(MovieList);
        else if (_index == 9) app.setScene(Dart);
        else selectedUpdateView();

    };

    //리스트의 뷰를 업데이트
    var updateView = function (_duration) {

        //속도 기본 500ms
        _duration = _duration == undefined ? 200 : _duration;

        //패이지 바 표시
        var page_index = index < 1 ? 1 : index;

        domCurrentPage.width(domTotalPage.width() / (count) * 3);
        domCurrentPage.stop(true, false).animate({ "left": (index - 1) * ((domTotalPage.width()) / (count)) + "px" }, _duration, "easeInOutExpo");
        //현재 index
        var currentIndex = index;

        //속도
        var duration = _duration;;

        //현재 index 왼쪽의 item dom list
        var prevItem = domItemList.filter(function (index, elem) {

            return (index < currentIndex);

        });

        //현재 index 오른쪽의  item dom list
        var nextItem = domItemList.filter(function (index, elem) {

            return (index > currentIndex);

        });

        //왼쪽 item list의 left 값을 에니메이션 재배치
        prevItem.each(function (_index, _elem) {

            $(_elem).stop(true, false).animate({

                left: (((prevItem.length - _index) * -480) + 720) + "px"

            }, duration, "easeInOutExpo", function () {

                $(_elem).attr("position", "prev");

            });

        });

        //오른쪽 item List의 left값을 애니메이션 재배치
        nextItem.each(function (_index, _elem) {

            $(_elem).stop(true, false).animate({

                left: ((_index * 480) + 1200) + "px"

            }, duration, "easeInOutExpo", function () {

                $(_elem).attr("position", "next");

            });

        });

        //현재 index item은 가운데에 배치
        domItemList.eq(currentIndex).stop(true, false).animate({

            left: "720px"

        }, duration, "easeInOutExpo", function () {

            $(this).attr("position", "center");

        });

    };

    //리스트의 뷰를 업데이트
    var selectedUpdateView = function (_duration, _callback) {

        //속도 기본 500ms
        _duration = _duration == undefined ? 200 : _duration;

        //패이지 바 표시
        var page_index = index < 1 ? 1 : index;

        domCurrentPage.width(domTotalPage.width() / (count) * 3);
        domCurrentPage.stop(true, false).animate({ "left": (index - 1) * ((domTotalPage.width()) / (count)) + "px" }, _duration, "easeInOutExpo");

        var currentIndex = index;

        var duration = _duration;;

        //현재 index 왼쪽의 item dom list
        var prevItem = domItemList.filter(function (index, elem) {

            return (index < currentIndex);

        });

        //현재 index 오른쪽의  item dom list
        var nextItem = domItemList.filter(function (index, elem) {

            return (index > currentIndex);

        });

        //왼쪽 item list의 left 값을 에니메이션 재배치
        prevItem.each(function (_index, _elem) {

            $(_elem).stop(true, false).animate({

                left: (((prevItem.length - _index) * -480) + 720) + "px"

            }, duration, "easeInOutExpo", function () {

                $(_elem).attr("position", "prev");

            });

        });

        //오른쪽 item List의 left값을 애니메이션 재배치
        nextItem.each(function (_index, _elem) {

            $(_elem).stop(true, false).animate({

                left: ((_index * 480) + 1200) + "px"

            }, duration, "easeInOutExpo", function () {

                $(_elem).attr("position", "next");

            });

        });

        if (index == 1) app.setScene(Live);
        else if (index == 2) app.setScene(SportsList);
        else if (index == 3) app.setScene(KidsList);
        else if (index == 4) app.setScene(DramaList);
        else if (index == 5) app.setScene(Keyboard);
        else if (index == 6) app.setScene(PhotoList);
        else if (index == 7) app.setScene(MusicPlayer);
        else if (index == 8) app.setScene(Thermo);

        //현재 index item은 가운데에 배치
        domItemList.eq(currentIndex).stop(true, false).animate({

            left: "720px"

        }, duration, "easeInOutExpo", function () {

            $(this).attr("position", "center");

        });

    };

    //item의 모습을 update
    var UpdateItemView = function () {

        //domList에서
        domItemList.each(function (_index, _elem) {

            //선택이 된 애들이 있다면
            if (select[_index] == 1) $(_elem).addClass("active"); //class에 .active를 더해라
            else $(_elem).removeClass("active"); // .active를 빼라

        });

    };




    /*
     trigger 에서 호출되는 메서드
     1) left
     2) right
     3) up
     4) down
     5) power
     6) menu
     7) display
     */

    var left = function (_trigger) {
        var self = this;
        app.setTimerToReset(self);

        if (inputLast == "left") inputCount++;
        else {

            inputLast = "left";
            inputCount = 0;
            inputSpeed = 0;

            moveRelativeIndex(-1);

        }

        if (_trigger == "D") {

            Effect.longDown(Outside.domLeft);

            if (inputCount > 20 - inputSpeed) {

                inputCount = 0;
                inputSpeed = inputSpeed > 9 ? 10 : inputSpeed + 2;
                moveRelativeIndex(-1);

            }

        } else {

            Effect.up(Outside.domLeft, function () {

                inputCount = 0;
                inputSpeed = 0;
                inputLast = null;

            });

        }

    };

    var right = function (_trigger) {
        var self = this;
        app.setTimerToReset(self);

        if (inputLast == "right") inputCount++;
        else {

            inputLast = "right";
            inputCount = 0;
            inputSpeed = 0;
            moveRelativeIndex(1);

        }

        if (_trigger == "D") {

            Effect.longDown(Outside.domRight);

            if (inputCount > 20 - inputSpeed) {

                inputCount = 0;
                inputSpeed = inputSpeed > 9 ? 10 : inputSpeed + 2;
                moveRelativeIndex(1);

            }

        } else {

            Effect.up(Outside.domRight, function () {

                inputCount = 0;
                inputSpeed = 0;
                inputLast = null;

            });

        }

    };

    var power = function (_trigger) {

        app.power(_trigger);

    };

    var home = function (_trigger) {

        if (_trigger == "D") Effect.quickDown(Outside.domHome);
        else Effect.up(Outside.domHome, function () {

            moveIndex(0);

        });

    };

    var menu = function (_trigger) {

        if (_trigger == "D") Effect.quickDown(Outside.domMenu);
        else Effect.up(Outside.domMenu);

    };

    var back = function (_trigger) {

        if (_trigger == "D") Effect.quickDown(Outside.domBack);
        else {

            Effect.up(Outside.domBack, function () {

                moveIndex(0);

            });

        }

    };

    var display = function (_pixel, _trigger, _swipe) {

        var isL = (_pixel.x > 0 && _pixel.x < 240 && _pixel.y > 204 && _pixel.y < 876);
        var isR = (_pixel.x > 1680 && _pixel.x < 1920 && _pixel.y > 204 && _pixel.y < 876);
        var isU = (_pixel.x > 240 && _pixel.x < 1680 && _pixel.y > 0 && _pixel.y < 204);
        var isD = (_pixel.x > 240 && _pixel.x < 1680 && _pixel.y > 876 && _pixel.y < 1080);
        var isTL = (_pixel.x > 0 && _pixel.x < 240 && _pixel.y > 0 && _pixel.y < 204);
        var isTR = (_pixel.x > 1680 && _pixel.x < 1920 && _pixel.y > 0 && _pixel.y < 204);
        var isBL = (_pixel.x > 0 && _pixel.x < 240 && _pixel.y > 876 && _pixel.y < 1080);
        var isBR = (_pixel.x > 1680 && _pixel.x < 1920 && _pixel.y > 876 && _pixel.y < 1080);
        var is1 = (_pixel.x > 240 && _pixel.x < 720 && _pixel.y > 204 && _pixel.y < 876);
        var is2 = (_pixel.x > 720 && _pixel.x < 1200 && _pixel.y > 204 && _pixel.y < 876);
        var is3 = (_pixel.x > 1200 && _pixel.x < 1680 && _pixel.y > 204 && _pixel.y < 876);

        if (isL) left(_trigger);
        else if (isR) right(_trigger);
        else if (isU) app.up(_trigger);
        else if (isD) app.down(_trigger);
        else if (isTL) power(_trigger);
        else if (isTR) home(_trigger);
        else if (isBL) menu(_trigger);
        else if (isBR) back(_trigger);
        else if (is1) selectRelativeIndex(0, _trigger, _swipe);
        else if (is2) selectRelativeIndex(1, _trigger, _swipe);
        else if (is3) selectRelativeIndex(2, _trigger, _swipe);

    };

    // 초기화 - make dom
    dom.append(toStaticHTML("<div id = \"ti_box\"><div id = \"ti_title\">HOME</div></div>"
        + "<div class = \"item\" id = \"box-movies\"><div class = \"select\"></div></div>"
        + "<div class = \"item\" id = \"box-livetv\"><div class = \"select\"></div></div>"
        + "<div class = \"item\" id = \"box-sports\"><div class = \"select\"></div></div>"
        + "<div class = \"item\" id = \"box-kids\"><div class = \"select\"></div></div>"
        + "<div class = \"item\" id = \"box-tvdrama\"><div class = \"select\"></div></div>"
        + "<div class = \"item\" id = \"box-keyboard\"><div class = \"select\"></div></div>"
        + "<div class = \"item\" id = \"box-photo\"><div class = \"select\"></div></div>"
        + "<div class = \"item\" id = \"box-music\"><div class = \"select\"></div></div>"
        + "<div class = \"item\" id = \"box-temperature\"><div class = \"select\"></div></div>"
        + "<div class = \"item\" id = \"box-dart\"><div class = \"select\"></div></div>"
        + "<div id = \"page_box\">"
        + "<div id = \"page_total\"></div>"
        + "<div id = \"page_current\"></div>"
        + "</div>"));

    domItemList = dom.find(".item");
    domTotalPage = dom.find("#page_total");
    domCurrentPage = dom.find("#page_current");
    count = domItemList.length;

    return {

        init:function () {

            index = 1;
            updateView(0);

        },
        unInit:function () {

        },
        show:function () {

            Outside.show();
            dom.fadeIn();

        },
        hide:function () {

            dom.fadeOut();

        },
        getName:function () {

            return "Home";

        },
        trigger:function (vtouch, isLOCKHIT, isLOCKAREA, isDISPLAY, isSWITCH, isPHOTO, isTHERMO, isMUSIC) {

            if (!Message.isReady) return;

            var self = this;

            if (isSWITCH > -1) app.trigger_switch(vtouch, isSWITCH);
            if (isMUSIC > -1) app.trigger_music(vtouch, isMUSIC);
            if (isPHOTO > -1) app.trigger_photo(vtouch, isPHOTO);
            if (isTHERMO > -1) app.trigger_thermo(vtouch, isTHERMO);

            // DISPLAY
            if (Message.isFirstUser > -1) {

                if (Users[Message.isFirstUser].vtouch === undefined) return;
                if (Users[Message.isFirstUser].vtouch === null) return;

                if (vtouch[Message.isFirstUser].trigger == "U") {

                    var touch = Users[Message.isFirstUser].vtouch;

                    if (touch.id == "R") right("U");
                    else if (touch.id == "L") left("U");
                    else if (touch.id == "T") app.up("U");
                    else if (touch.id == "B") app.down("U");
                    else if (touch.id == "BR") back("U");
                    else if (touch.id == "BL") menu("U");
                    else if (touch.id == "TL") power("U");
                    else if (touch.id == "TR") home("U");
                    else if (touch.id == "DISPLAY") {

                        var pixel = app.getScreenPoint(touch.point);

                        display(pixel, "U");

                    }

                    Message.isFirstUser = -1;

                } else if (vtouch[Message.isFirstUser].trigger == "NU") {

                    if (vtouch[Message.isFirstUser].swipe != "N") {

                        var touch = Users[Message.isFirstUser].vtouch;

                        if (touch.id == "DISPLAY") {

                            var pixel = app.getScreenPoint(touch.point);

                            display(pixel, "U", vtouch[Message.isFirstUser].swipe);

                        }

                    }

                    Message.isFirstUser = -1;

                } else if (vtouch[Message.isFirstUser].trigger == "N") {

                    Message.isFirstUser = -1;

                } else if (vtouch[Message.isFirstUser].trigger == "D") {

                    var touch = Users[Message.isFirstUser].vtouch;

                    if (touch.id == "R") right("D");
                    else if (touch.id == "L") left("D");
                    else if (touch.id == "T") app.up("D");
                    else if (touch.id == "B") app.down("D");
                    else if (touch.id == "BR") back("D");
                    else if (touch.id == "BL") menu("D");
                    else if (touch.id == "TL") power("D");
                    else if (touch.id == "TR") home("D");
                    else if (touch.id == "DISPLAY") {

                        var pixel = app.getScreenPoint(touch.point);

                        display(pixel, "D");

                    }

                }

            } else {

                if (isDISPLAY > -1) {

                    var isFirstUser = -1;

                    for (var i = 0; i < 6; i++) {

                        if (Users[i].tracking == 1 && Users[i].triggerState == 0 && Users[i].isDownCount == 1) {

                            var touch = (Users[i].isRight) ? vtouch[i].right : vtouch[i].left;

                            if (touch.isHit) {

                                if (touch.id == "DISPLAY" || touch.id == "T" || touch.id == "B" || touch.id == "L" || touch.id == "R" || touch.id == "TL" || touch.id == "TR" || touch.id == "BL" || touch.id == "BR") isFirstUser = i;

                            }

                        }

                    }

                    if (isFirstUser > -1) {

                        Message.isFirstUser = isFirstUser;

                        var touch = (Users[Message.isFirstUser].isRight) ? vtouch[Message.isFirstUser].right : vtouch[Message.isFirstUser].left;

                        if (touch.isHit) {

                            Users[Message.isFirstUser].vtouch = {};
                            Users[Message.isFirstUser].vtouch.id = touch.id;
                            Users[Message.isFirstUser].vtouch.point = {};
                            Users[Message.isFirstUser].vtouch.point.x = touch.point.x;
                            Users[Message.isFirstUser].vtouch.point.y = touch.point.y;

                            if (touch.id == "R") right("D");
                            else if (touch.id == "L") left("D");
                            else if (touch.id == "T") app.up("D");
                            else if (touch.id == "B") app.down("D");
                            else if (touch.id == "BR") back("D");
                            else if (touch.id == "BL") menu("D");
                            else if (touch.id == "TL") power("D");
                            else if (touch.id == "TR") home("D");
                            else if (touch.id == "DISPLAY") {

                                var pixel = app.getScreenPoint(touch.point);

                                display(pixel, "D");

                            }

                        }

                    }

                }

            }

            if (isLOCKAREA > -1) app.trigger_unlock(vtouch, isLOCKAREA);

        }

    };

}());