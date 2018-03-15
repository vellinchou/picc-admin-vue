<template>
  <div class="app-container">
    <!--<div class="left-panel inline">
    	<div class="group">
    		<img id="service-logo" class="inline" src="../../images/service-logo.jpg"/>
    		<div class="service-name inline">
    			<div class="s-num">
    				test 004
    			</div>
    			<div class="s-name">
    				在线理赔客服组
    			</div>
    		</div>
    	</div>
			<el-tabs class='el-tabs' v-model="activeName" @tab-click="handleClick">
			    <el-tab-pane class='el-tab' label="客户" name="customer">
			    	<el-tabs class='customer-el' type="border-card">
					  <el-tab-pane label="会话请求">会话请求</el-tab-pane>
					  <el-tab-pane label="正在会话">正在会话</el-tab-pane>
					  <el-tab-pane label="最近会话">最近会话</el-tab-pane>
					</el-tabs>
			    </el-tab-pane>
			    <el-tab-pane class='el-tab' label="同事" name="colleage">同事</el-tab-pane>
			</el-tabs>
    </div>-->
    <div class="mid inline">
    	
    	<div class="room">
	      <div class="create-room inline">
	    		<button class="creater"  style="cursor: pointer" @click="createRoom()">
	    			开始工作
	    		</button>
	      </div>
		    <div class="now-room inline">
		      <div class="rnum-div" style="display:none;">所在房间:<span id="CurrentRoomName"></span></div>
		    </div>
		    <!-- 行內樣式演示用，實際開發請刪除 -->
		    <div class="room-button float-right">
		      <i class="fluid-layout current"></i>
		      <i class="fixed-layout"></i>
		      <!-- 依照不同狀態自行使用 -->
		      <button id="QuitRoomBtn" type="button" style="display: none;"
		      	 class="calling-btn decline creater float-right" @click='exitRTCRoom()'>解散房间</button>
		      <button id="btn-mute" type="button" class="calling-btn creater float-right" @click='shutvoice()'>静音</button>
		      <button id="hideself" type="button" class="calling-btn creater float-right" @click='hideself()' style="display: none;">隐藏自己</button>
	        <!--<button type="button" id="btn-beauty" class="calling-btn creater float-right" onclick='
	                  var btnBeauty = document.getElementById("btn-beauty") ;
	                  if (btnBeauty.innerText == "开启美颜") {
	                      btnBeauty.innerText = "关闭美颜";
	                      RTCRoom.setBeauty(0, 6, 3);
	                  }
	                  else {
	                      btnBeauty.innerText = "开启美颜";
	                      RTCRoom.setBeauty(0, 0, 0);
	                  }
	                  '>开启美颜
	        </button>-->
		    </div>
    	</div>
      <div class="video-panel" id="videopanel" style="display: none;">
        <div id="PusherAreaID" style="background:white; width:30%; height:30%;z-index:9999;position: relative;">
        </div>
        <div id="PlayerAreaID" style="background-image:url(http://119.27.167.62/wp-content/uploads/2018/03/service.jpg);
        	background-size: 100% 100%; top:0px; position:absolute; width:100%; height:100%;z-index:1000;">
        </div>
      </div>
    	<img id="service" src="../../images/service.jpg"/>
    </div>
    <div class="right-panel inline">
    	<div class="worksheet">
    		工单列表
    	</div>
    	<div class="search">
    		<div class="creater inline" >
    			新建工单
    		</div>
    		<div class="inline">
    			<input class="input" type="text" name="" id="" value="" placeholder="请输入车牌号" />
    		</div>
    		<div class="searchbutton inline">
    			<a href="">搜索</a>
    		</div>
    	</div>
    	<el-table
		    :data="tableData2"
		    style="width: 100%"
		    :row-class-name="tableRowClassName">
		    <el-table-column
		      prop="number"
		      label="报告单号">
		    </el-table-column>
		    <el-table-column
		      prop="carnum"
		      label="车牌号">
		    </el-table-column>
		    <el-table-column
		      prop="createtime"
		      label="创建时间">
		    </el-table-column>
		    <el-table-column
		      prop="workstatus"
		      label="工作状态">
		    </el-table-column>
		</el-table>
		<el-pagination
			background
		  	layout="prev, pager, next"
		  	:total="100">
		</el-pagination>
    </div>
  </div>
</template>

