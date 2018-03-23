<template>
  <div class="video-container">
    <div ID="CheckIEStatus" align="center" style="z-index:10000; display:none; background:#999; position:absolute; left:0px; top:0px; width:100%; height:100%; border:1px solid #F00; ">
      <h1 style="font-size: 50px">ActiveX插件只支持IE,请用IE打开网页</h1>
      <object ID="PreviewInstallActiveX" CLASSID="CLSID:99DD15EF-B353-4E47-9BE7-7DB4BC13613C" codebase="../static/sdk/LiteAVAX.cab#version=1,2,1,5">
    </object>
    </div>


    <!-- 頂部導航 Start -->
    <div class="header">
      <div class="product-wrap">
        <span class="product-name">双人音视频</span>
        <div id="SDKVersion"> </div>
      </div>
      <div class="user-wrap">
        <ul class="nav-user">
          <li>
            <a id="my-username" class="text-only">user0001</a>
          </li>
          <li>
            <a href="javascript:;" onclick="window.location.href('../IndexDemo.htm')">退出</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 頂部導航  End  -->

    <!-- 內容區塊 Start -->
    <div class="container" style="width: 86%;">
      <!-- 左側導覽列 Start -->
      <!--<div class="sidebar" style="width: 100%;">-->
        <h2>
          <div id="roomlist-title" style="color: whitesmoke;padding: 10px;">房间列表（0）</div>
        </h2>
        <br/>
        <div class="sidebar-list-wrap">
          <ul id="roomlist" class="sidebar-list">
            <div class="room-list inline"  :key="room.roomID"   v-for="room in roomList">
          		<img class="inline" src="../../images/touxiang.jpg" style="height: 80px;width: 80px; border-radius: 4px;"/>
              <div class="roomlistitem">
              	房间ID:
              </div>
              <div class="roomlistitem">
              	{{room.roomID}}
              </div>
              <div class="roomlistitem">
              	人数：{{room.pushers.length}}人
              </div>
              <div class="roomlistitem">
              	<button class="delete-btn" @click="deleteRoom(room.roomID, room.pushers[0].userID)">删除</button>
              </div>
            </div>
          </ul>
          <!--<div id="create-room" style="position: absolute; left: 5px; bottom:5px;">
            <input size="15" id="RoomNameInput" value="">
            <button type="button" style="font-size: 12px;
                            width: 60px;
                            height: 24px;
                            line-height: 25px;
                            color: #fff;
                            background-color: #24b37a;
                            cursor: pointer" @click="createRoom()">创建房间</button>
          </div>-->
        <!--</div>-->
        <a class="sidebar-btn" href="javascript:void(0);" title="收起"></a>
      </div>
      <!-- 左側導覽列  End  -->

      <!-- 視訊通話區域 Start -->
      <!--<div class="main-area">-->
        <!-- 主區域 Start -->
        <!--<div class="panel">-->
          <!--<div class="action-panel">
            <div class="left-panel">
              <span>所在房间:</span><span id="CurrentRoomName"></span>
            </div>-->
            <!-- 行內樣式演示用，實際開發請刪除 -->
            <!--<div class="right-panel" style="width: 500px;">
              <i class="fluid-layout current"></i>
              <i class="fixed-layout"></i>
              <button type="button" id="btn-beauty" class="calling-btn" onclick='
                        var btnBeauty = document.getElementById("btn-beauty") ;
                        if (btnBeauty.innerText == "开启美颜") {
                            btnBeauty.innerText = "关闭美颜";
                            RTCRoom.setBeauty(0, 6, 3);
                        }
                        else {

                            btnBeauty.innerText = "开启美颜";
                            RTCRoom.setBeauty(0, 0, 0);
                        }
                        '>开启美颜</button>
              <button type="button" id="btn-mute" class="calling-btn" onclick='
                        var btnMute = document.getElementById("btn-mute");
                        if (btnMute.innerText == "静音") {
                            RTCRoom.setMute(true);
                            btnMute.innerText = "关闭静音";
                        }
                        else {
                            RTCRoom.setMute(false);
                            btnMute.innerText = "静音";
                        }'>静音</button>
              <button id="QuitRoomBtn" type="button" class="calling-btn decline" @click='exitRTCRoom()'>退出房间</button>
            </div>-->
          <!--</div>-->
          <!--<div class="video-panel">
            <div id="PusherAreaID" style="background:tomato;  width:50%; height:50%;z-index:99999;">
            </div>
            <div id="PlayerAreaID" style="background:yellow; 
                    border:10px solid red; 
                    position:absolute; 
                    left:0px; top:0px; width:100%; height:100%;z-index:1000;">
            </div>
          </div>-->
        <!--</div>-->
        <!-- 主區域  End  -->

        <!-- 右側區域-聊天室 Start -->

        <!--<div class="sub-panel chatroom">
          <div class="chatting-area">
            <ul id="chat-list">


            </ul>
          </div>
          <div class="typing-area">
            <input type="text" id="msg-input" class="input-element" placeholder="输入你想要回复的内容">
            <span onclick="sendMsg()">发送</span>
          </div>
          <a class="chatroom-btn" href="javascript:void(0);" title="收起"></a>
        </div>-->

        <!-- 右側區域-聊天室  End  -->
      <!--</div>-->
      <!-- 視訊通話區域  End  -->
    </div>
    <!-- 內容區塊  End  -->
  </div>
