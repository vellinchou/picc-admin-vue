//用户信息


var RTCRoom = {
    /**
     *  @param object
     *  {
     *  data: {
     *      serverDomain  String   请求的后台地址
     *      userID        String    用户ID
     *      sdkAppID      String    IM登录凭证
     *      divId         String    推流画面所在的div
     *      accType       Int       账号集成类型
     *  }
     * success       function  成功回调
     * fail          function  失败回调
     * }
     *
     */
    init: function (object) {},


    /**
     * 拉取房间列表
     * @param object
     * {
     * data: {
     *      index    Int            获取的房间开始索引， 从0开始计算
     *      cnt      Int            获取的房间个数
     * }
     *success  function       成功回调, 回调的参数为房间信息列表数组roomInfos
     *fail     fucntion       失败回调
     * }
     */
    getRoomList: function (object) {},



    /**
     * 设置事件监听
     * @param object
     * {
     *  onGetPusherList     function   成员列表事件回调
     *  onPusherJoin        function    成员进房事件回调
     *  onPusherQuit        function    成员退房事件回调
     *  onRoomClose         function    房间解散通知
     *  onRecvRoomTextMsg   function    消息通知
     * }
     */
    setListener: function (object) {},


    /**
     * 创建房间
     * @param object
     * {
     * data: {
     *   roomName 房间名
     * }
     * success     function   成功回调
     * fail        function  失败回调
     * }
     */
    creatRoom:function (object) {},


    /**
     * 进入房间
     * @param object
     * {
     * data: {
     *      roomID      String 房间号
     * }
     * success      function     成功回调
     * fail         function     失败回调
     * }
     */
    enterRoom: function (object) {},



    /**
     * 离开房间
     * @param object
     * {
     * success   成功回调
     * fail      失败回调
     * }
     */
    exitRoom: function (object) {},


    /**
     * 进入房间
     * @param object
     * {
     *  data: {
     *  roomID      `String 房间号
     *  }
     * success       function 成功回调
     * fail          function 失败回调
     * }
     */
    startLocalPreview: function (object) {},


    /**
     * 播放指定userID的视频
     * @param object
     * {
     *  data: {
     *      divId    String      播放的视频区域div控件id
     *      userId   String      要播放的成员的id
     *  }
     * success       成功回调
     * fail          失败回调
     * }
     */
    addRemoteView: function (object) {},


    /**
     * 停止播放指定userID的视频
     * @param object
     * {
     *  data: {
     *      userId     String     要停止播放的成员的id
     *  }
     * success   function 成功回调
     * fail      function 失败回调
     */
    deleteRemoteView: function (object) {},



    /**
     * 发送文本消息
     * @param {options}
     *{
     * data: {
 *   	msg:    String  文本消息
 *    }
 *   }
     */
    sendRoomTextMsg: function (object) {},


    /**
     * 获取当前摄像头
     * @return  摄像头数组
     */
    getCameras: function () {},


    /**
     * 设置视频分辨率
     * @param resolution  设置的分辨率, 以下的数值之一
     * 	// 普屏 4:3
     AX_TXE_VIDEO_RESOLUTION_320x240 = 1,
     AX_TXE_VIDEO_RESOLUTION_640x480 = 2,

     // 宽屏16:9
     AX_TXE_VIDEO_RESOLUTION_480x272 = 3,
     AX_TXE_VIDEO_RESOLUTION_640x360 = 4,
     AX_TXE_VIDEO_RESOLUTION_672x378 = 5,
     AX_TXE_VIDEO_RESOLUTION_1024x600 = 6,
     AX_TXE_VIDEO_RESOLUTION_1280x720 = 7,
     AX_TXE_VIDEO_RESOLUTION_1920x1080 = 8,
     */
    setVideoResolution: function (resoulation) {},


    /**
     * 设置视频码率
     * @param minBitrate  最小码率值
     * @param maxBitrate  最大码率值
     */
    setBitrateRange: function (minBitrate, maxBitrate) {},

    /**
     * brief：设置美颜和美白效果
     * param：eBeautyStyle    - 参考 LiteAVActiveXPlugin.idl 中定义的 AxTXEBeautyStyle 枚举值
     * param：lBeautyLevel    - 美颜级别取值范围 1 ~ 9； 0 表示关闭，1 ~ 9值越大，效果越明显
     * param：lWhitenessLevel - 美白级别取值范围 1 ~ 9； 0 表示关闭，1 ~ 9值越大，效果越明显
     *AX_TXE_BEAUTY_STYLE_SMOOTH = 0,        // 光滑
     *AX_TXE_BEAUTY_STYLE_NATURE = 1,        // 自然
     *AX_TXE_BEAUTY_STYLE_BLUR = 2,        // 朦胧
     */
    setBeauty: function (style, beautyLevel, whitenessLevel) {

    }
};