<script>
import RTCRoom from "./RTCRoomJs/RTCRoom.js";
  export default {
    data() {
      return {
        activeName: 'second',
	      inRoom: false,
	      roomList: [],
	      refleshTimer: null, // 刷新房间列表定时器
        tableData2: [{
					number: '4444455',        
		          	carnum: '浙A11116',
		          	createtime: '2018-05-02',
		          	workstatus: '已定损',
		        }, {
					number: '2002211',        
		          	carnum: '鲁B88888',
		          	createtime: '2018-05-02',
		          	workstatus: '已定损',        
		        }, {
					number: '4444455',        
		          	carnum: '浙A11116',
		          	createtime: '2018-05-02',
		          	workstatus: '未完成',
		        }, {
					number: '4444455',        
		          	carnum: '浙A11116',
		          	createtime: '2018-05-02',
		          	workstatus: '已定损',
		        }, {
					number: '2002211',        
		          	carnum: '鲁B88888',
		          	createtime: '2018-05-02',
		          	workstatus: '已定损',        
		        }, {
					number: '4444455',        
		          	carnum: '浙A11116',
		          	createtime: '2018-05-02',
		          	workstatus: '未完成',
		        }, {
					number: '4444455',        
		          	carnum: '浙A11116',
		          	createtime: '2018-05-02',
		          	workstatus: '已定损',
		        }, {
					number: '2002211',        
		          	carnum: '鲁B88888',
		          	createtime: '2018-05-02',
		          	workstatus: '已定损',        
		        }, {
					number: '4444455',        
		          	carnum: '浙A11116',
		          	createtime: '2018-05-02',
		          	workstatus: '未完成',
		        }, {
					number: '4444455',        
		          	carnum: '浙A11116',
		          	createtime: '2018-05-02',
		          	workstatus: '已定损',
        }]
      };
    },
	  mounted() {
	    this.onDoubleRoomPageLoad();
	  },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
	    onDoubleRoomPageLoad() {
	      // 需要打开
	      // this.doCheckIE();
	      console.log('进入测试');
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
//	              nameview.innerText = "myUserName";
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
//	          roomtitle.innerText = "房间列表(" + ret.rooms.length.toString() + ")";
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
	      
	    	alert("您已开始工作,请记得带上微笑！");
	      
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

      	var hideself = document.getElementById("hideself");
      	hideself.style.display = 'block';
      	var videopanel = document.getElementById("videopanel");
      	videopanel.style.display = 'block';
      	var pusherAreaID = document.getElementById("PusherAreaID");
      	pusherAreaID.style.display = 'block';
      	var playerAreaID = document.getElementById("PlayerAreaID");
      	playerAreaID.style.display = 'block';;
      	var quitRoomBtn = document.getElementById("QuitRoomBtn");
      	quitRoomBtn.style.display = 'block';
      	var service = document.getElementById("service");
      	service.style.display = 'none';
	      
	    },
	    shutvoice(){
        var btnMute = document.getElementById("btn-mute");
        if (btnMute.innerText == "静音") {
            RTCRoom.setMute(true);
            btnMute.innerText = "关闭静音";
        }
        else {
            RTCRoom.setMute(false);
            btnMute.innerText = "静音";
        }
	    },
	    hideself(){
        var hideself = document.getElementById("hideself");
        if (hideself.innerText == "隐藏自己") {
	        hideself.innerText = "显示自己";
	    		var pusherarea = document.getElementById("PusherAreaID");
          pusherarea.style.position='absolute';
          pusherarea.style.zIndex='1000';
	    		var playerarea = document.getElementById("PlayerAreaID");
          playerarea.style.position='relative';
          playerarea.style.zIndex='9999';
        }
        else {
          hideself.innerText = "隐藏自己";
	    		var pusherarea = document.getElementById("PusherAreaID");
          pusherarea.style.position='relative';
          pusherarea.style.zIndex='9999';
	    		var playerarea = document.getElementById("PlayerAreaID");
          playerarea.style.position='absolute';
          playerarea.style.zIndex='1000';
        }
	    },
	    exitRTCRoom() {
//	      var textView = document.getElementById("chat-list");
//	      textView.innerHTML = "";
	      console.log("开始退出房间");
	      RTCRoom.exitRoom();
	      this.inRoom = false;
	      alert("工作结束，祝您生活愉快！");
	
	      var RoomNameDiv = document.getElementById("CurrentRoomName");
	      RoomNameDiv.innerHTML = "";
	      var nameDiv = document.getElementById("my-username");
	
	      var btnMute = document.getElementById("btn-mute");
	      btnMute.innerText = "静音";
	      RTCRoom.setMute(false);
      	var service = document.getElementById("service");
      	service.style.display = 'block';
      	
    		var pusherarea = document.getElementById("PusherAreaID");
	      pusherarea.style.position='absolute';
	      pusherarea.style.zIndex='1000';
	    	var playerarea = document.getElementById("PlayerAreaID");
	      playerarea.style.position='relative';
	      playerarea.style.zIndex='9999';
      	
      	var videopanel = document.getElementById("videopanel");
      	videopanel.style.display = 'none';
      	var hideselfhideself = document.getElementById("hideself");
      	hideself.style.display = 'none';
      	var quitRoomBtn = document.getElementById("QuitRoomBtn");
      	quitRoomBtn.style.display = 'none';
	    },
    },
	  beforeDestroy() {
	    console.log("销毁video/index.vue 相关组件");
	    clearTimeout(this.refleshTimer);
	    this.refleshTimer = null;
	    //  this.exitRTCRoom()
	  }
  };
  
