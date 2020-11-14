"use strict";
var Manager;
(function (Manager) {
    var Data = /** @class */ (function () {
        function Data() {
            this._data = new Object();
            this._data = {
                "user": [
                    {
                        "userName": "新增會員",
                        "userAuthority": " "
                    },
                    {
                        "userName": "mumu",
                        "userAuthority": "M",
                        "password": "1111"
                    },
                    {
                        "userName": "teacher",
                        "userAuthority": "T",
                        "password": "1111"
                    },
                    {
                        "userName": "student",
                        "userAuthority": "S",
                        "password": "1111"
                    }
                ],
                "video": [
                    {
                        "name": "0",
                        "videoCount": 0,
                        "videoTime": 0
                    },
                    {
                        "name": "1",
                        "videoCount": 0,
                        "videoTime": 0
                    },
                    {
                        "name": "2",
                        "videoCount": 0,
                        "videoTime": 0
                    },
                    {
                        "name": "3",
                        "videoCount": 0,
                        "videoTime": 0
                    }
                ],
                "updateList": [
                    "1",
                    "2",
                    "3"
                ],
                "deleteList": [
                    "0"
                ]
            };
        }
        Data.prototype.getData = function () {
            return this._data;
        };
        return Data;
    }());
    Manager.Data = Data;
})(Manager || (Manager = {}));
/// <reference path="data.ts" />
var Manager;
/// <reference path="data.ts" />
(function (Manager) {
    var Model = /** @class */ (function () {
        function Model() {
            this._userData = new Object();
            this._videoData = new Object();
            this._updateList = new Object();
            this._deleteList = new Object();
        }
        Model.prototype.loadJSON = function (file) {
            var _this = this;
            console.log("load JSON");
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function (e) {
                console.log(e.currentTarget);
                var response = e.currentTarget;
                if (response.readyState == 4 && response.status == 200) {
                    var jsonObj = JSON.parse(response.responseText);
                    _this._userData = jsonObj['user'];
                    _this._videoData = jsonObj['video'];
                    _this._updateList = jsonObj['updateList'];
                    _this._deleteList = jsonObj['deleteList'];
                    localStorage.setItem('userData', JSON.stringify(_this._userData));
                    localStorage.setItem('videoData', JSON.stringify(_this._videoData));
                    localStorage.setItem('updateList', JSON.stringify(_this._updateList));
                    localStorage.setItem('deleteList', JSON.stringify(_this._deleteList));
                    var evt = new Event("loadSuccess");
                    document.dispatchEvent(evt);
                }
            };
            xmlhttp.open("GET", file, true);
            xmlhttp.send();
        };
        Model.prototype.loadLocalData = function () {
            console.log("load Local Data");
            var obj = new Manager.Data();
            var localObj = obj.getData();
            this._userData = localObj['user'];
            this._videoData = localObj['video'];
            this._updateList = localObj['updateLisvidt'];
            this._deleteList = localObj['deleteList'];
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('videoData', JSON.stringify(this._videoData));
            localStorage.setItem('updateList', JSON.stringify(this._updateList));
            localStorage.setItem('deleteList', JSON.stringify(this._deleteList));
        };
        Model.prototype.loadData = function () {
            console.log("load LocalStroage");
            this._userData = JSON.parse(localStorage.getItem('userData'));
            this._videoData = JSON.parse(localStorage.getItem('videoData'));
            this._updateList = JSON.parse(localStorage.getItem('updateList'));
            this._deleteList = JSON.parse(localStorage.getItem('deleteList'));
        };
        Model.prototype.getData = function () {
            return this._userData;
        };
        Model.prototype.getVideoData = function () {
            return this._videoData;
        };
        Model.prototype.getVideoUpload = function () {
            return this._updateList;
        };
        Model.prototype.getVideoDelete = function () {
            return this._deleteList;
        };
        Model.prototype.addData = function (name, pw) {
            var obj = { 'userName': name, "userAuthority": "S", "password": pw };
            this._userData.push(obj);
            localStorage.clear();
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('videoData', JSON.stringify(this._videoData));
            localStorage.setItem('updateList', JSON.stringify(this._updateList));
            localStorage.setItem('deleteList', JSON.stringify(this._deleteList));
        };
        Model.prototype.removeData = function (index) {
            this._userData.splice(index, 1);
            localStorage.clear();
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('videoData', JSON.stringify(this._videoData));
            localStorage.setItem('updateList', JSON.stringify(this._updateList));
            localStorage.setItem('deleteList', JSON.stringify(this._deleteList));
        };
        Model.prototype.editData = function (index, name, pw) {
            this._userData[index]['userName'] = name;
            this._userData[index]['password'] = pw;
            localStorage.clear();
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('videoData', JSON.stringify(this._videoData));
            localStorage.setItem('updateList', JSON.stringify(this._updateList));
            localStorage.setItem('deleteList', JSON.stringify(this._deleteList));
        };
        Model.prototype.editAuth = function (index, data) {
            this._userData[index]['userAuthority'] = data;
            localStorage.clear();
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('videoData', JSON.stringify(this._videoData));
            localStorage.setItem('updateList', JSON.stringify(this._updateList));
            localStorage.setItem('deleteList', JSON.stringify(this._deleteList));
        };
        Model.prototype.removeList = function (name) {
            if (this._deleteList.indexOf(name) == -1 && name != '') {
                var index = this._updateList.indexOf(name);
                this._updateList.splice(index, 1);
                this._deleteList.push(name);
                localStorage.clear();
                localStorage.setItem('userData', JSON.stringify(this._userData));
                localStorage.setItem('videoData', JSON.stringify(this._videoData));
                localStorage.setItem('updateList', JSON.stringify(this._updateList));
                localStorage.setItem('deleteList', JSON.stringify(this._deleteList));
            }
        };
        Model.prototype.uploadList = function (name) {
            if (this._updateList.indexOf(name) == -1 && name != '') {
                var index = this._deleteList.indexOf(name);
                this._deleteList.splice(index, 1);
                this._updateList.push(name);
                localStorage.clear();
                localStorage.setItem('userData', JSON.stringify(this._userData));
                localStorage.setItem('videoData', JSON.stringify(this._videoData));
                localStorage.setItem('updateList', JSON.stringify(this._updateList));
                localStorage.setItem('deleteList', JSON.stringify(this._deleteList));
            }
        };
        Model.prototype.setPlayedTimes = function (name) {
            for (var index in this._videoData) {
                if (this._videoData[index]['name'] == name) {
                    this._videoData[index]['videoCount'] += 1;
                }
            }
            localStorage.clear();
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('videoData', JSON.stringify(this._videoData));
            localStorage.setItem('updateList', JSON.stringify(this._updateList));
            localStorage.setItem('deleteList', JSON.stringify(this._deleteList));
        };
        Model.prototype.setWatchTimes = function (name, times) {
            for (var index in this._videoData) {
                if (this._videoData[index]['name'] == name) {
                    this._videoData[index]['videoTime'] += times;
                }
            }
            localStorage.clear();
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('videoData', JSON.stringify(this._videoData));
            localStorage.setItem('updateList', JSON.stringify(this._updateList));
            localStorage.setItem('deleteList', JSON.stringify(this._deleteList));
        };
        return Model;
    }());
    Manager.Model = Model;
})(Manager || (Manager = {}));
/// <reference path="Model.ts" />
var Manager;
/// <reference path="Model.ts" />
(function (Manager) {
    var Main = /** @class */ (function () {
        function Main() {
            this._select = '';
            this._playing = '0';
            this._startTime = 0;
            this._endTime = 0;
            this._auth = 'T';
            this._userName = 'S';
            this._model = new Manager.Model();
            if (localStorage.getItem('videoData') == null) {
                this._model.loadLocalData();
                this.login();
            }
            else {
                this._model.loadData();
                this.login();
            }
        }
        Main.prototype.login = function () {
            var _this = this;
            {
                var account = prompt("請輸入帳號:");
                var password = prompt("請輸入密碼:");
                var login = false;
                for (var i in this._model.getData()) {
                    if (this._model.getData()[i]['userName'] == account && this._model.getData()[i]['password'] == password) {
                        login = true;
                        this._userName = this._model.getData()[i]['userName'];
                        this._auth = this._model.getData()[i]['userAuthority'];
                        break;
                    }
                }
                if (login) {
                    alert("登入成功");
                    this.creatTable();
                    this.creatAuthorityTable();
                    this.createVideoList();
                    this.creatVideoTable();
                    $('.Tag').on('click', function (e) {
                        console.log(e.currentTarget.id);
                        document.getElementById('userName').setAttribute('style', "visibility:hidden");
                        document.getElementById('Authority').setAttribute('style', "visibility:hidden");
                        document.getElementById('video').setAttribute('style', "visibility:hidden");
                        document.getElementById('VideoData').setAttribute('style', "visibility:hidden");
                        switch (e.currentTarget.id) {
                            case "0":
                                document.getElementById('userName').setAttribute('style', "visibility:visible");
                                break;
                            case "1":
                                document.getElementById('video').setAttribute('style', "visibility:visible");
                                break;
                            case "2":
                                document.getElementById('VideoData').setAttribute('style', "visibility:visible");
                                break;
                            case "3":
                                if (_this._auth == "M") {
                                    document.getElementById('Authority').setAttribute('style', "visibility:visible");
                                }
                                break;
                        }
                    });
                    $('.videoBtn').on('click', function (e) {
                        console.log(_this._select, _this._select.indexOf("#"));
                        switch (e.currentTarget.id) {
                            case "up":
                                if (_this._select.indexOf("#") != -1) {
                                    _this._model.uploadList(_this._select.split('#')[1]);
                                }
                                else {
                                    _this._model.uploadList(_this._select);
                                }
                                _this.createVideoList();
                                break;
                            case "del":
                                _this._model.removeList(_this._select);
                                _this.createVideoList();
                                break;
                        }
                    });
                    var video = document.getElementsByTagName("video")[0];
                    video.addEventListener("ended", function () {
                        console.log('Video has been viewed!');
                        _this._model.setPlayedTimes(_this._playing);
                        _this.creatVideoTable();
                    }, true);
                    video.addEventListener("play", function () {
                        console.log('Video has been played!');
                        _this._startTime = new Date().getTime();
                    }, true);
                    video.addEventListener("pause", function () {
                        console.log('Video has been paused!');
                        _this._endTime = new Date().getTime();
                        _this._model.setWatchTimes(_this._playing, (_this._endTime - _this._startTime) / 1000);
                        _this.creatVideoTable();
                    }, true);
                }
                else {
                    alert("帳號或密碼錯誤");
                    this._auth = "G"; //Guset
                    this.creatTable();
                }
            }
        };
        Main.prototype.creatTable = function () {
            var _this = this;
            var data = this._model.getData();
            console.log(this._model.getData());
            var oldTable = document.getElementById("table");
            oldTable.remove();
            var tableParent = document.getElementById("userName");
            var table = document.createElement("tbody");
            table.setAttribute("id", "table");
            tableParent.appendChild(table);
            for (var i = 0; i < data.length; i++) {
                var row = table.insertRow(i);
                var col1 = row.insertCell(0);
                var col2 = row.insertCell(1);
                if (data[i]['userName'] == "新增會員") {
                    col1.innerHTML = "新增會員";
                    var btn = document.createElement("button");
                    btn.innerText = "登入";
                    btn.className = "editBtn";
                    btn.setAttribute("id", "login");
                    col2.appendChild(btn);
                    var btn1 = document.createElement("button");
                    btn1.innerText = "註冊";
                    btn1.className = "editBtn";
                    btn1.setAttribute("id", "add");
                    col2.appendChild(btn1);
                    if (this._auth == "G")
                        break;
                }
                else {
                    col1.innerHTML = data[i]['userName'];
                    if ((this._auth == "S" || this._auth == "T") && this._userName == data[i]['userName']) {
                        var btn = document.createElement("button");
                        btn.className = "editBtn";
                        btn.innerText = "修改";
                        btn.setAttribute("id", "edit-" + i);
                        col2.appendChild(btn);
                        var btn2 = document.createElement("button");
                        btn2.className = "editBtn";
                        btn2.innerText = "刪除";
                        btn2.setAttribute("id", "delete-" + i);
                        col2.appendChild(btn2);
                    }
                    else if (this._auth == "M") {
                        var btn = document.createElement("button");
                        btn.className = "editBtn";
                        btn.innerText = "修改";
                        btn.setAttribute("id", "edit-" + i);
                        col2.appendChild(btn);
                        var btn2 = document.createElement("button");
                        btn2.className = "editBtn";
                        btn2.innerText = "刪除";
                        btn2.setAttribute("id", "delete-" + i);
                        col2.appendChild(btn2);
                    }
                }
            }
            $(':button').on('click', function (e) {
                var idSpilt = e.target.id.split("-");
                console.log(idSpilt);
                switch (idSpilt[0]) {
                    case "login":
                        _this.login();
                        break;
                    case "add":
                        var account = prompt("請輸入帳號:");
                        var password = prompt("請輸入密碼:");
                        if (account != "" && password != "" && account != null && password != null) {
                            _this._model.addData(account, password);
                        }
                        else {
                            alert("新增失敗");
                        }
                        _this.creatTable();
                        _this.creatAuthorityTable();
                        break;
                    case "edit":
                        var account = prompt("請輸入帳號:");
                        var password = prompt("請輸入密碼:");
                        if (account != "" && password != "" && account != null && password != null) {
                            _this._model.editData(Number(idSpilt[1]), account, password);
                        }
                        else {
                            alert("修改失敗");
                        }
                        _this.creatTable();
                        _this.creatAuthorityTable();
                        break;
                    case "delete":
                        _this._model.removeData(Number(idSpilt[1]));
                        _this.creatTable();
                        _this.creatAuthorityTable();
                        break;
                }
            });
        };
        Main.prototype.creatAuthorityTable = function () {
            var _this = this;
            var data = this._model.getData();
            console.log(this._model.getData());
            var oldTable = document.getElementById("tableAuthority");
            oldTable.remove();
            var tableParent = document.getElementById("Authority");
            var table = document.createElement("tbody");
            table.setAttribute("id", "tableAuthority");
            tableParent.appendChild(table);
            for (var i = 1; i < data.length; i++) {
                var row = table.insertRow(i - 1);
                var col1 = row.insertCell(0);
                var col2 = row.insertCell(1);
                var col3 = row.insertCell(2);
                col1.innerHTML = data[i]['userName'];
                col2.innerHTML = data[i]['userAuthority'];
                var btn = document.createElement("button");
                btn.className = "editBtn";
                btn.innerText = "修改";
                btn.setAttribute("id", "auth-" + i);
                col3.appendChild(btn);
                var selectList = document.createElement("select");
                selectList.id = "select-" + i;
                col3.appendChild(selectList);
                var array = ["Manager", "Teacher", "Student"];
                var arrayValue = ["M", "T", "S"];
                for (var j = 0; j < array.length; j++) {
                    var input = document.createElement("option");
                    input.value = arrayValue[j];
                    input.text = array[j];
                    input.setAttribute("id", "auth-" + i);
                    selectList.appendChild(input);
                }
            }
            $(':button').on('click', function (e) {
                var idSpilt = e.target.id.split("-");
                console.log(idSpilt);
                switch (idSpilt[0]) {
                    case "auth":
                        var input = document.getElementById("select-" + idSpilt[1]);
                        console.log(input.value);
                        if (input.value != "") {
                            _this._model.editAuth(Number(idSpilt[1]), input.value);
                        }
                        _this.creatAuthorityTable();
                        break;
                }
            });
        };
        Main.prototype.createVideoList = function () {
            var _this = this;
            var data = this._model.getVideoUpload();
            console.log(this._model.getVideoUpload());
            var upload = document.getElementById("upload");
            if (upload) {
                while (upload.hasChildNodes()) {
                    upload.removeChild(upload.lastChild);
                }
                for (var i = 0; i < data.length; i++) {
                    var tag = document.createElement("div");
                    tag.setAttribute("class", "scrollItem");
                    tag.setAttribute("id", "video" + data[i]);
                    tag.innerText = data[i] + ".mp4";
                    upload.appendChild(tag);
                }
            }
            var dataDel = this._model.getVideoDelete();
            console.log(this._model.getVideoDelete());
            var deleteList = document.getElementById("delete");
            if (deleteList) {
                while (deleteList.hasChildNodes()) {
                    deleteList.removeChild(deleteList.lastChild);
                }
                for (var i = 0; i < dataDel.length; i++) {
                    var tag = document.createElement("div");
                    tag.setAttribute("class", "scrollItem");
                    tag.setAttribute("id", "video#" + dataDel[i]);
                    tag.innerText = dataDel[i] + ".mp4";
                    deleteList.appendChild(tag);
                }
            }
            this._select = '';
            if (this._auth == "S") {
                document.getElementById('delete').setAttribute('style', "visibility:hidden");
                document.getElementById('up').setAttribute('style', "visibility:hidden");
                document.getElementById('del').setAttribute('style', "visibility:hidden");
            }
            $('.scrollItem').on('click', function (e) {
                $('.scrollItemSelect').attr('class', 'scrollItem');
                console.log(e.currentTarget.id);
                var selectItem = document.getElementById(e.currentTarget.id);
                console.log(selectItem);
                selectItem === null || selectItem === void 0 ? void 0 : selectItem.setAttribute("class", 'scrollItemSelect');
                _this._select = e.currentTarget.id.slice(5);
            });
            $('.scrollItem').on('dblclick', function (e) {
                console.log(e.currentTarget.id);
                if (e.currentTarget.id.indexOf("#") == -1) {
                    var video = document.getElementById('videoplay');
                    if (video)
                        video.src = './assets/' + e.currentTarget.id.slice(5) + '.mp4';
                    video.load();
                    _this._playing = e.currentTarget.id.slice(5);
                }
            });
        };
        Main.prototype.creatVideoTable = function () {
            var data = this._model.getVideoData();
            console.log(this._model.getVideoData());
            var oldTable = document.getElementById("tableVideoData");
            oldTable.remove();
            var tableParent = document.getElementById("VideoData");
            var table = document.createElement("tbody");
            table.setAttribute("id", "tableVideoData");
            tableParent.appendChild(table);
            for (var i = 0; i < data.length; i++) {
                var row = table.insertRow(i);
                var col1 = row.insertCell(0);
                var col2 = row.insertCell(1);
                var col3 = row.insertCell(2);
                col1.innerHTML = data[i]['name'] + '.mp4';
                col2.innerHTML = data[i]['videoCount'];
                var date = new Date(data[i]['videoTime'] * 1000).toISOString().substr(11, 8);
                var dateSpl = date.split(':');
                console.log(dateSpl[0] + "小時" + dateSpl[1] + "分" + dateSpl[2] + "秒");
                col3.innerHTML = dateSpl[0] + "小時" + dateSpl[1] + "分" + dateSpl[2] + "秒";
            }
        };
        return Main;
    }());
    Manager.Main = Main;
    var a = new Main();
})(Manager || (Manager = {}));
