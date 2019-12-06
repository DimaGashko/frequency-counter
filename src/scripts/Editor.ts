import { throttle } from 'throttle-debounce';
import Events from './Events';

interface IEditorElements {
   [name: string]: HTMLElement,
   realText?: HTMLTextAreaElement,
}

export default class Editor {
   private MAX_HIGHLIGHT_LEN = 5000;
   private MAX_LIVE_HIGHLIGHT_LEN = 1000;

   private _value = '';
   private $: IEditorElements = {};

   private _decTextUpdatingFrame = 0;

   private _highlight = false;
   private _highlightMap: Map<string, string> = new Map();

   public events = new Events();

   constructor(private root: HTMLElement) {
      this.init();
   }

   private init() {
      this.getElements();
      this.initValue();
      this.setHighlight(this._highlight);
      this.initEvents();
   }

   public setHighlight(val: boolean) {
      this._highlight = val;
      this.updateDecText();

      const type = (val) ? 'remove' : 'add';
      this.root.classList[type]('app-editor--no-highlight');
   }

   public setHighlightMap(highlightMap: Map<string, string>) {
      this._highlightMap = highlightMap;
      this.updateDecText();
   }

   public getText() {
      return this._value;
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

         this.events.emit('input');
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
      if (!this._highlight || this._value.length > this.MAX_HIGHLIGHT_LEN) {
         this.$.decText.innerHTML = this._value;
         return;
      }

      this.$.decText.innerHTML = this._value.split('').map((item, i) => {
         const map = this._highlightMap;
         item = this.escape(item);

         if (!map.has(item) && !map.has(item.toLowerCase())) {
            return item;
         }

         const color = map.get(item) || map.get(item.toLowerCase());
         return `<span style="color: ${color}">${item}</span>`;
      }).join('');
   }

   private escape(str) {
      return str
         .replace(/&/g, '&amp;')
         .replace(/</g, '&lt;')
         .replace(/>/g, '&gt;')
         .replace(/"/g, '&quot;')
         .replace(/'/g, '&#039;')
   }

   private initValue() {
      this._value = this.$.realText.value;
   }

   private getElements() {
      this.$.decText = this.root.querySelector('.app-editor__dec-text');
      this.$.realText = this.root.querySelector('.app-editor__real-text');
   }
}