/**
 * Created by YJIsaac on 2016. 5. 28..
 */
$(function () {

    $(document).keydown(function (e) {

        console.log(e.keyCode);

        if (e.keyCode == 192) app.setScene(MovieList);
        else if (e.keyCode == 49) app.setScene(Live);
        else if (e.keyCode == 50) app.setScene(Dart);
        else if (e.keyCode == 53) app.setScene(Keyboard);
        else if (e.keyCode == 54) app.setScene(KidsList);
        else if (e.keyCode == 55) app.setScene(SportsList);
        else if (e.keyCode == 56) app.setScene(DramaList);
        else if (e.keyCode == 57) app.setScene(Thermo);
        else if (e.keyCode == 58) app.setScene(Music);
        else if (e.keyCode == 59) app.setScene(PhotoList);
        else if (e.keyCode == 86) app.setScene(VideoView);

        if (e.keyCode == 32) {

            Message.isReady = true;
            Message.isFirstUser = -1;
            Message.isFirstUserLock = -1;
            Message.isFirstUserInSwitch = -1;
            Message.isFirstUserInMusic = -1;
            Message.isFirstUserInPhoto = -1;
            Message.isFirstUserInThermo = -1;

        }

        if (e.keyCode == 13) app.reset_select();

    });

    var sceneList = [
        Lock,
        Home,
        MovieList,
        Live,
        SportsList,
        KidsList,
        DramaList,
        PhotoList,
        MusicPlayer,
        Thermo,
        Dart,
        Keyboard,
        VideoView
    ];

    app.init(sceneList);

});

var app = {

    version: "1.1",
    sceneList: [],
    scene: null,
    sceneHistory: [],
    volume: 0.5,
    debug: false,
    tvOn: false,
    inputLast:null,
    inputSpeed:0,
    inputCount:0,
    inputTimer:null,
    inputDuration:300

};

app.init = function (_sceneList) {

    var self = this;

    if(_sceneList != undefined) self.sceneList = _sceneList;

    // 히스토리 리셋
    self.sceneHistory=[];

    // 현재 씬을 Lock 로 변경
    self.scene = self.sceneList[0];
    self.scene.init();

    // 초기화
    Notification.init();
    Outside.init();

    // 전등 끄기
    //Switch.turnOff();

    self.updateView();

};

app.updateView = function () {

    var self = this;

    for (var i = 0; i < self.sceneList.length; i++) {

        if (self.scene != self.sceneList[i]) {

            self.sceneList[i].hide();

        } else {

            self.scene.show();

        }

    }

};

//이전 씬으로 
app.backHistory = function () {

    var self = this;

    //씬 히스토리에 뭔가 있으면
    if (self.sceneHistory.length != 0) {

        //하나를 꺼내서 backScene이라고 기억
        var backScene = self.sceneHistory.pop();

        //현재 씬은 unInit();
        self.scene.unInit();

        //꺼내온 Scene을 현재 씬에 넣고
        self.scene = backScene;

        //씬이 바뀌면 외곽버튼 모양을 업데이트
        Outside.updateView();

        //뷰 업데이트
        self.updateView();

    }

};

app.setScene = function (_scene) {

    var self = this;

    //현재 씬 History stack에 push
    self.sceneHistory.push(this.scene);

    //현재 씬 unInit함
    self.scene.unInit();

    //현재 씬을 씬 리스트에서 원하는 씬으로 교체
    self.scene = _scene;

    //현재 씬을 초기화
    self.scene.init();

    //Scene마다 외곽버튼의 모습이 다름 
    Outside.updateView();

    //뷰업데이트
    self.updateView();

};

app.getScreenPoint = function (_point) {

    var x = Math.round(_point.x * 1920);
    var y = Math.round(_point.y * 1080);

    var point = { 'x': x, 'y': y };

    return point;

};

app.left = function (_trigger) {

    if (typeof app.scene.left == "function") app.scene.left(_trigger);

};

app.right = function (_trigger) {

    if (typeof app.scene.right == "function") app.scene.right(_trigger);

};

