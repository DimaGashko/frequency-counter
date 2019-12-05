
interface IEditorElements {
   [name: string]: HTMLElement,
   realText?: HTMLTextAreaElement,
}

export default class Editor {
   private _value = '';
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
      this.$.realText.addEventListener('keydown', () => {
         this.startDecTextUpdating();
      });

      this.$.realText.addEventListener('keyup', () => {
         this.stopDecTextUpdating();
      });
   }

   /** Start automatic dec text updating */
   private startDecTextUpdating() {
      if (this._decTextUpdatingFrame) return;
      const editor = this;

      this._decTextUpdatingFrame = requestAnimationFrame(function tik() {
         console.log('hi')
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

   private updateDecText() {
      this.$.decText.innerText = this._value;
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