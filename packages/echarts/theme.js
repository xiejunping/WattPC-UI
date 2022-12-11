export default {
  color: [
    '#2F88FF',
    '#00C8D2',
    '#F45858',
    '#F9CC15',
    '#F98915',
    '#6164F9',
    '#A161F9',
    '#29B3F0',
    '#4ACC71',
    '#F67452',
    '#598FE6',
    '#00C8D2',
    '#626C91',
    '#A0A7E6',
    '#C4EBAD',
    '#97DEE8',
    '#E6CF59',
    '#E67E59',
    '#B859E6',
    '#E65959'
  ],
  backgroundColor: 'rgba(252,252,252,0)',
  textStyle: {},
  title: {
    textStyle: { color: '#666666' },
    subtextStyle: { color: '#999999' }
  },
  line: {
    itemStyle: { normal: { borderWidth: '2' }, emphasis: { borderWidth: '3' } },
    lineStyle: { normal: { width: '2' } },
    symbolSize: '6',
    symbol: 'circle',
    smooth: true
  },
  radar: {
    itemStyle: { normal: { borderWidth: '2' } },
    lineStyle: { normal: { width: '3' } },
    symbolSize: '8',
    symbol: 'emptyCircle',
    smooth: false
  },
  bar: {
    itemStyle: {
      normal: { barBorderWidth: 0, barBorderColor: '#ccc' },
      emphasis: { barBorderWidth: 0, barBorderColor: '#ccc' }
    }
  },
  pie: { itemStyle: { borderWidth: 2, borderColor: '#FFFFFF' } },
  scatter: {
    itemStyle: {
      normal: { borderWidth: 0, borderColor: '#ccc' },
      emphasis: { borderWidth: 0, borderColor: '#ccc' }
    }
  },
  boxplot: {
    itemStyle: {
      normal: { borderWidth: 0, borderColor: '#ccc' },
      emphasis: { borderWidth: 0, borderColor: '#ccc' }
    }
  },
  parallel: {
    itemStyle: {
      normal: { borderWidth: 0, borderColor: '#ccc' },
      emphasis: { borderWidth: 0, borderColor: '#ccc' }
    }
  },
  sankey: {
    itemStyle: {
      normal: { borderWidth: 0, borderColor: '#ccc' },
      emphasis: { borderWidth: 0, borderColor: '#ccc' }
    }
  },
  funnel: {
    itemStyle: {
      normal: { borderWidth: 0, borderColor: '#ccc' },
      emphasis: { borderWidth: 0, borderColor: '#ccc' }
    }
  },
  gauge: {
    itemStyle: {
      normal: { borderWidth: 0, borderColor: '#ccc' },
      emphasis: { borderWidth: 0, borderColor: '#ccc' }
    }
  },
  candlestick: {
    itemStyle: {
      normal: {
        color: '#e6a0d2',
        color0: 'transparent',
        borderColor: '#e6a0d2',
        borderColor0: '#3fb1e3',
        borderWidth: '2'
      }
    }
  },
  graph: {
    itemStyle: { normal: { borderWidth: 0, borderColor: '#ccc' } },
    lineStyle: { normal: { width: '1', color: '#DADFE3' } },
    symbolSize: '8',
    symbol: 'emptyCircle',
    smooth: false,
    color: ['#3fb1e3', '#6be6c1', '#626c91', '#a0a7e6', '#c4ebad', '#96dee8'],
    label: { normal: { textStyle: { color: '#ffffff' } } }
  },
  map: {
    itemStyle: {
      normal: { areaColor: '#EBF2F5', borderColor: '#FFFFFF', borderWidth: 1 },
      emphasis: {
        areaColor: 'rgba(63,177,227,0.25)',
        borderColor: '#3fb1e3',
        borderWidth: 1
      }
    },
    label: {
      normal: { textStyle: { color: '#FFFFFF' } },
      emphasis: { textStyle: { color: '#FFFFFF' } }
    }
  },
  geo: {
    itemStyle: {
      normal: {
        areaColor: '#EBF2F5',
        borderColor: '#FFFFFF',
        borderWidth: 0.5
      },
      emphasis: {
        areaColor: '#EBF2F5',
        borderColor: '#FFFFFF',
        borderWidth: 0.5
      }
    },
    label: {
      normal: { textStyle: { color: '#ffffff' } },
      emphasis: { textStyle: { color: 'rgb(63,177,227)' } }
    }
  },
  categoryAxis: {
    nameTextStyle: {
      color: '#333333',
      fontWeight: 600,
      padding: [0, 12],
      lineHeight: 24
    },
    axisLine: {
      show: true,
      alignWithLabel: true,
      lineStyle: { color: '#DADFE3' }
    },
    axisTick: {
      show: true,
      alignWithLabel: true,
      lineStyle: { color: '#DADFE3' }
    },
    axisLabel: { show: true, margin: 16, textStyle: { color: '#333333' } },
    splitArea: {
      show: false,
      areaStyle: { color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'] }
    }
  },
  valueAxis: {
    nameTextStyle: {
      color: '#333333',
      fontWeight: 600,
      padding: [10, 0],
      lineHeight: 24
    },
    axisLine: { show: false, lineStyle: { color: '#DADFE3' } },
    axisTick: { show: false, lineStyle: { color: '#333' } },
    axisLabel: { show: true, textStyle: { color: '#333333' } },
    splitLine: {
      show: true,
      lineStyle: { color: ['#DEE4F5'], type: 'dotted' }
    },
    splitArea: {
      show: false,
      areaStyle: { color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'] }
    }
  },
  logAxis: {
    axisLine: { show: true, lineStyle: { color: '#DADFE3' } },
    axisTick: { show: false, lineStyle: { color: '#333' } },
    axisLabel: { show: true, textStyle: { color: '#333333' } },
    splitLine: { show: true, lineStyle: { color: ['#eeeeee'] } },
    splitArea: {
      show: false,
      areaStyle: { color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'] }
    }
  },
  timeAxis: {
    axisLine: { show: true, lineStyle: { color: '#DADFE3' } },
    axisTick: { show: false, lineStyle: { color: '#333' } },
    axisLabel: { show: true, textStyle: { color: '#333333' } },
    splitLine: { show: true, lineStyle: { color: ['#eeeeee'] } },
    splitArea: {
      show: false,
      areaStyle: { color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'] }
    }
  },
  toolbox: {
    iconStyle: {
      normal: { borderColor: '#999999' },
      emphasis: { borderColor: '#666666' }
    }
  },
  legend: { textStyle: { color: '#999999', fontSize: 12, lineHeight: 20 } },
  tooltip: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D4D7E4',
    extraCssText: 'box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.08);',
    textStyle: { color: '#333333' },
    axisPointer: {
      lineStyle: { color: '#DADFE3', width: 1 },
      shadowStyle: { shadowColor: '#F3F4F5', opacity: 0.5 },
      crossStyle: { color: '#DADFE3', width: 1 }
    }
  },
  timeline: {
    lineStyle: { color: '#626c91', width: 1 },
    itemStyle: {
      normal: { color: '#626c91', borderWidth: 1 },
      emphasis: { color: '#626c91' }
    },
    controlStyle: {
      normal: { color: '#626c91', borderColor: '#626c91', borderWidth: 0.5 },
      emphasis: { color: '#626c91', borderColor: '#626c91', borderWidth: 0.5 }
    },
    checkpointStyle: { color: '#3fb1e3', borderColor: 'rgba(63,177,227,0.15)' },
    label: {
      normal: { textStyle: { color: '#626c91' } },
      emphasis: { textStyle: { color: '#626c91' } }
    }
  },
  visualMap: { color: ['#8BB6F2', '#9EC4F6', '#B4D2FA', '#CDE2FB', '#E6F0FD'] },
  dataZoom: {
    backgroundColor: 'rgba(255,255,255,0)',
    dataBackgroundColor: 'rgba(222,222,222,1)',
    fillerColor: 'rgba(114,230,212,0.25)',
    handleColor: '#DADFE3',
    handleSize: '100%',
    textStyle: { color: '#999999' }
  },
  markPoint: {
    label: {
      normal: { textStyle: { color: '#ffffff' } },
      emphasis: { textStyle: { color: '#ffffff' } }
    }
  }
}