app.up = function (_trigger) {

    var self = this;

    self.setTimerToReset2();

    if (self.inputLast == "up") self.inputCount++;
    else {

        self.inputLast = "up";
        self.inputCount = 0;
        self.inputSpeed = 0;
        self.setVolume("up");

    }

    if (_trigger == "D") {

        Effect.longDown(Outside.domUp);

        if (self.inputCount > 20 - self.inputSpeed) {

            self.inputCount = 0;
            self.inputSpeed = self.inputSpeed > 9 ? 10 : self.inputSpeed + 2;
            self.setVolume("up");

        }

    } else {

        Effect.up(Outside.domUp, function () {

            self.inputCount = 0;
            self.inputSpeed = 0;
            self.inputLast = null;

        });

    }

};

app.down = function (_trigger) {

    var self = this;

    self.setTimerToReset2();

    if (self.inputLast == "down") self.inputCount++;
    else {

        self.inputLast = "down";
        self.inputCount = 0;
        self.inputSpeed = 0;
        self.setVolume("down");

    }

    if (_trigger == "D") {

        Effect.longDown(Outside.domDown);

        if (self.inputCount > 20 - self.inputSpeed) {

            self.inputCount = 0;
            self.inputSpeed = self.inputSpeed > 9 ? 10 : self.inputSpeed + 2;
            self.setVolume("down");

        }

    } else {

        Effect.up(Outside.domDown, function () {

            self.inputCount = 0;
            self.inputSpeed = 0;
            self.inputLast = null;

        });

    }

};

app.back = function (_trigger) {

    if (typeof app.scene.back == "function") app.scene.back(_trigger);

};

app.mode = function (_trigger) {

    if (typeof app.scene.mode == "function") app.scene.mode(_trigger);

};

app.menu = function (_trigger) {

    if (typeof app.scene.menu == "function") app.scene.menu(_trigger);

};

app.power = function (_trigger) {

    if (_trigger == "D") Effect.quickDown(Outside.domPower);
    else Effect.up(Outside.domPower, function () {

        Message.tvOff();

    });

};

app.home = function (_trigger) {

    if (_trigger == "D") Effect.quickDown(Outside.domHome);
    else Effect.up(Outside.domHome, function () {

        app.setScene(Home);

    });

};

app.setVolume = function (_upAndDown) {

    var self = this;

    if (_upAndDown == "up") self.volume = self.volume + 0.1 <= 1 ? self.volume + 0.1 : 1;
    else if (_upAndDown == "down") self.volume = self.volume - 0.1 >= 0 ? self.volume - 0.1 : 0;

    if (typeof self.scene.setVolume == "function") self.scene.setVolume();

    Notification.Volume.setVolume(self.volume);

};

app.setTimerToReset = function (_obj) {

    var self = this;

    if (_obj.inputTimer) clearTimeout(_obj.inputTimer);

    _obj.inputTimer = setTimeout(function () {

        self.resetTrigger(_obj);

    }, _obj.inputDuration);

};

app.resetTrigger = function (_obj) {

    _obj.inputCount = 0;
    _obj.inputSpeed = 0;
    _obj.inputLast = null;

};

app.setTimerToReset2 = function () {

    var self = this;

    if (self.inputTimer) clearTimeout(self.inputTimer);

    self.inputTimer = setTimeout(function () {

        self.resetTrigger2();

    }, self.inputDuration);

};

app.resetTrigger2 = function () {

    var self = this;
    self.inputCount = 0;
    self.inputSpeed = 0;
    self.inputLast = null;

};

