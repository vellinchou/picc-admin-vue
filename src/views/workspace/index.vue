<template>
  <div class="app-container">
    <div class="left-panel inline">
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
    </div>
    <div class="mid inline">
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
  export default {
    data() {
      return {
        activeName: 'second',
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
      }
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
		width: 41%;
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
		/*padding: 8px;*/
	}
	.s-num{
		margin-top: 3px;
		margin-bottom: 3px;
	}
	#service{
		width: 100%;
		height: 100%;
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
  		background-color: rgb(124,140,166);
  		border-radius: 4px;
  		height: 24px;
  		padding-top: 3px;
  		font-size: 14px;
  		width: 75px;
  		text-align: center;
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