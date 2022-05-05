<template>
  <div>
    <div class="line">
      <div id="line-main" style="width: 100%;height: 400px;"></div>
    </div>
    <div class="pie">
      <div id="pie-main" style="width: 100%;height: 400px;"></div>
    </div>
    <div class="bar">
      <div id="bar-main" style="width: 100%;height: 400px;"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {}
  },
  methods: {
    myEcharts() {
      let lineChart = this.$echarts.init(document.getElementById('line-main'));
      let lineOption = {
        title: {
          text: '天天云考勤数据',
          subtext: '近七日打卡数据统计',
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: ['4-15', '4-16', '4-17', '4-18', '4-19', '4-20', '4-21']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [178, 50, 52, 181, 178, 177, 180],
            type: 'line'
          }
        ]
      };
      lineChart.setOption(lineOption)

      let pieChart = this.$echarts.init(document.getElementById('pie-main'));
      //配置饼图
      let pieOption = {
        title: {
          text: '系统用户统计',
          subtext: '2022-04-21',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              {value: 1, name: '系统管理员'},
              {value: 6, name: 'HR'},
              {value: 52, name: '普通员工'},
              {value: 22, name: '公司管理人员'},
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
      pieChart.setOption(pieOption);

      let barChart = this.$echarts.init(document.getElementById('bar-main'));
      //配置柱状图
      let barOption = {
        title: {
          text: '系统访问量',
          subtext: '近七日系统访问统计',
          left: 'left'
        },
        xAxis: {
          type: 'category',
          data: ['4-15', '4-16', '4-17', '4-18', '4-19', '4-20', '4-21']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [360, 105, 110, 365, 360, 359, 355],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      };
      barChart.setOption(barOption)
    }
  },
  mounted() {
    this.myEcharts();
  }
}
</script>

<style scoped>
.line {
  width: 100%;
  height: 400px;
  border: 1px solid lightgrey;
  margin-bottom: 15px;
  align-items: center;
}

.pie {
  width: 49%;
  height: 350px;
  border: 1px solid lightgrey;
  align-items: center;
  float:left;
}

.bar {
  width: 49%;
  height: 350px;
  border: 1px solid lightgrey;
  align-items: center;
  float:right;
}
</style>