app.trigger_switch = function (vtouch, isSWITCH) {

    if (Message.isFirstUserInSwitch > -1) {

        if (Users[Message.isFirstUserInSwitch].vtouch_s === undefined) return;
        if (Users[Message.isFirstUserInSwitch].vtouch_s === null) return;

        if (vtouch[Message.isFirstUserInSwitch].trigger == "U") { // 그런 인간이 있다면?? 락 풀리고 페이지 이동.

            var touch = Users[Message.isFirstUserInSwitch].vtouch_s;

            if (touch.id == "SWITCH") Switch.togglePower("U");

            Message.isFirstUserInSwitch = -1;

        } else if (vtouch[Message.isFirstUserInSwitch].trigger == "NU") {

            Message.isFirstUserInSwitch = -1;

        } else if (vtouch[Message.isFirstUserInSwitch].trigger == "N") {

            Message.isFirstUserInSwitch = -1;

        } else if (vtouch[Message.isFirstUserInSwitch].trigger == "D") {

            var touch = Users[Message.isFirstUserInSwitch].vtouch_s;

            if (touch.id == "SWITCH") Switch.togglePower("D");

        }

    }

    if (isSWITCH > -1) {

        // 첫 다운이 있는지 아닌지 체크
        var isFirstUserInSwitch = -1;

        for (var i = 0; i < 6; i++) {

            if (Users[i].tracking == 1 && Users[i].triggerState == 0 && Users[i].isDownCount == 1) {

                var touch = (Users[i].isRight) ? vtouch[i].right : vtouch[i].left;

                if (touch.isHit) {

                    if (touch.id == "SWITCH") isFirstUserInSwitch = i;

                }

            }

        }

        if (isFirstUserInSwitch > -1) { // 첫 다운이 있으면 우선권에 저장.

            Message.isFirstUserInSwitch = isFirstUserInSwitch;

            var touch = (Users[Message.isFirstUserInSwitch].isRight) ? vtouch[Message.isFirstUserInSwitch].right : vtouch[Message.isFirstUserInSwitch].left;

            if (touch.isHit) {

                Users[Message.isFirstUserInSwitch].vtouch_s = {};
                Users[Message.isFirstUserInSwitch].vtouch_s.id = touch.id;
                Users[Message.isFirstUserInSwitch].vtouch_s.point = {};
                Users[Message.isFirstUserInSwitch].vtouch_s.point.x = touch.point.x;
                Users[Message.isFirstUserInSwitch].vtouch_s.point.y = touch.point.y;

                if (touch.id == "SWITCH") Switch.togglePower("D");

            }

        }

    }

};

app.trigger_music = function (vtouch, isMUSIC) {

    if (Message.isFirstUserInMusic > -1) {

        if (Users[Message.isFirstUserInMusic].vtouch_m === undefined) return;
        if (Users[Message.isFirstUserInMusic].vtouch_m === null) return;

        // 우선권을 가지고 있는 넘이 업을 하는 케이스,
        // 그렇치 않으면 소용이 없어
        if (vtouch[Message.isFirstUserInMusic].trigger == "U") { // 그런 인간이 있다면?? 락 풀리고 페이지 이동.

            var touch = Users[Message.isFirstUserInMusic].vtouch_m;

            if (touch.id == "MUSIC") MusicPlayer.switch("U");

            Message.isFirstUserInMusic = -1;

        } else if (vtouch[Message.isFirstUserInMusic].trigger == "NU") {

            Message.isFirstUserInMusic = -1;

        } else if (vtouch[Message.isFirstUserInMusic].trigger == "N") {

            Message.isFirstUserInMusic = -1;

        } else if (vtouch[Message.isFirstUserInMusic].trigger == "D") {

            var touch = Users[Message.isFirstUserInMusic].vtouch_m;

            if (touch.id == "MUSIC") MusicPlayer.switch("D");

        }

    }

    if (isMUSIC > -1) {

        var isFirstUserInMusic = -1;

        for (var i = 0; i < 6; i++) {

            if (Users[i].tracking == 1 && Users[i].triggerState == 0 && Users[i].isDownCount == 1) {

                var touch = (Users[i].isRight) ? vtouch[i].right : vtouch[i].left;

                if (touch.isHit) {

                    if (touch.id == "MUSIC") isFirstUserInMusic = i;

                }

            }

        }

        if (isFirstUserInMusic > -1) { // 첫 다운이 있으면 우선권에 저장.

            Message.isFirstUserInMusic = isFirstUserInMusic;

            var touch = (Users[Message.isFirstUserInMusic].isRight) ? vtouch[Message.isFirstUserInMusic].right : vtouch[Message.isFirstUserInMusic].left;

            if (touch.isHit) {

                Users[Message.isFirstUserInMusic].vtouch_m = {};
                Users[Message.isFirstUserInMusic].vtouch_m.id = touch.id;
                Users[Message.isFirstUserInMusic].vtouch_m.point = {};
                Users[Message.isFirstUserInMusic].vtouch_m.point.x = touch.point.x;
                Users[Message.isFirstUserInMusic].vtouch_m.point.y = touch.point.y;

                if (touch.id == "MUSIC") MusicPlayer.switch("D");


            }

        }

    }

};

