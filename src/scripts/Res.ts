import Frequency from "./Frequency";

export default class Res {
   charCanvas: HTMLCanvasElement;
   pairCanvas: HTMLCanvasElement;

   charCtx: CanvasRenderingContext2D;
   pairCtx: CanvasRenderingContext2D;

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
      
   }

   private updatePairChart() {

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