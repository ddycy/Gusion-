app.controller("AlarmSummaryController",function($scope,$window,$cacheFactory, $filter, ngTableParams,$stateParams, $element, $http,$uibModal,$state,MAuth, Debug,$rootScope){
    /**
     *
     */
    /*angular.element($window).bind('resize', function () {
        vm.colAdjust($window.innerWidth);
    });*/
    //
    // $scope.languageDict = $rootScope.languageDict;
    // $scope.language = $rootScope.languageOption;
    //
    // var vm = this;
    // vm.selectList=[];
    // var url='/api/'
    // vm.viewAdd=false;
    // vm.viewDetail=false;
    // vm.viewModify=false;
    // vm.viewForm=true;
    // vm.item=null;
    // vm.sortway=null;
    // vm.selectedOption = '';
    // vm.dataObjFields = {};
    // vm.selectVal = '';
    // vm.maxColNum=parseInt($window.innerWidth/150);
    // vm.showFieldsSum=0;
    // vm.buttonDetail=false;
    // vm.fieldNo=0;
    // vm.activeTab;
    // vm.buttonDetail=false;
    // vm.selectedDept=false;
    // vm.showFindList=false;
    // vm.graph_show_btn=$scope.languageDict["DisplaysAlarmSection"][$scope.language];
    // vm.showGraph=false;
    // vm.chixubaojingFrom = false;
    // vm.graphdata={};
    // vm.dataBody=[];
    // vm.historyDay=1;
    // var firstShowMap=true;
    // var page=1;
    // var count=8;
    // var dom = document.getElementById("graphcontainr");
    // var findKey=undefined;
    // var findVal=undefined;
    // function initMap() {
    //     var map = new AMap.Map('graphcontainr', {
    //         resizeEnable: true,
    //         center: [116.397428, 39.90923],
    //         zoom: 3
    //     });
    //     map.setFitView();
    // }
    //
    // initMap();
    //
    // activate();
    //
    // function activate() {
    //     /*----------------------------------------------------查询-------------------------------------------------*/
    //     vm.tableParams = new ngTableParams({
    //         page: page, // show first page
    //         count: count, // count per page
    //     }, {
    //         // total: 0, // length of data
    //         getData: function ($defer, params) {
    //             var queryParams = {
    //                 page: params.page(),
    //                 count: params.count(),
    //                 findKey:"vehicleNo",
    //                 findVal:$stateParams.vehicleNo,
    //                 sortKey: "alarmstarttime",
    //                 sortVal: "DESC" // initial sorting
    //             };
    //             var callback = function (ret) {
    //                 console.log("车辆里程", ret);
    //                 params.total(ret.total);
    //                 $defer.resolve(ret.body);
    //                 vm.dataBody = ret.body;
    //                 vm.head = ret.head;
    //                 vm.colAdjust($window.innerWidth);
    //             };
    //             callAPI('statistic/getAlarmSummary', queryParams, 4, callback);
    //
    //         }
    //     });
    //     /*---------------------------------------------------排序--------------------------------------------------*/
    //     $scope.setOrder = function(item,$index){
    //         vm.sortkey=item.field;
    //         vm.index=$index;
    //         vm.item=item;
    //         if(vm.index % 2 == 0) {
    //             vm.sortway="ASC"
    //         }else{
    //             vm.sortway="DESC"
    //         }
    //         vm.tableParams = new ngTableParams({
    //             page: page, // show first page
    //             count: count, // count per page
    //         }, {
    //             total: 0, // length of data
    //             getData: function ($defer, params) {
    //                 var queryParams={
    //                     findKey:findKey,
    //                     findVal:findVal,
    //                     page:params.page(),
    //                     count:params.count(),
    //                     sortKey: vm.sortkey,
    //                     sortVal: vm.sortway // initial sorting
    //                 };
    //                 var callback = function (ret) {
    //                     params.total(ret.total);
    //                     $defer.resolve(ret.body);
    //                     vm.dataBody=ret.body;
    //                 }
    //                 callAPI('statistic/getAlarmSummary',queryParams,5,callback);
    //
    //             }});
    //     }
    //
    //     /*-------------------------------------------------条件查询------------------------------------------------*/
    //     vm.query=function(_findKey,_findVal,count){
    //         console.log("vm.query");
    //         $(function () {
    //             $('#myModal').modal('show')
    //         });
    //         findKey=_findKey;
    //         findVal=_findVal;
    //         vm.tableParams=new ngTableParams({
    //             "page": page, // show first page
    //             "count":count, // count per page
    //         },{
    //             total:0,
    //             getData:function($defer,params){
    //                 var queryParams={
    //                     "findKey":findKey,
    //                     "findVal":findVal,
    //                     "page":params.page(),
    //                     "count":params.count()
    //                 };
    //                 var callback = function (ret) {
    //                     params.total(ret.total);
    //                     $defer.resolve(ret.body);
    //                     vm.dataBody=ret.body;
    //                 }
    //                 callAPI('statistic/getAlarmSummary',queryParams,5,callback);
    //             }
    //         })
    //     }
    //
    //
    //
    //     /*------------------------------------------------点击表单--------------------------------------------------*/
    //     vm.doclick = function(data,$index){
    //         if($index==vm.order){
    //             vm.order=vm.dataBody.length;
    //             return;
    //         }
    //         $scope.bg=[];
    //         $scope.bg[$index]='current';
    //     }
    //
    //     /**-------------------------------------------------导出----------------------------------------------------*/
    //     $scope.export = function(){
    //         var uri =url+'dataManagement/exportVehicle'
    //         window.location.href = uri;
    //     };
    //     /*---持续报警--*/
    //     vm.continuous_alarm = function () {//持续报警
    //         vm.viewForm = false;
    //         vm.chixubaojingFrom = true;
    //         chixuactivate();
    //     }
    //
    //
    //     function chixuactivate() {
    //         /*----------------------------------------------------查询-------------------------------------------------*/
    //         vm.chixuTableParams = new ngTableParams({
    //             page: page, // show first page
    //             count: count, // count per page
    //         }, {
    //             // total: 0, // length of data
    //             getData: function ($defer, params) {
    //                 var queryParams = {
    //                     page: params.page(),
    //                     count: params.count(),
    //                     findKey:"vehicleNo",
    //                     findVal:$stateParams.vehicleNo,
    //                     sortKey: "alarmstarttime",
    //                     sortVal: "DESC" // initial sorting
    //                 };
    //                 var callback = function (ret) {
    //                     console.log("车辆里程", ret);
    //                     params.total(ret.total);
    //                     $defer.resolve(ret.body);
    //                     vm.dataBody = ret.body;
    //                     vm.head = ret.head;
    //                     vm.colAdjust($window.innerWidth);
    //                 };
    //                 callAPI('statistic/getAlarmLastingSummary', queryParams, 4, callback);
    //
    //             }
    //         });}
    //     /*------------------------------持续报警查询---------------------------------------------*/
    //     vm.query=function(_findKey,_findVal,count){
    //         console.log("vm.query");
    //         $(function () {
    //             $('#myModal').modal('show')
    //         });
    //         findKey=_findKey;
    //         findVal=_findVal;
    //         vm.chixuTableParams=new ngTableParams({
    //             "page": page, // show first page
    //             "count":count, // count per page
    //         },{
    //             total:0,
    //             getData:function($defer,params){
    //                 var queryParams={
    //                     "findKey":findKey,
    //                     "findVal":findVal,
    //                     "page":params.page(),
    //                     "count":params.count()
    //                 };
    //                 var callback = function (ret) {
    //                     params.total(ret.total);
    //                     $defer.resolve(ret.body);
    //                     vm.dataBody=ret.body;
    //                 }
    //                 callAPI('statistic/getAlarmLastingSummary',queryParams,5,callback);
    //             }
    //         })
    //     }
    //
    //     /*---持续报警返回---*/
    //     vm.chixubaojing_return = function () {
    //         vm.viewForm = true;
    //         vm.chixubaojingFrom = false;
    //     }
    //     /**-------------------------------------------------工具函数----------------------------------------------------*/
    //     // 下拉查询选项
    //     function getSelectOptins(level) {
    //         var mauthedSelectOptins =[];
    //
    //         for (var item in vm.selectOptions){
    //             if(vm.selectOptions[item].level>=level){
    //                 mauthedSelectOptins.push(vm.selectOptions[item]);
    //             }
    //         }
    //         return mauthedSelectOptins;
    //     }
    //     // API调用公共函数
    //     function callAPI(uri,params,type,callback){
    //         console.log(url+uri,params);
    //         var ret;
    //         $http({
    //             method: 'POST',
    //             url: url+uri,
    //             params: params
    //         }).then(function (response) {
    //             if(response.data.retcode==1){
    //                 switch (type) {
    //                     case 1://添加
    //                     case 2://修改
    //                     case 3://删除
    //                         ret = response.data;
    //                         break;
    //                     case 4://默认查询
    //                     case 5://条件查询
    //                     case 6://排序查询
    //                         ret = dataProcessOnSelect(response.data)
    //                         break;
    //                     default:
    //                         ret = response.data;
    //                 }
    //                 callback(ret);
    //             }else if(response.data.retcode==0){
    //                 alert("重复");
    //                 console.log("重复");
    //             }else{
    //                 console.error("未知错误");
    //                 console.error(response);
    //             }
    //
    //         }).finally(function () {
    //             $(function () {
    //                 $('#myModal').modal('hide')
    //             });
    //         });
    //
    //         return ret;
    //     };
    //     // api数据处理
    //     function dataProcessOnSelect(data){
    //         vm.selectlist=false;
    //         body = data.data.body.data;
    //         total = data.data.body.total;
    //         head = data.data.head;
    //         console.log(data.data);
    //         var sortedBody=[];
    //         for(var record=0;record<body.length;record++){
    //             var newRecord = new Object();
    //             var count=0;
    //             for(var key=0;key<head.length;key++){
    //                 var index = (head[key].show==1)?count++:-1;
    //                 var temp = {
    //                     'data':(body[record][head[key].field]==null)?'-':body[record][head[key].field],
    //                     'show':head[key].show,
    //                     'field':head[key].field,
    //                     'index':index,
    //                     'filterType':vm.dataObjFields[head[key].field]!=undefined?vm.dataObjFields[head[key].field]['filterType']:null,
    //                 }
    //                 head[key].index=index;
    //                 newRecord[head[key].field]=temp;
    //             }
    //             newRecord[ 'checked']=false;//存储页面表格前checkbox值
    //             sortedBody.push(newRecord);
    //
    //
    //         }
    //         vm.showFieldsSum=0;
    //         for(var key=0;key<head.length;key++){
    //             if(head[key].show==1){vm.showFieldsSum++};
    //         }
    //         vm.buttonDetail=(vm.maxColNum<vm.showFieldsSum)?true:false;
    //
    //         var ret = {'head':head,'body':sortedBody,'total':total};
    //         return ret;
    //     }
    //     vm.colAdjust=function (innerWidth) {
    //         console.log(innerWidth);
    //         var newColNum = parseInt(innerWidth/150);
    //         if (vm.maxColNum!=newColNum){
    //             console.log(vm.maxColNum);
    //             vm.maxColNum=newColNum;
    //             vm.tableParams.reload();
    //         }
    //         vm.buttonDetail=(vm.maxColNum<vm.showFieldsSum)?true:false;
    //     }
    //
    //     vm.taggleView=function(){
    //         vm.viewAdd= !vm.viewAdd;
    //         vm.viewForm=!vm.viewForm;
    //         vm.viewModify=false;
    //         if(vm.viewAdd==false){
    //             localSaveHistory();
    //
    //         }
    //         if(vm.viewAdd==true){
    //             localGetHistory();
    //         }
    //     }
    //
    //     vm.taggleViewBtwnDetailForm=function(record){
    //
    //         vm.viewDetail= !vm.viewDetail;
    //         vm.viewForm=!vm.viewForm;
    //         if(vm.viewDetail==true){
    //             for(var key in record){
    //                 if(vm.dataObjFields.hasOwnProperty(key)){
    //                     vm.dataObjFields[key].val=record[key].data;
    //                 }
    //             }
    //         }
    //         console.log(record,vm.viewDetail,vm.viewForm);
    //     }
    //
    //     vm.taggleViewBtwnModifyForm=function(){
    //         vm.viewModify=!vm.viewModify;
    //         vm.viewForm=!vm.viewForm;
    //         vm.viewAdd=false;
    //         vm.viewDetail=false;
    //
    //     }
    //
    //     vm.onClickTab = function (type) {
    //         vm.activeTab = type
    //         console.log(vm.activeTab);
    //     }
    //
    //     function localSaveHistory() {
    //         if(cache == undefined){cache = window.localStorage; }
    //         for(var key in vm.dataObjFields){
    //             if(vm.dataObjFields[key].val!=undefined||vm.dataObjFields[key].val!=null){
    //                 cache.setItem("AlarmSummaryController."+key, vm.dataObjFields[key].val);
    //             }
    //         }
    //     };
    //
    //     function localGetHistory() {
    //         if(cache == undefined){cache = window.localStorage;}
    //         for(var key in vm.dataObjFields){
    //             var val = cache.getItem("AlarmSummaryController."+key);
    //             if(val!=undefined||val!=null) {
    //                 vm.dataObjFields[key].val =isNaN(val)?val:Number(val);
    //             }
    //         }
    //     };
    //     $('body').delegate('#graphcontainr','mousewheel',function(){
    //         return false;
    //     });
    //
    //     function drawMapPoint(lineArr, data) {
    //         console.log("draw map",lineArr);
    //         if(lineArr.length==0){
    //             console.error("未获取到历史GPS数据");
    //             return;
    //         }
    //
    //         var LngLats = [];
    //         lineArr.forEach(function (gps) {
    //             LngLats.push(new AMap.LngLat(gps[0], gps[1]));
    //         });
    //
    //         var map = new AMap.Map('graphcontainr', {
    //             resizeEnable: true,
    //             center: [116.397428, 39.90923],
    //             zoom: 3
    //         });
    //
    //         var markers = []; //province见Demo引用的JS文件
    //         var icon = new AMap.Icon({
    //             size: new AMap.Size(24, 24),  //图标大小
    //             image: '/heu_assets/images/icon/alarmShiningDot.gif',
    //         });
    //         var convertGps = [];
    //         var title = data['vehicleNo'].data + ": " + data['alarmType'].data + "\n"
    //             + $scope.languageDict['alarmStartTime'][$scope.language]+ " ： " + data['alarmstarttime'].data + "\n"
    //             + $scope.languageDict['alarmDuration'][$scope.language]+ " ： " + data['duration'].data + " s";
    //         AMap.convertFrom(LngLats, 'gps', function(status, result){
    //             convertGps = result.locations;
    //             convertGps.forEach(function (gps) {
    //                 var marker = new AMap.Marker({
    //                     position: gps,
    //                     map: map,
    //                     title:title,
    //                     icon: icon
    //                 });
    //                 markers.push(marker);
    //             });
    //             map.setFitView();
    //             if(map.getZoom() > 15 ){
    //                 map.setZoom(15);
    //             }
    //         });
    //     }
    //
    //     function drawMapLine(lineArr) {
    //         console.log("draw map",lineArr);
    //         if(lineArr.length==0){
    //             console.warn("未获取到gps历史gps数据无法在地图上显示");
    //         }
    //         var map = new AMap.Map('graphcontainr', {
    //             resizeEnable: true,
    //             center: [116.397428, 39.90923],
    //             zoom: 3
    //         });
    //         var polyline = new AMap.Polyline({
    //             path: lineArr,            // 设置线覆盖物路径
    //             // isOutline:true,
    //             strokeColor: '#FF0000',   // 线颜色
    //             strokeOpacity: 3,         // 线透明度
    //             strokeWeight: 4,          // 线宽
    //             strokeStyle: 'dashed',     // 线样式
    //             strokeDasharray: [10, 5], // 补充线样式
    //             geodesic: true            // 绘制大地线
    //         });
    //         polyline.setMap(map);
    //         map.setFitView();
    //     }
    //
    //     function gpsFormatter(data) {
    //         var gps=[];
    //         data.forEach(function (val) {
    //             gps.push([val['gpsx'], val['gpsy']]);
    //         });
    //         return gps;
    //     }
    //
    //     vm.getGps=function (data) {
    //
    //         if(data['alarmstarttime']==undefined||
    //             data['lastAlarmTime']==undefined){
    //             console.error("报警起止时间不全");
    //             return;
    //         }
    //         var params={
    //             vehicleDeviceId:data['deviceId'].data,
    //             timeType:4,
    //             startTime:data['alarmstarttime'].data,
    //             duration:data['duration'].data,
    //         };
    //         var callback = function (ret) {
    //             console.log("gps",ret);
    //             var gps = gpsFormatter(ret.data);
    //             //   drawMapLine(gps);
    //             if(gps.length<=0){
    //                 Toast.warn($scope.languageDict['DataNull'][$scope.language]);
    //             }
    //             drawMapPoint(gps, data);
    //         }
    //         callAPI('driving/getVehicleLocationPoints',params,1,callback);
    //     }
    //
    //     vm.findOptionsVehicle= [
    //         'company',
    //         'subCompany',
    //         'group',
    //         'line',
    //         'vehicle',
    //     ];
    //
    //     vm.dataObjFields= {
    //         'vehicleNo': {
    //             'ch': '车牌号',
    //             'en': 'vehicleNo',
    //             'field': 'vehicleNo',
    //             'type': 'text',
    //             'modifyWay': 'typing',
    //             'userVisible': true,
    //             'maxlength': '100',
    //             'minlength': '1',
    //             'pattern': '^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$',
    //             'val': '',
    //             'required':true,
    //             'prikey':false,
    //             'text':''
    //         },
    //         'motorType': {
    //             'ch': '车辆类型',
    //             'en': 'motorType',
    //             'field': 'motorType',
    //             'type': 'number',
    //             'modifyWay': 'typing',
    //             'userVisible': true,
    //             'maxlength': '100',
    //             'minlength': '1',
    //             'pattern': '',
    //             'default': '',
    //             'val': '',
    //             'required':true,
    //             'prikey':false,
    //             'filterType':'motorType',
    //             'text':''
    //         },
    //         'deviceId': {
    //             'ch': '车载设备号',
    //             'en': 'deviceId',
    //             'field': 'deviceId',
    //             'type': 'text',
    //             'modifyWay': 'typing',
    //             'userVisible': true,
    //             'maxlength': '100',
    //             'minlength': '1',
    //             'pattern': '',
    //             'default': '',
    //             'val': '',
    //             'required':true,
    //             'prikey':true,
    //             'text':''
    //         },
    //         'driverName': {
    //             'ch': '司机姓名',
    //             'en': 'driverName',
    //             'field': 'driverName',
    //             'type': 'text',
    //             'modifyWay': 'typing',
    //             'userVisible': true,
    //             'maxlength': '100',
    //             'minlength': '1',
    //             'pattern': '',
    //             'default': '',
    //             'val': '',
    //             'required':true,
    //             'prikey':false,
    //             'text':''
    //         },
    //         'alarmType': {
    //             'ch': '报警类型',
    //             'en': 'alarmType',
    //             'field': 'alarmType',
    //             'type': 'text',
    //             'modifyWay': 'typing',
    //             'userVisible': true,
    //             'maxlength': '100',
    //             'minlength': '1',
    //             'pattern': '',
    //             'default': '',
    //             'val': '',
    //             'required':true,
    //             'prikey':false,
    //             'text':''
    //
    //         },
    //         'alarmstarttime': {
    //             'ch': '报警开始时间',
    //             'en': 'alarmstarttime',
    //             'field': 'alarmstarttime',
    //             'type': 'text',
    //             'modifyWay': 'typing',
    //             'userVisible': true,
    //             'maxlength': '100',
    //             'minlength': '1',
    //             'pattern': '',
    //             'default': '',
    //             'val': '',
    //             'required':false,
    //             'prikey':false,
    //             'text':''
    //         },
    //         'lastAlarmTime': {
    //             'ch': '最后报警时间',
    //             'en': 'lastAlarmTime',
    //             'field': 'lastAlarmTime',
    //             'type': 'text',
    //             'modifyWay': 'typing',
    //             'userVisible': true,
    //             'maxlength': '100',
    //             'minlength': '1',
    //             'pattern': '',
    //             'default': '',
    //             'val': '',
    //             'required':false,
    //             'prikey':false,
    //             'text':''
    //         },
    //         'duration': {
    //             'ch': '持续时间',
    //             'en': 'duration',
    //             'field': 'duration',
    //             'type': 'text',
    //             'modifyWay': 'typing',
    //             'userVisible': true,
    //             'maxlength': '100',
    //             'minlength': '1',
    //             'pattern': '',
    //             'default': '',
    //             'val': '',
    //             'required':false,
    //             'prikey':false,
    //             'text':''
    //         },
    //         'alarmlocation': {
    //             'ch': '报警发送位置',
    //             'en': 'alarmlocation',
    //             'field': 'alarmlocation',
    //             'type': 'text',
    //             'modifyWay': 'typing',
    //             'userVisible': true,
    //             'maxlength': '100',
    //             'minlength': '1',
    //             'pattern': '',
    //             'default': '',
    //             'val': '',
    //             'required':false,
    //             'prikey':false,
    //             'text':''
    //         },
    //         'dismissTime': {
    //             'ch': '解除时间',
    //             'en': 'dismissTime',
    //             'field': 'dismissTime',
    //             'type': 'text',
    //             'modifyWay': 'typing',
    //             'userVisible': true,
    //             'maxlength': '100',
    //             'minlength': '1',
    //             'pattern': '',
    //             'default': '',
    //             'val': '',
    //             'required':false,
    //             'prikey':false,
    //             'text':''
    //         },
    //     }
    //
    //     vm.fieldsClass= {
    //         'title':{
    //             'ch':'里程统计信息',
    //             'en':'Vehicle Info',
    //         },
    //         'class':{
    //             'vehicle': {
    //                 'type':'vehicle',
    //                 'active':false,
    //                 'ch': '车辆信息',
    //                 'en': 'vehicle info',
    //                 'fields':[
    //                     'vehicleNo',
    //                     'deviceId',
    //                     'driverName',
    //                     'alarmType',
    //                     'alarmstarttime',
    //                     'lastAlarmTime',
    //                     'duration',
    //                     'alarmlocation',
    //                     'motorType',
    //                     'dismissTime',
    //                 ]
    //             },
    //         }
    //
    //     }
    //
    //
    //
    // };

})