app.trigger_photo = function (vtouch, isPHOTO) {

    if (Message.isFirstUserInPhoto > -1) {

        if (Users[Message.isFirstUserInPhoto].vtouch_p === undefined) return;
        if (Users[Message.isFirstUserInPhoto].vtouch_p === null) return;

        // 우선권을 가지고 있는 넘이 업을 하는 케이스,
        // 그렇치 않으면 소용이 없어
        if (vtouch[Message.isFirstUserInPhoto].trigger == "U") { // 그런 인간이 있다면?? 락 풀리고 페이지 이동.

            var touch = Users[Message.isFirstUserInPhoto].vtouch_p;

            if (touch.id == "PHOTO") app.setScene(PhotoList);

            Message.isFirstUserInPhoto = -1;

        } else if (vtouch[Message.isFirstUserInPhoto].trigger == "NU") {

            Message.isFirstUserInPhoto = -1;

        } else if (vtouch[Message.isFirstUserInPhoto].trigger == "N") {

            Message.isFirstUserInPhoto = -1;

        } else if (vtouch[Message.isFirstUserInPhoto].trigger == "D") {

            var touch = Users[Message.isFirstUserInPhoto].vtouch_p;

        }

    }

    if (isPHOTO > -1) {

        var isFirstUserInPhoto = -1;

        for (var i = 0; i < 6; i++) {

            if (Users[i].tracking == 1 && Users[i].triggerState == 0 && Users[i].isDownCount == 1) {

                var touch = (Users[i].isRight) ? vtouch[i].right : vtouch[i].left;

                if (touch.isHit) {

                    if (touch.id == "PHOTO") isFirstUserInPhoto = i;

                }

            }

        }

        if (isFirstUserInPhoto > -1) { // 첫 다운이 있으면 우선권에 저장.

            Message.isFirstUserInPhoto = isFirstUserInPhoto;

            var touch = (Users[Message.isFirstUserInPhoto].isRight) ? vtouch[Message.isFirstUserInPhoto].right : vtouch[Message.isFirstUserInPhoto].left;

            if (touch.isHit) {

                Users[Message.isFirstUserInPhoto].vtouch_p = {};
                Users[Message.isFirstUserInPhoto].vtouch_p.id = touch.id;
                Users[Message.isFirstUserInPhoto].vtouch_p.point = {};
                Users[Message.isFirstUserInPhoto].vtouch_p.point.x = touch.point.x;
                Users[Message.isFirstUserInPhoto].vtouch_p.point.y = touch.point.y;

            }

        }

    }

};