</script>

<style>
	.app-container{
		padding: 0;
		display: inline-block;
		width: 100%;
		height: 660px;
	}
	.left-panel{
		width: 18%;
		height: 100%;
		background-color: rgb(124,140,166);
	}
	.mid{
		width: 59%;
		height: 100%;
		background-color: gray;
	}
	.right-panel{
		width: 41%;
		height: 100%;
		background-color: rgb(124,140,166);
	}
	.inline{
		float: left;
	}
	.group{
		height: 82px;
		border-bottom: 1px solid rgb(138,150,176);
		padding: 20px;
	}
	#service-logo{
		height: 40px;
		width: 40px;
		border-radius: 20px;
	}
	.service-name{
		height: 40px;
		color: white;
		font-size: 13px;
		margin-left: 5px;
	}
	.s-num{
		margin-top: 3px;
		margin-bottom: 3px;
	}
	#service{
		width: 100%;
		height: 90%;
		/*margin-top: 10%;*/
	}
	
	.room{
		height: 10%;
		padding-top: 22px;
	}
	
	.create-room{
		width: 15%;
		padding-left: 10px;
	}
	
	.video-panel {
    position: relative;
    width: 100%;
    height: 90%
	}
	
	.now-room{
		width: 35%;
		font-size: 14px;
	}
	
	.float-right{
		float: right;
		margin-right: 10px;
	}
	
	.room-button{
		width: 50%;
	}
	
	.el-tabs{
		height: 82%;
	}
	.el-tabs__nav{
		width: 100%;
	}
	.el-tabs__item{
		padding: 0;
		color: white;
		width: 50%;
		text-align: center;
	}
	
	.el-tab{
		color: white;
		width: 100%;
		height: 100%;
	}
	
	.el-tabs__header{
		margin: 0;
		/*border: 1px solid rgb(103,110,138);*/
	}
 	.el-table .warning-row {
    	background: oldlace;
  	}
  	.el-table .success-row {
    	background: #f0f9eb;
  	}
  	.worksheet{
  		height: 21px;
  		color: rgb(124,140,166);
  		background-color: white;
  		padding-top: 4px;
  		margin-top: 21px;
  		margin-left: 8px;
  		border-top-left-radius: 8px;
  		border-top-right-radius: 8px;
  		text-align: center;
  		font-size: 14px;
  		width: 80px;
  	}
  	.search{
  		background-color: white;
  		height: 45px;
  	}
  	.right-panel .el-table thead{
  		color: rgb(88,90,101);
  		background-color: rgb(232,235,240);
  	}
  	.search{
  		text-align: center;
  		vertical-align: middle;
  		padding: 13px;
  	}
  	.creater{
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
  	.rnum-div{
  		color: white;
  		border: none;
  		background-color: rgb(124,140,166);
  		border-radius: 4px;
  		height: 24px;
  		padding-top: 3px;
  		font-size: 14px;
  		width: 230px;
  		padding-left: 10px;
  	}
  	.input{
  		width: 240px;
  		height: 24px;
  		padding-left: 8px;
  		margin-left: 10px;
  		font-size: 14px;
  		border-top-left-radius: 12px;
  		border-bottom-left-radius: 12px;
  		border: 1px solid rgb(238,238,238);
  		background-color: rgb(238,238,238);
  	}
  	.searchbutton{
  		font-size: 14px;
  		background-color: rgb(124,140,166);
  		padding-top: 3px;
  		border-top-right-radius: 12px;
  		border-bottom-right-radius: 12px;
  		height: 24px;
  		width: 70px;
  		color: white;
  	}
  	#tab-customer,#tab-colleage{
  		background-color: rgb(124,140,166);
  		text-align: center;
  	}
  	.el-tabs__active-bar{
  		background-color: white;
  	}
  	.el-tabs__content{
  		height: 100%;
  		margin-left: -1px;
  		padding-right: -1px;
		/*border: 1px solid rgb(103,110,138);*/
  	}
  	.el-tabs--border-card{
  		height: 100%;
  	}
  	.customer-el .el-tabs__nav-scroll {
  		background-color: rgb(103,131,138);
  		
  	}
  	.customer-el .el-tabs__nav-scroll .el-tabs__nav .el-tabs__item{
  		height: 27px;
  		line-height: 30px;
  		margin-top: 10px;
  		margin-bottom: -2px;
  		border-top-right-radius: 8px;
  		width: 33%;
  		font-size: 12px;
  		background-color: rgb(103,131,138);
  		color: white;
  		text-align: center;
  		padding: 0;
  	}
  	.customer-el .el-tabs__nav-scroll .el-tabs__nav .is-active{
  		background-color: white;
  		color: rgb(103,131,138);
  	}
</style>