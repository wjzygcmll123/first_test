<!--测试知识图谱-->

<template>
  <div>
    <div id="main" style="width: 1000px;height: 1000px"></div>
    <!--<div v-if="true">-->
    <!--<span>该门考试还没人参考哦,请提醒学生参加考试。</span>-->
    <!--</div>-->
  </div>

</template>


<script>
  import $ from 'jquery'
  import echarts from 'echarts'

  require('echarts/extension/dataTool')
  export default {
    name: "kgCharts",
    data() {
      return {
        // categories: [],
        // graph: null,
      }
    },
    mounted() {
      this.kg();
    },
    methods: {

      kg() {
        let searchInput = this.$route.query.searchInput
        console.log(searchInput)
        let myChart = echarts.init(document.getElementById('main'));
        let option;
        // myChart.showLoading();
        $(function () {
          //
          $.get('http://localhost:8088/static/les-miserables.gexf', function (xml) {
            // myChart.hideLoading();
            let graph = echarts.dataTool.gexf.parse(xml);
            console.log(graph)
            let categories = [];
            for (let i = 0; i < 9; i++) {
              categories[i] = {
                name: '类目' + i
              };
            }
            graph.nodes.forEach(function (node) {
              node.itemStyle = null;
              node.symbolSize = 10;
              node.value = node.symbolSize;
              node.category = node.attributes.modularity_class;
              // Use random x, y
              node.x = node.y = null;
              node.draggable = true;
            });
            option = {
              title: {
                text: 'Les Miserables',
                subtext: 'Default layout',
                top: 'bottom',
                left: 'right'
              },
              tooltip: {},
              legend: [{
                // selectedMode: 'single',
                data: categories.map(function (a) {
                  return a.name;
                })
              }],
              animation: false,
              series: [
                {
                  name: 'Les Miserables',
                  type: 'graph',
                  layout: 'force',
                  data: graph.nodes,
                  links: graph.links,
                  categories: categories,
                  roam: true,
                  label: {
                    position: 'right'
                  },
                  force: {
                    repulsion: 100
                  }
                }
              ]
            };
            myChart.setOption(option);
          }, 'xml');
        })


      }
    }
  }
</script>

<style scoped>
  #app {
    background-color: white;
  }
</style>
