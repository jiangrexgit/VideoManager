/// <reference path="Model.ts" />
namespace Manager {
    export class Main {
        protected _model: Model
        protected _select: string = '';
        protected _playing: string = '0';
        protected _startTime: number = 0;
        protected _endTime: number = 0;

        protected _auth: string = 'T';
        protected _userName: string = 'S';

        constructor() {
            this._model = new Model();
            if (localStorage.getItem('videoData') == null) {
                this._model.loadLocalData();
                this.login();
            } else {
                this._model.loadData();
                this.login();
            }
        }

        public login(): void {
            {
                var account = prompt("請輸入帳號:");
                var password = prompt("請輸入密碼:");

                var login: boolean = false;
                for (let i in this._model.getData()) {
                    if ((this._model.getData() as any)[i]['userName'] == account && (this._model.getData() as any)[i]['password'] == password) {
                        login = true;
                        this._userName = (this._model.getData() as any)[i]['userName']
                        this._auth = (this._model.getData() as any)[i]['userAuthority']
                        break;
                    }
                }
                if (login) {
                    alert("登入成功");

                    this.creatTable();
                    this.creatAuthorityTable();
                    this.createVideoList();
                    this.creatVideoTable();

                    $('.Tag').on('click', (e) => {
                        console.log(e.currentTarget.id);
                        (document.getElementById('userName') as HTMLTableElement).setAttribute('style', "visibility:hidden");
                        (document.getElementById('Authority') as HTMLTableElement).setAttribute('style', "visibility:hidden");
                        (document.getElementById('video') as HTMLTableElement).setAttribute('style', "visibility:hidden");
                        (document.getElementById('VideoData') as HTMLTableElement).setAttribute('style', "visibility:hidden");
                        switch (e.currentTarget.id) {
                            case "0":
                                (document.getElementById('userName') as HTMLTableElement).setAttribute('style', "visibility:visible");
                                break;
                            case "1":
                                (document.getElementById('video') as HTMLTableElement).setAttribute('style', "visibility:visible");
                                break;
                            case "2":
                                (document.getElementById('VideoData') as HTMLTableElement).setAttribute('style', "visibility:visible");
                                break;
                            case "3":
                                if (this._auth == "M") {
                                    (document.getElementById('Authority') as HTMLTableElement).setAttribute('style', "visibility:visible");
                                }
                                break;
                        }
                    })

                    $('.videoBtn').on('click', (e) => {
                        console.log(this._select, this._select.indexOf("#"));


                        switch (e.currentTarget.id) {
                            case "up":
                                if (this._select.indexOf("#") != -1) {
                                    this._model.uploadList(this._select.split('#')[1]);
                                } else {
                                    this._model.uploadList(this._select);
                                }
                                this.createVideoList();
                                break;
                            case "del":
                                this._model.removeList(this._select);
                                this.createVideoList();
                                break;
                        }
                    });

                    var video = document.getElementsByTagName("video")[0];
                    video.addEventListener("ended", () => {
                        console.log('Video has been viewed!');
                        this._model.setPlayedTimes(this._playing);
                        this.creatVideoTable();
                    }, true);
                    video.addEventListener("play", () => {
                        console.log('Video has been played!')
                        this._startTime = new Date().getTime();
                    }, true);
                    video.addEventListener("pause", () => {
                        console.log('Video has been paused!');
                        this._endTime = new Date().getTime();
                        this._model.setWatchTimes(this._playing, (this._endTime - this._startTime) / 1000);
                        this.creatVideoTable();
                    }, true);
                }
                else {
                    alert("帳號或密碼錯誤");
                    this._auth = "G"//Guset
                    this.creatTable();
                }
            }
        }