app.trigger_thermo = function (vtouch, isTHERMO) {

    if (Message.isFirstUserInThermo > -1) {

        if (Users[Message.isFirstUserInThermo].vtouch_t === undefined) return;
        if (Users[Message.isFirstUserInThermo].vtouch_t === null) return;

        // 우선권을 가지고 있는 넘이 업을 하는 케이스,
        // 그렇치 않으면 소용이 없어
        if (vtouch[Message.isFirstUserInThermo].trigger == "U") { // 그런 인간이 있다면?? 락 풀리고 페이지 이동.

            var touch = Users[Message.isFirstUserInThermo].vtouch_t;

            if (touch.id == "THERMO") app.setScene(Thermo);

            Message.isFirstUserInThermo = -1;

        } else if (vtouch[Message.isFirstUserInThermo].trigger == "NU") {

            Message.isFirstUserInThermo = -1;

        } else if (vtouch[Message.isFirstUserInThermo].trigger == "N") {

            Message.isFirstUserInThermo = -1;

        } else if (vtouch[Message.isFirstUserInThermo].trigger == "D") {

            var touch = Users[Message.isFirstUserInThermo].vtouch_t;

        }

    }

    if (isTHERMO > -1) {

        var isFirstUserInThermo = -1;

        for (var i = 0; i < 6; i++) {

            if (Users[i].tracking == 1 && Users[i].triggerState == 0 && Users[i].isDownCount == 1) {

                var touch = (Users[i].isRight) ? vtouch[i].right : vtouch[i].left;

                if (touch.isHit) {

                    if (touch.id == "THERMO") isFirstUserInThermo = i;

                }

            }

        }

        if (isFirstUserInThermo > -1) { // 첫 다운이 있으면 우선권에 저장.

            Message.isFirstUserInThermo = isFirstUserInThermo;

            var touch = (Users[Message.isFirstUserInThermo].isRight) ? vtouch[Message.isFirstUserInThermo].right : vtouch[Message.isFirstUserInThermo].left;

            if (touch.isHit) {

                Users[Message.isFirstUserInThermo].vtouch_t = {};
                Users[Message.isFirstUserInThermo].vtouch_t.id = touch.id;
                Users[Message.isFirstUserInThermo].vtouch_t.point = {};
                Users[Message.isFirstUserInThermo].vtouch_t.point.x = touch.point.x;
                Users[Message.isFirstUserInThermo].vtouch_t.point.y = touch.point.y;

            }

        }

    }

};

app.trigger_unlock = function (vtouch, isLOCKAREA) {

    if (Message.isFirstUserLock > -1) {

        if (vtouch[Message.isFirstUserLock].trigger == "U") { // 그런 인간이 있다면?? 락 풀리고 페이지 이동.

            Users[Message.isFirstUserLock].isRight = Message.getIsRight(Users[Message.isFirstUserLock].vtouch); // 우세안 설정
            Users[Message.isFirstUserLock].tracking = 1; // 언락 상태
            Users[Message.isFirstUserLock].vtouch = null;

            if (Users[Message.isFirstUserLock].isRight) console.log("우안");
            else console.log("좌안");

            Message.isFirstUserLock = -1;
            Message.isReady = false; // 잠시 락을 위한 변수

            Notification.Lock.normalLock();
            Notification.Lock.upLock();

            setTimeout(function () {

                Message.isReady = true;

            }, 200);

            return; // 이벤트 종료

        } // 그런 인간이 아닌 사람의 업은 의미없다.

        if (vtouch[Message.isFirstUserLock].trigger == "NU") {

            Users[Message.isFirstUserLock].isRight = null;
            Users[Message.isFirstUserLock].vtouch = null;

            Message.isFirstUser = -1;

            Notification.Lock.normalLock();

            return; // 이벤트 종료

        }

        if (vtouch[Message.isFirstUserLock].trigger == "N") {

            Users[Message.isFirstUserLock].isRight = null;
            Users[Message.isFirstUserLock].vtouch = null;

            Message.isFirstUserLock = -1;

            Notification.Lock.normalLock();

            return; // 이벤트 종료

        }

        if (Message.isFirstUserLock > -1) { // 원래 다운한 사람이 있음.

            if (vtouch[Message.isFirstUserLock].trigger == "D") { // 원래 다운한 사람이 계속 다운하고 있음.

                Notification.Lock.downLock();

                return;

            } // 다운을 안한건 위에서 최상위로 처리

        }

    }

    if (isLOCKAREA > -1) { // 한명 이상이 언락 버튼에 손을 가져다 댔음

        var isFirstUserLock = -1;

        for (var i = 0; i < 6; i++) {

            if (Users[i].tracking == 0 && Users[i].triggerState == 0 && Users[i].isDownCount == 1) {

                if (Message.isLockAreaInUse(vtouch[i])) isFirstUserLock = i;

            }

        }

        if (isFirstUserLock > -1) { // 첫 다운이 있으면 우선권에 저장.

            Message.isFirstUserLock = isFirstUserLock;
            Users[Message.isFirstUserLock].vtouch = vtouch[Message.isFirstUserLock];
            Notification.Lock.downLock();

        } else { // 첫 다운이 없음.

            Message.isFirstUserLock = -1;
            Notification.Lock.normalLock();


        }

    }

};

app.reset_select = function () {

    $(".select").fadeOut();

};