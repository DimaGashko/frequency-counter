import { throttle } from 'throttle-debounce';

interface IEditorElements {
   [name: string]: HTMLElement,
   realText?: HTMLTextAreaElement,
}

export default class Editor {
   private MAX_HIGHLIGHT_LEN = 10000;
   private MAX_LIVE_HIGHLIGHT_LEN = 2000;

   private _value = '';
   private _prevDecTextValue = '';
   private $: IEditorElements = {};

   private _decTextUpdatingFrame = 0;

   constructor(private root: HTMLElement) {
      this.init();
   }

   private init() {
      this.getElements();
      this.initValue();
      this.initEvents();
   }

   private initEvents() {
      this.$.realText.addEventListener('input', () => {
         if (this._value.length > this.MAX_LIVE_HIGHLIGHT_LEN) {
            return;
         }

         this.startDecTextUpdating();
         setTimeout(() => this.stopDecTextUpdating(), 1000);
      });

      this.$.realText.addEventListener('input', throttle(300, () => {
         if (this._value.length > this.MAX_LIVE_HIGHLIGHT_LEN) {
            this.updateDecTextScrolls();
            this.readRealText();
         }
      }));

      this.$.realText.addEventListener('keyup', throttle(300, () => {
         this.stopDecTextUpdating();
         this.updateDecTextScrolls();
         this.readRealText();
      }));

      this.$.realText.addEventListener('scroll', () => {
         this.updateDecTextScrolls();
      });
   }

   /** Start automatic dec text updating */
   private startDecTextUpdating() {
      if (this._decTextUpdatingFrame) return;
      const editor = this;

      this._decTextUpdatingFrame = requestAnimationFrame(function tik() {
         editor.readRealText();
         editor._decTextUpdatingFrame = requestAnimationFrame(tik);
      });
   }

   private stopDecTextUpdating() {
      cancelAnimationFrame(this._decTextUpdatingFrame);
      this._decTextUpdatingFrame = 0;
   }
 
   private readRealText() {
      this._value = this.$.realText.value;
      this.updateDecText();
   }

   private updateDecTextScrolls() {
      this.$.decText.scrollTop = this.$.realText.scrollTop;
      this.$.decText.scrollLeft = this.$.realText.scrollLeft;
   }

   private updateDecText() {
      if (this._prevDecTextValue === this._value) return;
      this._prevDecTextValue = this._value;

      if (this._value.length > this.MAX_HIGHLIGHT_LEN) {
         this.$.decText.innerHTML = this._value;
         return;
      }

      this.$.decText.innerHTML = this._value.split('').map((item, i) => {
         return (i % 2) ? `<span style="color: red">${item}</span>` : item;
      }).join('');
   }

   private initValue() {
      this._value = this.$.realText.value;
      this.updateDecText();
   }

   private getElements() {
      this.$.decText = this.root.querySelector('.app-editor__dec-text');
      this.$.realText = this.root.querySelector('.app-editor__real-text');
   }
}