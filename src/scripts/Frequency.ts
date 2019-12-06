import calcCharPairsFrequency, { ICharPairsFrequency } from './algorithms/char-frequency/calc-char-pair-frequency';
import calcCharFrequency, { ICharFrequency, ICharFrequencyOptions } from './algorithms/char-frequency/calc-char-frequency';
import Events from './Events';

export default class Frequency {
   public events = new Events();

   public char: ICharFrequency;
   public pair: ICharPairsFrequency;

   public charColors: Map<string, string> = new Map();
   public pairColors: Map<string, string> = new Map();

   public mostFrequentChar = { key: '', val: 0 };
   public mostFrequentPair = { key: '', val: 0 };

   public update(text: string, options: ICharFrequencyOptions) {
      this.char = calcCharFrequency(text, options);
      this.pair = calcCharPairsFrequency(text);

      this.updateMostFrequentChar();
      this.updateMostFrequentPair();

      this.updateCharColors();
      this.updatePairColors();

      this.events.emit('update');
   };

   private updateCharColors() {
      this.charColors.clear();

      this.char.map.forEach((val, key) => {
         const v = val * 255 / this.mostFrequentChar.val;
         this.charColors.set(key, `rgb(${v},0,0)`);
      });
   }

   private updatePairColors() {
      this.pairColors.clear();

      this.pair.map.forEach((val, key) => {
         const v = val * 255 / this.mostFrequentPair.val;
         this.pairColors.set(key, `rgb(${v},0,0)`);
      });
   }

   private updateMostFrequentChar() {
      this.mostFrequentChar = { key: '', val: 0 };

      this.char.map.forEach((val, key) => {
         if (this.mostFrequentChar.val >= val) return;

         this.mostFrequentChar.val = val;
         this.mostFrequentChar.key = key;
      });
   }

   private updateMostFrequentPair() {
      this.mostFrequentPair = { key: '', val: 0 };

      this.pair.map.forEach((val, key) => {
         if (this.mostFrequentPair.val >= val) return;

         this.mostFrequentPair.val = val;
         this.mostFrequentPair.key = key;
      });
   }

}