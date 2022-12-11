<template>
  <v-chart ref="vchart" :option="option" class="c-chart" theme="watt-echart-theme"></v-chart>
</template>
<script>
import VChart from 'vue-echarts'
import { ref, defineComponent, watch, toRefs } from 'vue'
import { use, registerTheme } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, TitleComponent, LegendComponent } from 'echarts/components'
import theme from './theme'

registerTheme('watt-echart-theme', theme)
use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
])

export default defineComponent({
  name: 'LineChart',
  components: { VChart },
  props: {
    chartData: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean
    }
  },
  setup (props, { emit }) {
    const vchart = ref(null)
    const { chartData, loading } = toRefs(props)
    const { x, y, data } = chartData.value
    const xAxisData = data.map(ret => ret[x])
    const yAxisData = data.map(ret => ret[y])

    const option = ref({
      title: {
        text: '用户登录'
      },
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: yAxisData,
          type: 'line',
          smooth: true
        }
      ]
    })

    watch(loading, (value) => {
      if (value) vchart.value.showLoading()
      else vchart.value.hideLoading()
    })
    return {
      vchart,
      option
    }
  }
})
</script>
