namespace Manager {
    export class Data {
        private _data: Object;
        constructor() {
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
            }
        }

        public getData():Object{
            return this._data
        }
    }
}