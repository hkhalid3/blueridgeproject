<script>
    import { Bar } from 'vue-chartjs'
    export default {
       extends: Bar,
       props: {
           chartData: {
               type: Object,
               default: null
           },
           chartLabels: {
                type: Array,
                required: true
            },
           options: {
               type: Object,
               default: null
           }, 
       },
       mounted () {
           this.renderChart(this.chartData, this.options)
       }, 
       name: 'HistogramChart'
    }
    
</script>