        public creatTable(): void {
            var data: any = (this._model.getData() as any);
            console.log(this._model.getData());
            var oldTable = document.getElementById("table");
            (oldTable as HTMLTableElement).remove();

            let tableParent = document.getElementById("userName");
            let table = document.createElement("tbody");
            table.setAttribute("id", "table");
            (tableParent as HTMLTableElement).appendChild(table);

            for (var i = 0; i < data.length; i++) {

                var row = table.insertRow(i);
                var col1 = row.insertCell(0);
                var col2 = row.insertCell(1);

                if (data[i]['userName'] == "新增會員") {
                    col1.innerHTML = "新增會員";
                    let btn = document.createElement("button");
                    btn.innerText = "登入";
                    btn.className = "editBtn";
                    btn.setAttribute("id", "login")
                    col2.appendChild(btn);

                    let btn1 = document.createElement("button");
                    btn1.innerText = "註冊";
                    btn1.className = "editBtn";
                    btn1.setAttribute("id", "add")
                    col2.appendChild(btn1);
                    if (this._auth == "G") break;
                } else {
                    col1.innerHTML = data[i]['userName'];
                    if ((this._auth == "S" || this._auth == "T") && this._userName == data[i]['userName']) {
                        let btn = document.createElement("button");
                        btn.className = "editBtn";
                        btn.innerText = "修改";
                        btn.setAttribute("id", "edit-" + i);
                        col2.appendChild(btn);
                        let btn2 = document.createElement("button");
                        btn2.className = "editBtn";
                        btn2.innerText = "刪除"
                        btn2.setAttribute("id", "delete-" + i);
                        col2.appendChild(btn2);
                    } else if (this._auth == "M") {
                        let btn = document.createElement("button");
                        btn.className = "editBtn";
                        btn.innerText = "修改";
                        btn.setAttribute("id", "edit-" + i);
                        col2.appendChild(btn);
                        let btn2 = document.createElement("button");
                        btn2.className = "editBtn";
                        btn2.innerText = "刪除"
                        btn2.setAttribute("id", "delete-" + i);
                        col2.appendChild(btn2);
                    }
                }
            }

            $(':button').on('click', (e) => {
                var idSpilt = e.target.id.split("-")
                console.log(idSpilt)
                switch (idSpilt[0]) {
                    case "login":
                        this.login();
                        break;
                    case "add":
                        var account = prompt("請輸入帳號:");
                        var password = prompt("請輸入密碼:");
                        if (account != "" && password != "" && account != null && password != null) {
                            this._model.addData((account as string), (password as string));
                        } else {
                            alert("新增失敗");
                        }
                        this.creatTable();
                        this.creatAuthorityTable();
                        break;
                    case "edit":
                        var account = prompt("請輸入帳號:");
                        var password = prompt("請輸入密碼:");
                        if (account != "" && password != "" && account != null && password != null) {
                            this._model.editData(Number(idSpilt[1]), (account as string), (password as string));
                        } else {
                            alert("修改失敗");
                        }
                        this.creatTable();
                        this.creatAuthorityTable();
                        break;
                    case "delete":
                        this._model.removeData(Number(idSpilt[1]));
                        this.creatTable();
                        this.creatAuthorityTable();
                        break;
                }
            });
        }

        public creatAuthorityTable(): void {
            var data: any = (this._model.getData() as any);
            console.log(this._model.getData());
            var oldTable = document.getElementById("tableAuthority");
            (oldTable as HTMLTableElement).remove();

            let tableParent = document.getElementById("Authority");
            let table = document.createElement("tbody");
            table.setAttribute("id", "tableAuthority");
            (tableParent as HTMLTableElement).appendChild(table);

            for (var i = 1; i < data.length; i++) {
                var row = table.insertRow(i - 1);
                var col1 = row.insertCell(0);
                var col2 = row.insertCell(1);
                var col3 = row.insertCell(2);

                col1.innerHTML = data[i]['userName'];
                col2.innerHTML = data[i]['userAuthority'];
                let btn = document.createElement("button");
                btn.className = "editBtn";
                btn.innerText = "修改";
                btn.setAttribute("id", "auth-" + i);
                col3.appendChild(btn);

                var selectList = document.createElement("select");
                selectList.id = "select-" + i;
                col3.appendChild(selectList);

                var array = ["Manager", "Teacher", "Student"]
                var arrayValue = ["M", "T", "S"]
                for (let j = 0; j < array.length; j++) {
                    let input = document.createElement("option");
                    (input as any).value = arrayValue[j];
                    (input as any).text = array[j];
                    input.setAttribute("id", "auth-" + i)
                    selectList.appendChild(input);
                }

            }

            $(':button').on('click', (e) => {
                var idSpilt = e.target.id.split("-")
                console.log(idSpilt)
                switch (idSpilt[0]) {
                    case "auth":
                        let input = document.getElementById("select-" + idSpilt[1]);
                        console.log((input as any).value)
                        if ((input as any).value != "") {
                            this._model.editAuth(Number(idSpilt[1]), (input as any).value);
                        }
                        this.creatAuthorityTable();
                        break;
                }
            });
        }

