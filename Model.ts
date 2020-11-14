/// <reference path="data.ts" />
namespace Manager {
    export class Model {

        protected _userData: any;
        protected _videoData: any;
        protected _updateList: any;
        protected _deleteList: any;

        constructor() {
            this._userData = new Object();
            this._videoData = new Object();
            this._updateList = new Object();
            this._deleteList = new Object();
        }

        public loadJSON(file: string): void {
            console.log("load JSON");
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = (e: Event) => {
                console.log(e.currentTarget);
                var response = e.currentTarget as XMLHttpRequest
                if (response.readyState == 4 && response.status == 200) {
                    var jsonObj = JSON.parse(response.responseText);
                    this._userData = jsonObj['user'];
                    this._videoData = jsonObj['video'];
                    this._updateList = jsonObj['updateList'];
                    this._deleteList = jsonObj['deleteList'];

                    localStorage.setItem('userData', JSON.stringify(this._userData));
                    localStorage.setItem('videoData', JSON.stringify(this._videoData));
                    localStorage.setItem('updateList', JSON.stringify(this._updateList));
                    localStorage.setItem('deleteList', JSON.stringify(this._deleteList));

                    var evt = new Event("loadSuccess");
                    document.dispatchEvent(evt);
                }
            };

            xmlhttp.open("GET", file, true);
            xmlhttp.send();
        }

        public loadLocalData(): void {
            console.log("load Local Data");
            var obj = new Data();
            var localObj:any = obj.getData();
            this._userData = localObj['user'];
            this._videoData = localObj['video'];
            this._updateList = localObj['updateLisvidt'];
            this._deleteList = localObj['deleteList'];

            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('videoData', JSON.stringify(this._videoData));
            localStorage.setItem('updateList', JSON.stringify(this._updateList));
            localStorage.setItem('deleteList', JSON.stringify(this._deleteList));
        }

        public loadData(): void {
            console.log("load LocalStroage");
            this._userData = JSON.parse(localStorage.getItem('userData') as string);
            this._videoData = JSON.parse(localStorage.getItem('videoData') as string);
            this._updateList = JSON.parse(localStorage.getItem('updateList') as string);
            this._deleteList = JSON.parse(localStorage.getItem('deleteList') as string);
        }

        public getData(): Object {
            return this._userData;
        }

        public getVideoData(): Object {
            return this._videoData;
        }

        public getVideoUpload(): Object {
            return this._updateList;
        }

        public getVideoDelete(): Object {
            return this._deleteList;
        }

        public addData(name: string, pw: string): void {
            let obj = { 'userName': name, "userAuthority": "S", "password": pw }
            this._userData.push(obj)
            localStorage.clear();
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('videoData', JSON.stringify(this._videoData));
            localStorage.setItem('updateList', JSON.stringify(this._updateList));
            localStorage.setItem('deleteList', JSON.stringify(this._deleteList));
        }

        public removeData(index: number): void {
            this._userData.splice(index, 1);
            localStorage.clear();
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('videoData', JSON.stringify(this._videoData));
            localStorage.setItem('updateList', JSON.stringify(this._updateList));
            localStorage.setItem('deleteList', JSON.stringify(this._deleteList));
        }

        public editData(index: number, name: string, pw: string): void {
            this._userData[index]['userName'] = name;
            this._userData[index]['password'] = pw;
            localStorage.clear();
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('videoData', JSON.stringify(this._videoData));
            localStorage.setItem('updateList', JSON.stringify(this._updateList));
            localStorage.setItem('deleteList', JSON.stringify(this._deleteList));
        }

        public editAuth(index: number, data: string): void {
            this._userData[index]['userAuthority'] = data;
            localStorage.clear();
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('videoData', JSON.stringify(this._videoData));
            localStorage.setItem('updateList', JSON.stringify(this._updateList));
            localStorage.setItem('deleteList', JSON.stringify(this._deleteList));
        }

        public removeList(name: string): void {
            if (this._deleteList.indexOf(name) == -1 && name != '') {
                let index = this._updateList.indexOf(name);
                this._updateList.splice(index, 1);
                this._deleteList.push(name);
                localStorage.clear();
                localStorage.setItem('userData', JSON.stringify(this._userData));
                localStorage.setItem('videoData', JSON.stringify(this._videoData));
                localStorage.setItem('updateList', JSON.stringify(this._updateList));
                localStorage.setItem('deleteList', JSON.stringify(this._deleteList));
            }
        }

        public uploadList(name: string): void {
            if (this._updateList.indexOf(name) == -1 && name != '') {
                let index = this._deleteList.indexOf(name);
                this._deleteList.splice(index, 1);
                this._updateList.push(name);
                localStorage.clear();
                localStorage.setItem('userData', JSON.stringify(this._userData));
                localStorage.setItem('videoData', JSON.stringify(this._videoData));
                localStorage.setItem('updateList', JSON.stringify(this._updateList));
                localStorage.setItem('deleteList', JSON.stringify(this._deleteList));
            }
        }

        public setPlayedTimes(name: string): void {
            for (let index in this._videoData) {
                if (this._videoData[index]['name'] == name) {
                    this._videoData[index]['videoCount'] += 1;
                }
            }
            localStorage.clear();
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('videoData', JSON.stringify(this._videoData));
            localStorage.setItem('updateList', JSON.stringify(this._updateList));
            localStorage.setItem('deleteList', JSON.stringify(this._deleteList));
        }

        public setWatchTimes(name: string, times: number): void {
            for (let index in this._videoData) {
                if (this._videoData[index]['name'] == name) {
                    this._videoData[index]['videoTime'] += times;
                }
            }
            localStorage.clear();
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('videoData', JSON.stringify(this._videoData));
            localStorage.setItem('updateList', JSON.stringify(this._updateList));
            localStorage.setItem('deleteList', JSON.stringify(this._deleteList));
        }
    }
}