RTCRoom = (function () {

var accountInfo = {
        userID: '',			// 用户ID
        userName: '',		   // 用户昵称
        userAvatar: '',		// 用户头像URL
        userSig: '',		// IM登录凭证
        sdkAppID: '',		// IM应用ID
        accountType: '',	// 账号集成类型
        accountMode: 0,		//帐号模式，0-表示独立模式，1-表示托管模式
        pushURL: '',        //推流地址
        isCreator: false,    //是否是房间创建者
        previewDivId: "",
    },
    // 房间信息
    roomInfo = {
        roomID: '',			// 视频位房间ID
        roomName: '',		// 房间名称
        mixedPlayURL: '', 	// 混流地址
        pushers: [],		// 当前用户信息accelerateURL userAvatar, userID, userName
        isDestory: true,// 是否已解散
    },

    event = {
        onGetPusherList: function () { },		// 初始化成员列表
        onPusherJoin: function () { },			// 进房通知
        onPusherQuit: function () { },			// 退房通知
        onRoomClose: function() {},			// 群解散通知
        onRecvRoomTextMsg: function() {}		// 消息通知
    };



    var serverDomain = '', heart = '', viewTag = 0;

/************************************************************************************/
/*HttpRequest
/************************************************************************************/
    function request(object) {
       if (!serverDomain)  {
           console.log('请设置serverDomain');
           object.fail || object.fail({errCode:-1, errMsg:"serverDomain为空, 请调用init接口进行设置"});
           return;
       }
       httpRequest({
           url: serverDomain + object.url,
           data: object.data || {},
           method: "POST",
           success: object.success || function () {},
           fail: object.fail || function () {},
           complete: object.complete || function () {}
       })
    }

function httpRequest(object) {
    object= object|| {};
    object.method = (object.method|| "GET").toUpperCase();
    object.dataType = "json";
    var params = formatParams(object.data);

    //创建 - 非IE6 - 第一步
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else { //IE6及其以下版本浏览器
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

   var timeout_time = typeof(object.timeout) == "undefined" ? 10000 : object.timeout;
    var timeout = false;
    var timer = setTimeout(function () {
        timeout = true;
        xhr.abort();
    }, timeout_time);
    //接收 - 第三步
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (timeout) {
                object.fail && object.fail({code: -1, msg:"请求超时"});
            }
            var status = xhr.status;
            clearTimeout(timer);
            if (status >= 200 && status < 300) {
                var jsonObj = JSON.parse(xhr.responseText);
                object.success && object.success({status: status, data:jsonObj});
            } else {
                object.fail && object.fail({code:status, msg:xhr.message});
            }

            object.complete && object.complete();
        }
    }

    //连接 和 发送 - 第二步
    if (object.method == "GET") {
        xhr.open("GET", object.url + "?" + params, true);
        xhr.send(null);
    } else if (object.method == "POST") {
        xhr.open("POST", object.url, true);
        //设置表单提交时的内容类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }
}
//格式化参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".",""));
    return arr.join("&");
}
/**
 * 初始化信息。请先获取 登 录信息之后传入(包括账号信息与IM信息)
 * @param object
 * object.data.serverDomain  请求的后台地址
 * object.data.userID        用户ID
 * object.data.sdkAppID      IM登录凭证
 * object.data.divId         推流画面所在的div
 * object.data.accType       账号集成类型
 * object.success            成功回调
 * object.fail               失败回调
 */
function init(object) {
    if (!object || !object.data.serverDomain) {
        console.log("init参数错误");
        object.fail();
        return;
    }

    serverDomain = object.data.serverDomain;
    accountInfo.userID = object.data.userID;
    accountInfo.userSig = object.data.userSig;
    accountInfo.sdkAppID = object.data.sdkAppID;
    accountInfo.accountType = object.data.accType;
    accountInfo.userName = object.data.userName || accountInfo.userID;
    accountInfo.userAvatar = object.userAvatar || "123";
    accountInfo.previewDivId = object.data.divId;

    object.success && object.success({
        userName: accountInfo.userName
    });
}

function getLivePusher() {
    var livePusher = document.getElementById(accountInfo.userID);
    if (!livePusher) {
        var parentView = document.getElementById(accountInfo.previewDivId);
        var width = parentView.offsetWidth;
        var height = parentView.offsetHeight;

        // var html = '<object ID="Pusher" CLASSID="CLSID:01502AEB-675D-4744-8C84-9363788ED6D" codebase="./LiteAVAX.cab#version=1,0,0,1" width=' + width.toString() + "height=" + height.toString() + 'event="true"></object>';
        var html = '<object ID=' + accountInfo.userID.toString() + ' CLASSID="CLSID:01502AEB-675D-4744-8C84-9363788ED6D6"\n' +
            '                        codebase="./static/sdk/LiteAVAX.cab#version=1,2,1,5"\n' +
            '                        width=' + width.toString() + "\n"  +
            '                        height=' + height.toString() + "\n" +
            '                        events="True"></object>';
        parentView.innerHTML = html;
        

        var livePusher = document.getElementById(accountInfo.userID);

        console.log('getLivePusher')
        console.log(livePusher)

        livePusher.setRenderWndSize(width, height);
    }
    return livePusher;
}


/**
 * [loginIM 登录IM]
 * @param {options}
 *   data: {
 *   	roomID: 房间ID
 *   }
 *   success: 成功回调
 *   fail: 失败回调
 */
function loginIM(options) {
    roomInfo.isDestory = false;
    // 初始化设置参数
    webimhandler.init({
        accountMode: accountInfo.accountMode,
        accountType: accountInfo.accountType,
        sdkAppID: accountInfo.sdkAppID,
        avChatRoomId: options.roomID,
        selType: webim.SESSION_TYPE.GROUP,
        selToID: options.roomID,
        selSess: null //当前聊天会话
    });
    //当前用户身份
    var userInfo = {
        'sdkAppID': accountInfo.sdkAppID, //用户所属应用id,必填
        'appIDAt3rd': accountInfo.sdkAppID, //用户所属应用id，必填
        'accountType': accountInfo.accountType, //用户所属应用帐号类型，必填
        'identifier': accountInfo.userID, //当前用户ID,必须是否字符串类型，选填
        'identifierNick': accountInfo.userName, //当前用户昵称，选填
        'userSig': accountInfo.userSig, //当前用户身份凭证，必须是字符串类型，选填
    };
    console.log(userInfo in loginIM)

    //监听（多终端同步）群系统消息方法，方法都定义在demo_group_notice.js文件中
    var onGroupSystemNotifys = {
        // 群被解散(全员接收)
        "5": function(notify) {
            roomInfo.isDestory = true;
            event.onRoomClose();
        },
        "11": webimhandler.onRevokeGroupNotify, //群已被回收(全员接收)
        // 用户自定义通知(默认全员接收)
        "255": function(notify) {
            console.error('收到系统通知：',notify.UserDefinedField);
            var content = JSON.parse(notify.UserDefinedField);
            if(content && content.cmd == 'notifyPusherChange') {
                mergePushers();
            }
        }
    };

    //监听连接状态回调变化事件
    var onConnNotify = function (resp) {
        switch (resp.ErrorCode) {
            case webim.CONNECTION_STATUS.ON:
                console.log.warn('webim连接状态正常...');
                break;
            case webim.CONNECTION_STATUS.OFF:
                console.log('webim连接已断开，无法收到新消息，请检查下你的网络是否正常');
                break;
            default:
                console.log('webim未知连接状态,status=' + resp.ErrorCode);
                break;
        }
    };

    //监听事件
    var listeners = {
        "onConnNotify": webimhandler.onConnNotify, //选填
        "onBigGroupMsgNotify": function (msg) {
            webimhandler.onBigGroupMsgNotify(msg, function (msgs) {
                receiveMsg(msgs);
            })
        }, //监听新消息(大群)事件，必填
        "onMsgNotify": webimhandler.onMsgNotify, //监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件，必填
        "onGroupSystemNotifys": onGroupSystemNotifys, //监听（多终端同步）群系统消息事件，必填
        "onGroupInfoChangeNotify": webimhandler.onGroupInfoChangeNotify,
        // 'onKickedEventCall': self.onKickedEventCall // 踢人操作
    };

    //其他对象，选填
    var others = {
        'isAccessFormalEnv': true, //是否访问正式环境，默认访问正式，选填
        'isLogOn': false //是否开启控制台打印日志,默认开启，选填
    };

    if (accountInfo.accountMode == 1) { //托管模式
        debugger
        webimhandler.sdkLogin(userInfo, listeners, others, 0, afterLoginIM, options);
    } else { //独立模式
        //sdk登录
        debugger
        webimhandler.sdkLogin(userInfo, listeners, others, 0, afterLoginIM, options);
    }
}
function afterLoginIM(options) {
    if(options.errCode) {
        // webim登录失败
        console.log('webim登录失败:');
        options.callback.fail && options.callback.fail({
            errCode: -2,
            errMsg: '登录失败'
        });
        return;
    }
    // webim登录成功
    console.log('webim登录成功');
    webimhandler.applyJoinBigGroup(roomInfo.roomID, afterJoinBigGroup, {
        success: options.callback.success,
        fail: options.callback.fail
    });
}
function afterJoinBigGroup(options) {
    if(options.errCode) {
        console.log('进入IM房间失败: ');
        options.callback.fail && options.callback.fail({
            errCode: -2,
            errMsg: '登录失败'
        });
        return;
    }
    console.log('进入IM房间成功: ',roomInfo.roomID);
}

/**
 * [receiveMsg 接收消息处理]
 * @param {options}
 *
 * @return event.onRecvRoomTextMsg
 *   roomID: 房间ID
 *   userID: 用户ID
 *   nickName: 用户昵称
 *   headPic: 用户头像
 *   textMsg: 文本消息
 *   time: 消息时间
 */
function receiveMsg(msg) {
    if (!msg.content) {  return; }
    console.log('IM消息: ',msg);
    var time = new Date();
    var h = time.getHours()+'', m = time.getMinutes()+'', s = time.getSeconds()+'';
    h.length == 1 ? (h='0'+h) : '';
    m.length == 1 ? (m='0'+m) : '';
    s.length == 1 ? (s='0'+s) : '';
    time = h + ':' + m + ':' + s;
    msg.time = time;

    if(msg.fromAccountNick == '@TIM#SYSTEM') {
        msg.fromAccountNick = '';
        msg.content = msg.content.split(';');
        msg.content = msg.content[0];
    } else {
        var contentObj,newContent;
        newContent = msg.content.split('}}');
        contentObj = JSON.parse(newContent[0] + '}}');
        if(contentObj.cmd == 'CustomTextMsg') {
            msg.nickName = contentObj.data.nickName;
            msg.headPic = contentObj.data.headPic;
            var content = '';
            for(var i = 1; i < newContent.length; i++) {
                if(i == newContent.length - 1)
                    content += newContent[i];
                else content += newContent[i] + '}}';
            }
            msg.content = content;
        }
    }
    event.onRecvRoomTextMsg({
        roomID: roomInfo.roomID,
        userID: msg.fromAccountNick,
        nickName: msg.nickName,
        headPic: msg.headPic,
        textMsg: msg.content,
        time: msg.time
    });
};

/**
 * [sendRoomTextMsg 发送文本消息]
 * @param {options}
 *   data: {
 *   	msg: 文本消息
 *   }
 */
function sendRoomTextMsg(options) {
    if(!options || !options.data.msg || !options.data.msg.replace(/^\s*|\s*$/g, '')) {
        console.log('sendRoomTextMsg参数错误',options);
        return;
    }
    webimhandler.sendCustomMsg({
        data: '{"cmd":"CustomTextMsg","data":{"nickName":"'+accountInfo.userName+'","headPic":"'+accountInfo.userAvatar+'"}}',
        text: options.data.msg
    },function() {
        options.success && options.success();
    });
}

/**
 * [joinPusher 加入推流]
 * @param {options}
 *   data: {
 *   	roomID: 房间ID
 *   	pushURL: 推流地址
 *   }
 *   success: 成功回调
 *   fail: 失败回调
 */
function joinPusher(options) {
    if(!options || !options.data.roomID || !options.data.pushURL) {
        console.log('joinPusher参数错误',options);
        return;
    }
    roomInfo.roomID = options.data.roomID;
    proto_enterRoom(options);
}


/**
 * [getPushers 拉取所有主播信息]
 * @param {options}
 *   success: 成功回调
 *   fail: 失败回调
 *
 * @return success
 *   mixedPlayURL: 混流地址
 *   pushers: 房间成员
 */
function getPushers(options) {
    options = options || {};
    request({
        url: 'get_pushers',
        data: { roomID: roomInfo.roomID },
        success: function(ret) {
            if(ret.data.code) {
                console.log('拉取所有主播信息失败: ');
                options.fail && options.fail({
                    errCode: ret.data.code,
                    errMsg: ret.data.message + '[' + ret.data.code + ']'
                });
                return;
            }
            console.log('拉取所有主播信息成功');
            var returnPushers = [];
            ret.data.pushers.forEach(function(val){
                if(val.userID != accountInfo.userID) {
                    returnPushers.push(val);
                }
            });
            options.success && options.success({
                mixedPlayURL: ret.data.mixedPlayURL,
                pushers: returnPushers
            });
        },
        fail: function(ret) {

            options.fail && options.fail({
                errCode: ret.errCode || -1,
                errMsg: ret.errMsg || '拉取所有主播信息失败'
            });
        }
    });
}

/**
 * [mergePushers pushers merge操作]
 * @param {options}
 *
 * @return event.onPusherJoin
 *   pushers: 进房人员列表
 *
 * @return event.onPhserQuit
 *   pushers: 退房人员列表
 */
function mergePushers() {
    getPushers({
        data: { roomID: roomInfo.roomID },
        success: function(ret) {
            /**
             * enterPushers：新进推流人员信息
             * leavePushers：退出推流人员信息
             * ishave：用于判断去重操作
             */
            var enterPushers = [],leavePushers = [],ishave = 0;
            console.log('去重操作 mergePushers');
            console.log('旧',roomInfo.pushers);
            console.log('新',ret.pushers);
            ret.pushers.forEach(function(val1){
                ishave = 0;
                roomInfo.pushers.forEach(function(val2) {
                    if(val1.userID == val2.userID) {
                        ishave = 1;
                    }
                });
                if(!ishave)
                    enterPushers.push(val1);
                ishave = 0;
            });
            roomInfo.pushers.forEach(function(val1) {
                ishave = 0;
                ret.pushers.forEach(function(val2) {
                    if(val1.userID == val2.userID) {
                        ishave = 1;
                    }
                });
                if(!ishave)
                    leavePushers.push(val1);
                ishave = 0;
            });
            // 重置roomInfo.pushers
            roomInfo.pushers = ret.pushers;
            debugger
            console.log('开始通知所有人进房间， event.onpusherJoin')
            console.log( event.onPusherJoin)
            console.log(enterPushers)
            // 通知有人进入房间
            if(enterPushers.length) {
                event.onPusherJoin({
                    pushers: enterPushers
                });
            }
            // 通知有人退出房间
            if(leavePushers.length) {
                event.onPusherQuit({
                    pushers: leavePushers
                });
            }
        }
    });
};

/**
 * [pusherHeartBeat 推流者心跳]
 * @param {options}
 */
function pusherHeartBeat(options) {
    if(options) {
        setTimeout(function(){
            proto_pusherHeartBeat();
        },3000);
    }
    if(heart) {
        setTimeout(function(){
            proto_pusherHeartBeat();
            pusherHeartBeat();
        },7000);
    }
}
function proto_pusherHeartBeat(){
    console.log('心跳请求');
    request({
        url: 'pusher_heartbeat',
        data: {
            roomID: roomInfo.roomID,
            userID: accountInfo.userID
        },
        success: function(ret) {
            if(ret.data.code) {
                console.log('心跳失败：');
                return;
            }
            console.log('心跳成功',ret);
        },
        fail: function(ret) {
            console.log('心跳失败：');
        }
    });
}

/**
 * [stopPusherHeartBeat 停止推流者心跳]
 * @param {options}
 */
function stopPusherHeartBeat() {
    heart = false;
}


/**
 * 设置事件监听
 * @param object
 * object.onGetPusherList   成员列表事件回调
 * object.onPusherJoin      成员进房事件回调
 * object.onPusherQuit      成员退房事件回调
 * object.onRoomClose       房间解散通知
 * object.onRecvRoomTextMsg 消息通知
 */
function setListener(object) {
    if (!object) {
        console.error("setListener参数错误", object);
        return;
    }

    console.log('setListener')
    console.log(object.onPusherJoin)

    event.onGetPusherList = object.onGetPusherList || function () {};
    event.onPusherJoin = object.onPusherJoin || function () {};
    event.onPusherQuit = object.onPusherQuit || function () {};
    event.onRoomClose = object.onRoomClose || function () {};
    event.onRecvRoomTextMsg = object.onRecvRoomTextMsg || function () {};
}


/**
 * 创建房间
 * @param object
 * object.data.roomName 房间名
 * object.success       成功回调
 * object.fail          失败回调
 */
function createRoom(object) {
    roomInfo.isDestory = false;
    accountInfo.isCreator = true;
    if(!object || !object.data.roomName) {
        console.log('createRoom参数错误',object);
        object.fail && object.fail({errCode:-1, errMsg:"参数错误"});
    }
    roomInfo.roomName = object.data.roomName;
    roomInfo.pushers = [];
    //proto_createRoom(object);
    getPushURL({
        success: function (ret) {
            startLocalPreview({
                data: {}
            });
        },
        fail: function (ret) {
            object.fail && object.fail(ret);
        }});
}
function proto_createRoom(options) {
    request({
        url: 'create_room',
        data: {
            userID: accountInfo.userID,
            roomName: roomInfo.roomName,
            userName: accountInfo.userName,
            userAvatar: accountInfo.userAvatar,
            pushURL: accountInfo.pushURL
        },
        success: function(ret) {
            if(ret.data.code) {
                console.log('创建房间失败:');
                options.fail && options.fail({
                    errCode: ret.data.code,
                    errMsg: ret.data.message + '[' + ret.data.code + ']'
                });
                return;
            }
            console.log('创建房间成功');
            roomInfo.roomID = ret.data.roomID;
            if(roomInfo.isDestory) {
                roomInfo.isDestory = false;
                exitRoom({});
                return;
            }
            // 开始心跳
            heart = true;
            pusherHeartBeat(0);
            console.log('开始登录IM: ',roomInfo.roomID);
            loginIM({
                roomID: roomInfo.roomID,
                success: options.success,
                fail: options.fail
            });
        },
        fail: function(ret) {
            console.log('创建房间失败:',ret);
            options.fail && options.fail({
                errCode: ret.errCode || -3,
                errMsg: ret.errMsg || '创建房间失败'
            });
        }
    });
}

/**
 * [getPushURL 获取推流地址]
 * @param {options}
 *   success: 成功回调
 *   fail: 失败回调
 *
 * @return success
 *   pushURL: 推流地址
 */
function getPushURL(options) {
    options = options || {};
    request({
        url: 'get_push_url',
        data: {
            userID: accountInfo.userID
        },
        success: function(ret) {
            if(ret.data.code) {
                console.log('获取推流地址失败: ',ret);
                options.fail && options.fail({
                    errCode: ret.data.code,
                    errMsg: ret.data.message + '[' + ret.data.code + ']'
                });
                return;
            }
            console.log('获取推流地址成功：',ret.data.pushURL);
            accountInfo.pushURL = ret.data.pushURL;
           
            options.success && options.success({
                pushURL: ret.data.pushURL
            });
        },
        fail: function(ret) {
            options.fail && options.fail({
                errCode: ret.errCode || -3,
                errMsg: ret.errMsg || '获取推流地址失败'
            });
        }
    });
};

/**
 * 进入房间
 * @param object
 * object.data.roomID   房间号
 * object.success       成功回调
 * object.fail          失败回调
 */
function enterRoom(object) {
    if(!object || !object.data.roomID) {
        console.log('enterRoom参数错误',object);
        object && object.fail && object.fail({errCode: -1, errMsg: "参数错误"});
        return;
    }
    roomInfo.roomID = object.data.roomID;
    getPushURL({
        success: function (ret) {
            startLocalPreview({
                data: {}
            });
            getPushers({
                success: function(ret) {
                    roomInfo.mixedPlayURL = ret.mixedPlayURL;
                    roomInfo.pushers = ret.pushers;
                    debugger
                    console.log('roomInfo&event')
                    console.log(roomInfo)
                    console.log(event)
                    object.success && object.success({});
                    event.onGetPusherList({
                        roomID: roomInfo.roomID,
                        mixedPlayURL: roomInfo.mixedPlayURL,
                        pushers: roomInfo.pushers
                    });
                },
                fail: function(ret) {
                    object.fail && object.fail({
                        errCode: ret.errCode,
                        errMsg: ret.errMsg || '拉取主播信息失败'
                    });
                }
            });
        },
        fail: function (ret) {
            object.fail && object.fail(ret);
        }
    })
}

function proto_enterRoom(options) {
    request({
        url: 'add_pusher',
        data: {
            roomID: roomInfo.roomID,
            userID: accountInfo.userID,
            userName: accountInfo.userName,
            userAvatar: accountInfo.userAvatar,
            pushURL: accountInfo.pushURL
        },
        success: function(ret) {
            if(ret.data.code) {
                console.log('加入推流失败:',ret);
                options.fail && options.fail({
                    errCode: ret.data.code,
                    errMsg: ret.data.message + '[' + ret.data.code + ']'
                });
                return;
            }
            console.log('加入推流成功');
            // 开始心跳
            heart = true;
            pusherHeartBeat(1);
            console.log('开始登录IM: ',roomInfo.roomID);
            loginIM({
                roomID: roomInfo.roomID,
                success: options.success,
                fail: options.fail
            });
        },
        fail: function(ret) {
            console.log('加入推流失败:',ret);
            options.fail && options.fail({
                errCode: ret.errCode || -4,
                errMsg: ret.errMsg || '加入推流失败'
            });
        }
    });
}
/**
 * 离开房间
 * @param object
 * object.success   成功回调
 * object.fail      失败回调
 */
function exitRoomAdmin(roomID, userID) {
    stopPusherHeartBeat();
 
    // console.log(webimhandler)
    // webimhandler.quitBigGroup();
    // webimhandler.logout();

    // var livePusher = document.getElementById(accountInfo.userID);
    // if (livePusher) {
    //     livePusher.stopPush();
    //     livePusher.parentNode.removeChild(livePusher);
    // }

    // if (roomInfo.pushers && roomInfo.pushers.length > 0) {
    //     roomInfo.pushers.forEach(function (pusher) {
    //         var livePlayer = document.getElementById(pusher.userID);
    //         if (livePlayer) {
    //             deleteRemoteView({
    //                 data: {
    //                     userId: pusher.userID
    //                 }
    //             });
    //         }
    //     });
    // }

    // options = options || {};
    // if(roomInfo.isDestory)
    //     return;
    // if (accountInfo.roomID == "")
    //     return;

    request({
        url: 'delete_pusher',
        data: {
            roomID: roomID,
            userID: userID
        },
        success: function(ret) {
            if(ret.data.code) {
                console.log('退出推流失败:');
                // options.fail && options.fail({
                //     errCode: ret.data.code,
                //     errMsg: ret.data.message + '[' + ret.data.code + ']'
                // });
                return;
            }
            console.log('退出推流成功');
            // roomInfo.roomID = '';
            // roomInfo.pushers = {}
            // roomInfo.isDestory = true;
            // roomInfo.mixedPlayURL = "";
            // roomInfo.roomName = "";
            // accountInfo.pushURL = "";
            // accountInfo.isCreator = false;
            // options.success && options.success({});
        },
        fail: function(ret) {
            console.log('退出推流失败:');
            // options.fail && options.fail({
            //     errCode: ret.errCode || -1,
            //     errMsg: ret.errMsg || '退出推流失败'
            // });
        }
    });
}

/**
 * 离开房间
 * @param object
 * object.success   成功回调
 * object.fail      失败回调
 */
function exitRoom(options) {
    stopPusherHeartBeat();
 
    console.log(webimhandler)
    webimhandler.quitBigGroup();
    webimhandler.logout();

    var livePusher = document.getElementById(accountInfo.userID);
    if (livePusher) {
        livePusher.stopPush();
        livePusher.parentNode.removeChild(livePusher);
    }

    if (roomInfo.pushers && roomInfo.pushers.length > 0) {
        roomInfo.pushers.forEach(function (pusher) {
            var livePlayer = document.getElementById(pusher.userID);
            if (livePlayer) {
                deleteRemoteView({
                    data: {
                        userId: pusher.userID
                    }
                });
            }
        });
    }

    options = options || {};
    if(roomInfo.isDestory)
        return;
    if (accountInfo.roomID == "")
        return;

    request({
        url: 'delete_pusher',
        data: {
            roomID: roomInfo.roomID,
            userID: accountInfo.userID
        },
        success: function(ret) {
            if(ret.data.code) {
                console.log('退出推流失败:');
                options.fail && options.fail({
                    errCode: ret.data.code,
                    errMsg: ret.data.message + '[' + ret.data.code + ']'
                });
                return;
            }
            console.log('退出推流成功');
            roomInfo.roomID = '';
            roomInfo.pushers = {}
            roomInfo.isDestory = true;
            roomInfo.mixedPlayURL = "";
            roomInfo.roomName = "";
            accountInfo.pushURL = "";
            accountInfo.isCreator = false;
            options.success && options.success({});
        },
        fail: function(ret) {
            console.log('退出推流失败:');
            options.fail && options.fail({
                errCode: ret.errCode || -1,
                errMsg: ret.errMsg || '退出推流失败'
            });
        }
    });
}

/**
 * 拉取房间列表
 * @param object
 * object.data.index    获取的房间开始索引， 从0开始计算
 * object.data.cnt      获取的房间个数
 * object.success       成功回调, 回调的参数为房间信息列表数组roomInfos
 * object.fail          失败回调
 *
 */
function getRoomList(object) {
    object = object || {};

    request({
        url: 'get_room_list',
        data: {
            index: object.data.index || 0,
            cnt: object.data.cnt || 20
        },
        success: function(ret) {
            if(ret.data.code) {
                console.log('获取房间列表失败: ');
                object.fail && object.fail({
                    errCode: ret.data.code,
                    errMsg: ret.data.message + '[' + ret.data.code + ']'
                });
                return;
            }
            object.success && object.success({
                rooms: ret.data.rooms
            });
        },
        fail: function(ret) {
            console.log('获取房间列表失败: ');
            object.fail && object.fail({
                errCode: ret.errCode || -1,
                errMsg: ret.errMsg || '获取房间列表失败'
            });
        }
    });
}

/**
 * 开始本地画面
 * @param object
 * object.data.divId      本地画面区域div控件id
 * object.data.cameraId   摄像头Id
 * object.success    成功回调
 * object.fail       失败回调
 */
function startLocalPreview(object) {
    
    var livePusher = getLivePusher();
    if (object.data.divId && object.data.divId != accountInfo.previewDivId) {

        if (livePusher)
            livePusher.parentNode.removeChild(livePusher);
        accountInfo.previewDivId = object.data.divId;
        livePusher = getLivePusher();
    }


    var cameraId = 0;
    if ( typeof(object.data.cameraId) == "undefined") {
        var cameras = getCameras();
        if (cameras.camera_cnt > 0) {
            cameraId = cameras.cameralist[0].id;
        }
        else {
            object.fail && object.fail({code:-1, msg:"没有可用的摄像头"});
            return;
        }
    }
    else {
        cameraId = object.data.cameraId;
    }
    var containDiv = document.getElementById(accountInfo.previewDivId)
    // containDiv.parentNode.attachEvent("onresize", function (ev) {
    //     var viewDiv = document.getElementById(accountInfo.previewDivId);
    //     var width = viewDiv.offsetWidth;
    //     var height = viewDiv.offsetHeight;
    //     var livePusher = document.getElementById(accountInfo.userID);
    //     if (livePusher) {
    //         livePusher.setAttribute("width", width.toString());
    //         livePusher.setAttribute("height", height.toString());
    //         livePusher.setRenderWndSize(width, height);
    //     }
    // });
    if (containDiv) {
        livePusher.setRenderWndSize(containDiv.offsetWidth, containDiv.offsetHeight);
    }
    livePusher.setPusherEventCallBack(onPushEvent, parseInt(cameraId));
    livePusher.switchCamera(cameraId);
    livePusher.startPush(accountInfo.pushURL);
    object.success && object.success();
    debugger
}


/**
 * 播放指定userID的视频
 * @param object
 * object.data.divId    播放的视频区域div控件id
 * object.data.userId   要播放的成员的id
 * object.success       成功回调
 * object.fail          失败回调
 */
function addRemoteView(object) {
    alert('收到用户接入请求！')
    console.log(object)
    var parentView = document.getElementById(object.data.divId);
    var width = parentView.offsetWidth;
    var height = parentView.offsetHeight;

    var hasUserId = false;
    roomInfo.pushers.forEach(function (value) {
        if (value.userID == object.data.userId) {
            hasUserId = true;
            var html = '<object ID=' + object.data.userId.toString() + ' CLASSID="CLSID:99DD15EF-B353-4E47-9BE7-7DB4BC13613C"\n' +
                '                        codebase="./static/sdk/LiteAVAX.cab#version=1,2,1,5"\n' +
                '                        width=' + width.toString() + "\n"  +
                '                        height=' + height.toString() + "\n" +
                '                        events="True"></object>';

            parentView.innerHTML = html;

            var player = document.getElementById(object.data.userId);
            player.setRenderWndSize(width, height);
            viewTag++;
            player.viewTag = viewTag;
            player.setPlayerEventCallBack(onPlayEvent, viewTag++);
            player.startPlay(value.accelerateURL, 1);
            object.success && object.success();
            return;
        }
    });

    if (hasUserId)
        return;
    console.error("addRemoteView.can't find userId:" + object.userId);
    object.fail && object.fail({
        errCode: -1,
        errMsg:"找不到userId:"+object.userId
    });
}


/**
 * 停止播放指定userID的视频
 * @param object
 * object.data.userId     要停止播放的成员的id
 * object.success    成功回调
 * object.fail       失败回调
 */
function deleteRemoteView(object) {
    var player = document.getElementById(object.data.userId);
    if (!player) {
        object.fail && object.fail({errCode:-1, errMsg:"没有找到要停止播放的userID"});
        return;
    }

    player.stopPlay();
    var parentNode = player.parentNode;
    parentNode.removeChild(player);
}

/**
 * 获取当前摄像头
 * @return  摄像头数组， 包含名称与id
 */
function getCameras(){
    var livePusher = getLivePusher();
    var szRet = livePusher.enumCameras();
    console.log('获取当前摄像头')
    console.log(szRet)
    var obj = JSON.parse(szRet);
    if (obj.code != 0) {
        return obj;
    }
    return null;

}


/**
 * 切换摄像头
 * @param cameraId  选择的摄像头Id， 从getCameras里获取的值
 *
 */
function switchCamera(cameraId) {
    var livePusher = getLivePusher();
    livePusher.switchCamera(cameraId);
}


/**
 * 静音接口
 * @param isMute  是否静音
 */
function setMute(isMute) {
    var livePusher = getLivePusher();
    livePusher.setMute(isMute);
}


/**
 * 设置视频分辨率
 * @param resolution  设置的分辨率, 以下的数值之一
 * 	// 普屏 4:3
 AX_TXE_VIDEO_RESOLUTION_320x240 = 1,
 AX_TXE_VIDEO_RESOLUTION_640x480 = 2,

 // 宽屏16:9
 AX_TXE_VIDEO_RESOLUTION_480x272 = 3,
 AX_TXE_VIDEO_RESOLUTION_640x360 = 4,
 AX_TXE_VIDEO_RESOLUTION_672x378 = 5,
 AX_TXE_VIDEO_RESOLUTION_1024x600 = 6,
 AX_TXE_VIDEO_RESOLUTION_1280x720 = 7,
 AX_TXE_VIDEO_RESOLUTION_1920x1080 = 8,
 */
function setVideoResolution(resolution) {
    var livePusher = getLivePusher();
    livePusher.msSetVideoRectangle(resolution);
}


/**
 * 设置视频码率
 * @param minBitrate  最小码率值
 * @param maxBitrate  最大码率值
 */
function setBitrateRange(minBitrate, maxBitrate) {
    var livePusher = getLivePusher();
    livePusher.setVideoBitRateMin(minBitrate);
    livePusher.setVideoBitRateMxn(mxnBitrate);
}

function setBeauty(style, beautyLevel, whitenessLevel) {
    var livePusher = getLivePusher();
    livePusher.setBeautyStyle(style, beautyLevel, whitenessLevel);
}


/**
* 恢复页面状态
*
*/

function updatePageQuitRoomStatus(){
    var element=document.getElementById("buttonQuitRoom");
    if (typeof(element)== "undefined" || element == null){
        return;
    }
    element.onclick();
}

var onPushEvent = function (msg) {
    var obj = JSON.parse(msg);
    if (obj.eventId != 200001)
         console.log("onPushEvent.PusherID:" + obj.objectId.toString() + " eventId:"+ obj.eventId.toString());

    switch (obj.eventId) {
        case 1002: {
            console.log("推流成功 ,1002");
            if (!accountInfo.isCreator) {
                joinPusher({
                    data: {
                        roomID: roomInfo.roomID,
                        pushURL: accountInfo.pushURL
                    },
                    success: function (ret) {
                        console.log("加入推流成功");
                    },
                    fai: function (ret) {
                        console.log("加入推流失败");
                        exitRoom();
                        alert("加入推流失败");
                        updatePageQuitRoomStatus();
                    }
                })
            }
            else {
                proto_createRoom({
                    data: {
                        pushURL: accountInfo.pushURL
                    },
                    success: function (ret) {
                        console.log("创建房间成功");
                    },
                    fail: function (ret) {
                        console.log("创建房间失败");
                        exitRoom();
                        alert("创建房间失败");
                        updatePageQuitRoomStatus();
                    }
                });
            }
            break;
        }
        case -1301: {
            console.log("打开摄像头失败");
            exitRoom();
            alert("打开摄像头失败,请尝试重新进房间");
            updatePageQuitRoomStatus();
            break;
        }
        case -1302: {
            console.log("找开麦克风失败");
            exitRoom();
            alert("打开麦克风失败, 请尝试重新进房间");
            updatePageQuitRoomStatus();
            break;
        }
        case -1307: {
            console.log("推流连接断开");
            exitRoom();
            alert("推流连接断开,请尝试重新进房间");
            updatePageQuitRoomStatus();
        }
    }
    // if (parseInt(obj.eventId) == 200001) {
    //     doUpdatePusherStatusInfo(msg);
    // }
};

var onPlayEvent = function (msg) {
    var obj = JSON.parse(msg);
    if (parseInt(obj.eventId) != 200002)
        console.log("onPlayEvent.PlayId: " + obj.objectId.toString() + " eventId:"+ obj.eventId.toString());
    // if (parseInt(obj.eventId) == 200002 && parseInt(obj.objectId) == 200) {
    //     doUpdatePlayerStatusInfo(msg);
    // }
};

return {
    httpRequest: httpRequest,
    init: init,
    getRoomList: getRoomList,
    setListener: setListener,
    createRoom: createRoom,
    enterRoom: enterRoom,
    exitRoomAdmin: exitRoomAdmin,
    exitRoom: exitRoom,
    startLocalPreview:startLocalPreview,
    addRemoteView: addRemoteView,
    deleteRemoteView: deleteRemoteView,
    sendRoomTextMsg: sendRoomTextMsg,

    getCameras: getCameras,
    switchCamera: switchCamera,
    setMute: setMute,
    setVideoResolution: setVideoResolution,
    setBitrateRange: setBitrateRange,
    setBeauty: setBeauty,

    userInfo: accountInfo,
}

})();

export default RTCRoom 