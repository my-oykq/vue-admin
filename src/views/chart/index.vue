<template>
 <div class="container">
   <div ref="chart_ref" style="width: 600px; height: 400px"></div>
 </div>
</template>

<script>
export default {
  name: 'ChartIndex',
  components: {},
  props: {},
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      var mChart = this.$echarts.init(this.$refs.chart_ref)
      const option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }]
      }
      mChart.setOption(option)
    }
  }
}
</script>

<style scoped lang="less">

</style>
