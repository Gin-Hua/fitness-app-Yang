require("../css/sportsInfo.less");

const echarts = require("echarts")
document.ready(function () {
    utils.createFooter("my");
    console.log(111);
    console.log(echarts);
    var myChart = echarts.init(document.getElementById('main'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '七天运动数据'
        },
        tooltip: {},
        legend: {
            data: ['时长']
        },
        xAxis: {
            data: ["7.1", "7.2", "7.3", "7.4", "7.5", "7.7"]
        },
        yAxis: {},
        series: [{
            name: '时长',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    var perDom = echarts.init(document.getElementById('per'));
    let option1 = {
        title: {
            text: '运动分类',
            subtext: '纯属虚构',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: '跑步' },
                    { value: 735, name: '骑行' },
                    { value: 580, name: '训练' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    perDom.setOption(option1);



})
