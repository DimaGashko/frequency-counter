import Chart from 'chart.js';
import Frequency from "./Frequency";

export default class Res {
   charCanvas: HTMLCanvasElement;
   pairCanvas: HTMLCanvasElement;

   charCtx: CanvasRenderingContext2D;
   pairCtx: CanvasRenderingContext2D;

   charChart: Chart;
   pairChart: Chart;

   $: { [name: string]: HTMLElement } = {};

   chartOptions: Chart.ChartOptions = {
      maintainAspectRatio: false,
      legend: {
         display: false,
      }
   }

   public constructor(private root: HTMLElement, private frequency: Frequency) {
      this.init();
      this.initEvents();
   }

   private init() {
      this.getElements();
      this.initCanvases();
   }

   public update() {
      this.updateCharChart();
      this.updatePairChart();
      this.updateSummary();
   }

   private initEvents() {
      this.frequency.events.addListener('update', () => {
         this.update();
      });
   }

   private updateCharChart() {
      const { char, charColors } = this.frequency;
      const { labels, data, colors } = this.getFrequencyData(char.map, charColors);

      if (this.charChart) {
         this.charChart.data.labels = labels;
         this.charChart.data.datasets[0].data = data;
         this.charChart.data.datasets[0].backgroundColor = colors;
         this.charChart.update();
         return;
      }

      this.charChart = new Chart(this.charCtx, {
         type: 'bar',
         data: {
            labels,
            datasets: [{
               backgroundColor: colors,
               data,
            }]
         },
         options: this.chartOptions,
      });
   }

   private updatePairChart() {
      const { pair, pairColors } = this.frequency;
      const { labels, data, colors } = this.getFrequencyData(pair.map, pairColors);

      if (this.pairChart) {
         this.pairChart.data.labels = labels;
         this.pairChart.data.datasets[0].data = data;
         this.pairChart.data.datasets[0].backgroundColor = colors;
         this.pairChart.update();
         return;
      }

      this.pairChart = new Chart(this.pairCtx, {
         type: 'bar',
         data: {
            labels,
            datasets: [{
               backgroundColor: colors,
               data,
            }]
         },
         options: this.chartOptions,
      });
   }

   private getFrequencyData(frequency: Map<string, number>, colorsMap: Map<string, string>) { 
      const entries = Array.from(frequency.entries());
      entries.sort((a, b) => b[1] - a[1]);

      const labels = entries.map(e => e[0]);
      const data = entries.map(e => e[1]).map(v => +(v * 100).toFixed(2));
      const colors = labels.map((key) => colorsMap.get(key));

      return { labels, data, colors }
   }

   private updateSummary() {
      this.$.total.innerHTML = this.frequency.char.len + '';
      this.$.uniqueChars.innerHTML = this.frequency.char.map.size + '';
      this.$.uniquePairs.innerHTML = this.frequency.pair.map.size + '';
   }

   private initCanvases() {
      this.charCtx = this.charCanvas.getContext('2d');
      this.pairCtx = this.pairCanvas.getContext('2d');
   }

   private getElements() {
      const r = this.root;

      this.charCanvas = r.querySelector('.app-res__frequency-chart');
      this.pairCanvas = r.querySelector('.app-res__pairs-frequency-chart');

      this.$.total = r.querySelector('.app-res__total');
      this.$.uniqueChars = r.querySelector('.app-res__unique-chars');
      this.$.uniquePairs = r.querySelector('.app-res__unique-pairs');
   }

}