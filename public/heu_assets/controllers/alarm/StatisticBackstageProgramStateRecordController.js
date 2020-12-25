app.controller("StatisticBackstageProgramStateRecordController",
    ["$scope", "$timeout", "$uibModal", "ngTableParams", "$http", "$rootScope", "$HttpClient", "dept",
        function ($scope, $timeout, $uibModal, ngTableParams, $http, $rootScope, $HttpClient, dept) {
            let vm = this;
            let url = '/api/';
            vm.viewForm = true;
            let page = 1;
            let count = 8;
            let findKey = undefined;
            let findVal = undefined;
            vm.detailShow = false;
            vm.findOptions = [
                'project_name',
                'event_name',
                'configuration_name',
            ];


            /*下拉框查询*/
            vm.query = function (_findKey, _findVal, count) {

                // backStageChart();
                findKey = _findKey;
                findVal = _findVal;
                vm.tableParams = new ngTableParams({
                    page: page, // show first page
                    count: count, // count per page
                }, {
                    total: 0,
                    getData: function ($defer, params) {
                        let queryParams = {
                            findKey: findKey,
                            findVal: findVal,
                            page: params.page(),
                            count: params.count()
                        };
                        let callback = function (ret) {
                            params.total(ret.total);
                            $defer.resolve(ret.body);
                            let body = ret.body;
                            let head = ret.head;
                            JsonDataPro(body, head);


                        };
                        callAPI('datastatus/getProjectStatusStat', queryParams, 5, callback);
                    }
                })
            };

            //  json  数据处理
            function JsonDataPro(body, head) {

                for (let i = 0; i < body.length; i++) {
                    isJSON(body[i]['summary'].data);
                    if (vm.TF) {
                        let jsonData = JSON.parse(body[i]['summary'].data);
                        let obj = {};

                        for (let key in jsonData) {
                            if (key === 'disk') {
                                for (let key2 in jsonData[key]) {
                                    obj[key2] = jsonData[key][key2];
                                }
                            } else {
                                obj[key] = jsonData[key]
                            }
                        }
                        for (let key in obj) {
                            let num = 0;
                            let index = 0;
                            for (let i = 0; i < head.length; i++) {
                                if (head[i].field === key) {
                                    num++;
                                    index = i;
                                    break;
                                }
                            }

                            if (num === 0) {
                                head.push({
                                    field: key,
                                    english: key,
                                    chinese: key,
                                    index: -1
                                });

                            }
                            body[i][key] = {
                                'data': obj[key],
                                'show': 1,
                                'field': key,
                            };
                            body[i]['summary'].data = 1;
                        }
                    }
                }
                for (let j = 0; j < head.length; j++) {

                    for (let k = 0; k < body.length; k++) {
                        for (let key in body[k]) {
                            if (!body[k][head[j].field]) {
                                body[k][head[j].field] = {
                                    'data': '无',
                                    'show': 1,
                                    'field': head[j].field,
                                }
                            }
                        }
                    }
                }
                vm.dataBody = body;
                vm.head = head;
                getChartData();
            };
            vm.veiwOrDetailShow = () => {
                vm.detailShow = !vm.detailShow;
                vm.viewForm = !vm.viewForm;
            };
            vm.getDetail = (item) => {
                vm.veiwOrDetailShow();
                vm.detailData = [];
                console.log(vm.head);
                for (let key in item) {
                    if (key !== 'summary' && undefined !== key) {
                        for (let i = 0; i < vm.head.length; i++) {
                            if (key === vm.head[i].field) {
                                vm.detailData.push({
                                    key: vm.head[i].chinese,
                                    val: item[key].data
                                });
                            }
                        }
                    }
                }
                console.log(vm.detailData);
            };
            vm.query('event_name', 'Dongguan', 8);

            function isJSON(str) {
                vm.TF = false;
                if (typeof str == 'string') {
                    try {
                        JSON.parse(str);
                        vm.TF = true;
                        return vm.TF;
                    } catch (e) {
                        vm.TF = false;
                        return vm.TF;
                    }
                }
            }

            /*图形*/
            function backStageChart() {

                vm.backStageChart = echarts.init(document.getElementById("chartTop"));
                var option = {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: vm.legendData
                    },
                    noDataLoadingOption: {
                        text: '暂无数据',
                        effect: 'bubble',
                        effectOption: {
                            effect: {
                                n: 0 //气泡个数为0
                            }
                        }
                    },
                    grid: {
                        left: '20%',
                        right: '4%',
                        y2: 150
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: vm.xAxisData,
                        name: '日期'
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '次数',
                            axisLabel: {
                                interval: 0,
                                rotate: 45,
                            }
                        },
                    ],
                    series: vm.seriesData
                };
                vm.backStageChart.setOption(option);
            }

            // 获取图形数据
            function getChartData() {
                let obj = {};
                vm.chartParams = [];
                vm.time = [];
                vm.legend = [];
                for (let i = 5; i < vm.head.length; i++) {
                    vm.chartData = [];
                    if (vm.head[i].field !== 'endtime') {
                        for (let j = 0; j < vm.dataBody.length; j++) {
                            if (vm.dataBody[j][vm.head[i].field].data === '无') {
                                vm.chartData.push(0);
                            } else {
                                vm.chartData.push(
                                    vm.dataBody[j][vm.head[i].field].data
                                )
                            }
                        }

                        obj[vm.head[i].field] = vm.chartData;
                    }
                    ;
                }
                for (let k = 0; k < vm.dataBody.length; k++) {
                    vm.time.push(vm.dataBody[k]['time'].data)
                }
                vm.legendData = [];
                vm.seriesData = [];
                for (let key in obj) {

                    vm.seriesData.push(
                        {
                            name: key,
                            type: 'line',
                            smooth: true,  //曲线
                            data: obj[key]
                        }
                    );
                    vm.legendData.push(key);

                }

                vm.xAxisData = vm.time;
                backStageChart();
            }

            // 界面检测
            $('#backStageMain').resize(function () {
            });
            $('#chartTop').resize(function () {
            });
            window.onresize = function () {
                if (undefined !== vm.backStageChart) {
                    vm.backStageChart.resize();
                }
            };
            /*----------------------------------------工具函数---------------------------------------------------------*/

            // API调用公共函数
            function callAPI(uri, params, type, callback) {
                var ret;
                $http({
                    method: 'POST',
                    url: url + uri,
                    params: params
                }).then(function (response) {
                    if (response.data.retcode == 1) {
                        switch (type) {
                            case 1://添加
                            case 2://修改
                            case 3://删除
                                ret = response.data;
                                break;
                            case 4://默认查询
                            case 5://条件查询
                            case 6://排序查询
                                ret = dataProcessOnSelect(response.data)
                                break;
                            default:
                                ret = response.data;
                        }
                        callback(ret);
                    } else if (response.data.retcode != 1) {
                        errorReminder(response.data.retcode, response.data.data);
                    }
                });
                return ret;
            }

            // api数据处理
            function dataProcessOnSelect(data) {
                vm.selectlist = false;
                var body = data.data.body.data;
                var total = data.data.body.total;
                var head = data.data.head;
                var sortedBody = [];
                for (var record = 0; record < body.length; record++) {
                    var newRecord = new Object();
                    var count = 0;
                    for (var key in head) {
                        var index = count++;
                        var temp = {
                            'data': (body[record][head[key].field] == null) ? '-' : body[record][head[key].field],
                            'show': head[key].show,
                            'field': head[key].field,
                            'index': index,
                        };
                        head[key].index = index;
                        if (temp.field !== undefined) {
                            newRecord[head[key].field] = temp;
                        }
                    }
                    sortedBody.push(newRecord);
                }
                vm.showFieldsSum = 0;
                count = 0;
                for (var key = 0; key < head.length; key++) {
                    if (head[key].show == 1) {
                        vm.showFieldsSum++
                    }
                    var index = (head[key].show == 1) ? count++ : -1;
                    head[key].index = index;
                }
                vm.buttonDetail = (vm.maxColNum < vm.showFieldsSum) ? true : false;
                var ret = {'head': head, 'body': sortedBody, 'total': total};
                return ret;
            }


        }]);