        public createVideoList(): void {
            var data: any = (this._model.getVideoUpload() as any);
            console.log(this._model.getVideoUpload());
            var upload = document.getElementById("upload");
            if (upload) {
                while (upload.hasChildNodes()) {
                    upload.removeChild(upload.lastChild);
                }

                for (var i = 0; i < data.length; i++) {
                    let tag = document.createElement("div");
                    tag.setAttribute("class", "scrollItem");
                    tag.setAttribute("id", "video" + data[i]);
                    tag.innerText = data[i] + ".mp4";
                    upload.appendChild(tag);
                }
            }

            var dataDel: any = (this._model.getVideoDelete() as any);
            console.log(this._model.getVideoDelete());
            var deleteList = document.getElementById("delete");
            if (deleteList) {
                while (deleteList.hasChildNodes()) {
                    deleteList.removeChild(deleteList.lastChild);
                }

                for (var i = 0; i < dataDel.length; i++) {
                    let tag = document.createElement("div");
                    tag.setAttribute("class", "scrollItem");
                    tag.setAttribute("id", "video#" + dataDel[i]);
                    tag.innerText = dataDel[i] + ".mp4";
                    deleteList.appendChild(tag);
                }
            }
            this._select = ''
            if (this._auth == "S") {
                (document.getElementById('delete') as HTMLElement).setAttribute('style', "visibility:hidden");
                (document.getElementById('up') as HTMLElement).setAttribute('style', "visibility:hidden");
                (document.getElementById('del') as HTMLElement).setAttribute('style', "visibility:hidden");
            }

            $('.scrollItem').on('click', (e) => {
                $('.scrollItemSelect').attr('class', 'scrollItem');
                console.log(e.currentTarget.id);
                var selectItem = document.getElementById(e.currentTarget.id);
                console.log(selectItem)
                selectItem?.setAttribute("class", 'scrollItemSelect');
                this._select = e.currentTarget.id.slice(5);
            });

            $('.scrollItem').on('dblclick', (e) => {
                console.log(e.currentTarget.id);
                if (e.currentTarget.id.indexOf("#") == -1) {
                    var video = document.getElementById('videoplay');
                    if (video) (video as HTMLVideoElement).src = './assets/' + e.currentTarget.id.slice(5) + '.mp4';
                    (video as HTMLVideoElement).load();
                    this._playing = e.currentTarget.id.slice(5);
                }
            });
        }

        public creatVideoTable(): void {
            var data: any = (this._model.getVideoData() as any);
            console.log(this._model.getVideoData());
            var oldTable = document.getElementById("tableVideoData");
            (oldTable as HTMLTableElement).remove();

            let tableParent = document.getElementById("VideoData");
            let table = document.createElement("tbody");
            table.setAttribute("id", "tableVideoData");
            (tableParent as HTMLTableElement).appendChild(table);

            for (var i = 0; i < data.length; i++) {

                var row = table.insertRow(i);
                var col1 = row.insertCell(0);
                var col2 = row.insertCell(1);
                var col3 = row.insertCell(2);

                col1.innerHTML = data[i]['name'] + '.mp4';
                col2.innerHTML = data[i]['videoCount'];
                var date = new Date(data[i]['videoTime'] * 1000).toISOString().substr(11, 8)
                var dateSpl = date.split(':')
                console.log(dateSpl[0] + "小時" + dateSpl[1] + "分" + dateSpl[2] + "秒")
                col3.innerHTML = dateSpl[0] + "小時" + dateSpl[1] + "分" + dateSpl[2] + "秒";
            }
        }
    }

    let a = new Main();
}