</template>
<script>
// import "./RTCRoomJs/webim.js";
// import "./RTCRoomJs/webim_handler.js";
import RTCRoom from "./RTCRoomJs/RTCRoom.js";
export default {
  data() {
    return {
      inRoom: false,
      roomList: [],
      refleshTimer: null // 刷新房间列表定时器
    };
  },
  mounted() {
    // console.log(`RTCRoom's typeof: ${typeof RTCRoom}`);
    // console.log(RTCRoom);
    this.onDoubleRoomPageLoad();
    //  var sidebar = $('.sidebar'),
    //         chatroom = $('.sub-panel.chatroom');

    //     $('.sidebar-btn').click(function() {
    //         if(sidebar.hasClass('fold')) {
    //             sidebar.removeClass('fold');
    //             $('.main-area').css('left', '220px');
    //             $('.sidebar-btn').attr('title', '收起');
    //         }
    //         else {
    //             sidebar.addClass('fold');
    //             $('.main-area').css('left', '0px');
    //             $('.sidebar-btn').attr('title', '展开');
    //         }
    //     })

    //     $('.chatroom-btn').click(function() {
    //         if(chatroom.hasClass('fold')) {
    //             chatroom.removeClass('fold');
    //             $('.main-area > .panel').css('padding-right', '300px');
    //             $('.chatroom-btn').attr('title', '收起');
    //         }
    //         else {
    //             chatroom.addClass('fold');
    //             $('.main-area > .panel').css('padding-right', '0px');
    //             $('.chatroom-btn').attr('title', '展开');
    //         }
    //     })
  },
  methods: {
    onDoubleRoomPageLoad() {
      // 需要打开
      // this.doCheckIE();
      var _this = this;
      // this.doLoadActiveXPlugin();
      RTCRoom.httpRequest({
        url:
          "https://api.nilecom.cn/cloudunicomm/video.do?func=get_im_login_info",
        data: { userIDPrefix: "IE(ActiveX)" },
        method: "POST",
        success: function(ret) {
          if (ret.data.code != 0) {
            alert("获取IM登录信息失败:" + ret.data.toString());
          }
          ret.data.serverDomain =
            "https://api.nilecom.cn/cloudunicomm/video.do?func=";
          ret.data.divId = "PusherAreaID";
          ret.data.userName = "坐席023";

          RTCRoom.init({
            data: ret.data,
            success: function(ret) {
              console.log("登录初始化成功");

              _this.refreshRoomList(10000);
              // _this.createRoom()
              var nameview = document.getElementById("my-username");
              nameview.innerText = "myUserName";
            },
            fail: function() {
              alert("获取IM登录信息成功，初始化失败:", ret.data.toString());
            }
          });

          RTCRoom.setListener({
            onGetPusherList: function(ret) {
              console.log("收到成员消息", ret);
              ret.pushers.forEach(function(pusher) {
                RTCRoom.addRemoteView({
                  data: {
                    divId: "PlayerAreaID",
                    userId: pusher.userID
                  }
                });
              });
            },
            onPusherJoin: function(ret) {
              console.log("收到进房消息", ret);

              ret.pushers.forEach(function(pusher) {
                RTCRoom.addRemoteView({
                  data: {
                    divId: "PlayerAreaID",
                    userId: pusher.userID
                  }
                });
              });
            },
            onPusherQuit: function(ret) {
              console.log("收到退房消息", ret);
              ret.pushers.forEach(function(pusher) {
                RTCRoom.deleteRemoteView({
                  data: {
                    userId: pusher.userID
                  }
                });
              });
            },
            onRoomClose: function(ret) {
              console.log("收到房间解散消息", ret);
              this.exitRTCRoom();
              alert("房间已解散");
            },
            onRecvRoomTextMsg: function(ret) {
              console.log("收到文本消息");
              console.log(ret);
            }
          });
        },
        fail: function(ret) {
          alert(
            "进入双人视频失败，请刷新页面重试，错误码:" + ret.code + ret.msg
          );
        }
      });
    },
    refreshRoomList(interval) {
      var _this = this;
      RTCRoom.getRoomList({
        data: {
          index: 0,
          cnt: 100
        },
        success: function(ret) {
          // var roomlistDiv = document.getElementById("roomlist");
          // roomlistDiv.innerHTML = "";
          var roomtitle = document.getElementById("roomlist-title");
          roomtitle.innerText = "房间列表(" + ret.rooms.length.toString() + ")";
          _this.roomList = ret.rooms;
          console.log(_this.roomList);
          // ret.rooms.forEach(function(roomInfo) {
          //   _this.doAddRoomIdToList(roomInfo);
          // });
        },
        fail: function(ret) {
          console.log("拉取房间列表失败");
        }
      });

      this.refleshTimer = setTimeout(function() {
        _this.refreshRoomList(interval);
      }, interval);
    },

    doCheckIE() {
      var bIE = false;
      if (!!window.ActiveXObject || "ActiveXObject" in window) bIE = true;
      else if (window.navigator.userAgent.indexOf("MSIE") >= 1) bIE = true;
      else bIE = false;
      if (bIE == false) {
        document.getElementById("CheckIEStatus").style.display = "block";
      }
    },

    createRoom() {
      if (this.inRoom) {
        alert("请先退出原来的房间");
        return;
      }
      var roomName = Date.parse(new Date());
      if (!roomName || roomName.length < 1) {
        alert("房间名不能为空");
        return;
      }
      if (roomName.length > 15) {
        alert("房间名太长，不超过15个字符");
        return;
      }

      this.inRoom = true;
      var RoomNameDiv = document.getElementById("CurrentRoomName");
      RoomNameDiv.innerText = roomName;
      RTCRoom.createRoom({
        data: {
          roomName: Date.parse(new Date()),
          success: function(ret) {
            alert("创建房间成功" + ret.toString());
          },
          fail: function(ret) {
            alert("创建房间失败" + ret.toString());
          }
        }
      });
    },

    deleteRoom(roomID, pusherID) {
      RTCRoom.exitRoomAdmin(roomID, pusherID);
    },

    exitRTCRoom() {
      var textView = document.getElementById("chat-list");
      textView.innerHTML = "";
      console.log("开始退出房间");
      RTCRoom.exitRoom();
      this.inRoom = false;

      var RoomNameDiv = document.getElementById("CurrentRoomName");
      RoomNameDiv.innerHTML = "";
      var nameDiv = document.getElementById("my-username");
      nameDiv.innerHTML = "";
      var btnBeauty = document.getElementById("btn-beauty");
      btnBeauty.innerText = "开启美颜";

      var btnMute = document.getElementById("btn-mute");
      btnMute.innerText = "静音";
      RTCRoom.setMute(false);
    },

    doAddRoomIdToList(object) {
      var newli = document.createElement("li");
      newli.setAttribute("id", object.roomID.toString());
      newli.setAttribute("roomName", object.roomName);
      newli.setAttribute("peopleNum", object.pushers.length.toString());

      var infoDiv = document.createElement("div");
      infoDiv.setAttribute("class", "item-info");

      var p1 = document.createElement("p");
      p1.setAttribute("class", "room-id");
      var span1 = document.createElement("span");
      span1.setAttribute("class", "label-txt");
      span1.innerText = "房间名：";
      var span2 = document.createElement("span");
      span2.setAttribute("class", "value-txt");
      span2.innerText = object.roomName;
      p1.appendChild(span1);
      p1.appendChild(span2);
      infoDiv.appendChild(p1);
      newli.appendChild(infoDiv);

      var statusDiv = document.createElement("div");
      statusDiv.setAttribute("class", "item-status connected");
      statusDiv.innerText = "人数:" + object.pushers.length.toString();

      newli.appendChild(statusDiv);

      newli.onclick = function(ev) {
        if (this.inRoom) {
          alert("请先退出原来的房间");
          return;
        }

        var cameras = RTCRoom.getCameras();
        if (cameras.camera_cnt <= 0) {
          alert("进入房间失败，没有可用的摄像头");
          return;
        }
        var peopleNum = document
          .getElementById(ev.currentTarget.id)
          .getAttribute("peopleNum");
        if (parseInt(peopleNum) > 1) {
          alert("进入房间失败，房间人数已满");
          return;
        }

        this.inRoom = true;
        var roomName = document
          .getElementById(ev.currentTarget.id)
          .getAttribute("roomName");
        var RoomNameDiv = document.getElementById("CurrentRoomName");
        RoomNameDiv.innerText = roomName;
        RTCRoom.enterRoom({
          data: {
            roomID: ev.currentTarget.id
          },
          success: function() {},
          fail: function(ret) {
            console.log(ret);
          }
        });
      };
      document.getElementById("roomlist").appendChild(newli);
    },
    doDelRoomIdFromListTest() {
      alert("尚未有多人视频互动的Demo，请稍后");
      var d = document.getElementById("RoomListID");
      var d_nested = document.getElementById("itemdiv11");
      var throwawayNode = d.removeChild(d_nested);
    },
    onGetMemberList(ret) {
      console.log("收到成员消息", ret);
      ret.pushers.forEach(function(pusher) {
        RTCRoom.addRemoteView({
          data: {
            divId: "PlayerAreaID",
            userId: pusher.userID
          }
        });
      });
    },

    onMemberJoin(ret) {
      console.log("收到进房消息", ret);

      ret.pushers.forEach(function(pusher) {
        RTCRoom.addRemoteView({
          data: {
            divId: "PlayerAreaID",
            userId: pusher.userID
          }
        });
      });
    },

    onMemberQuit(ret) {
      console.log("收到退房消息", ret);
      ret.pushers.forEach(function(pusher) {
        RTCRoom.deleteRemoteView({
          data: {
            userId: pusher.userID
          }
        });
      });
    },

    onRoomClose(ret) {
      console.log("收到房间解散消息", ret);
      this.exitRTCRoom();
      alert("房间已解散");
    },

    sendMsg() {
      var inputView = document.getElementById("msg-input");
      var msg = inputView.value;
      RTCRoom.sendRoomTextMsg({
        data: {
          msg: msg
        }
      });
      inputView.value = "";
    },

    onRecvRoomTextMsg(ret) {
      // <li class="sender-msg">
      //    <div class="msg-wrap">
      //     <p class="msg">有什么问题?</p>
      //     <p class="from">:我</p>
      //    </div>
      // </li>
      // <li class="receiver-msg">
      //     <div class="msg-wrap">
      //     <p class="from">Lily&M:</p>
      // <p class="msg">断电那种深度重启</p>
      //     </div>
      //     </li>
      console.log("收到消息:" + ret.textMsg);

      var time = ret.time ? ret.time : "";
      var nickName = ret.nickName ? ret.nickName : "";
      var textMsg = ret.textMsg ? ret.textMsg : "";
      var mstText = textMsg;

      var newli = document.createElement("li");
      var pfrom = document.createElement("p");
      pfrom.setAttribute("class", "from");

      var pMsg = document.createElement("p");
      pMsg.setAttribute("class", "msg");
      pMsg.innerText = mstText;

      var newdiv = document.createElement("div");
      newdiv.setAttribute("class", "msg-wrap");
      if (ret.nickName == myUserName) {
        newli.setAttribute("class", "sender-msg");
        pfrom.innerText = " :我";
        newdiv.appendChild(pMsg);
        newdiv.appendChild(pfrom);
      } else {
        newli.setAttribute("class", "receiver-msg");
        if (nickName != "") {
          nickName = nickName + " :";
        }
        pfrom.innerText = nickName;
        newdiv.appendChild(pfrom);
        newdiv.appendChild(pMsg);
      }

      newli.appendChild(newdiv);
      var msgArea = document.getElementById("chat-list");
      msgArea.appendChild(newli);
    },

    doLoadActiveXPlugin() {
      var activeObj = document.getElementById("PreviewInstallActiveX");
      if (activeObj != null) {
        console.log(activeObj);
        var sdkversion = "LiteAv_AcitveX Version:" + activeObj.getVersion();
        document.getElementById("SDKVersion").innerText = sdkversion;
      }
    }
  },
  beforeDestroy() {
    console.log("销毁video/index.vue 相关组件");
    clearTimeout(this.refleshTimer);
    this.refleshTimer = null;
    //  this.exitRTCRoom()
  }
};
</script>

<style scoped>
@import "./css/room.css";

.delete-btn{
	color: white;
	border: none;
	background-color: rgb(124,140,166);
	border-radius: 4px;
	height: 24px;
	padding-top: 3px;
	font-size: 14px;
	width: 80px;
	text-align: center;
}
.room-list{
	color: whitesmoke;
	font-size: 14px;
	width: 25%;
	padding: 10px;
}
.roomlistitem{
	padding-left: 90px;
	padding-bottom: 3px;
	font-size: 12px;
}
.inline{
	float: left;
}
</style>