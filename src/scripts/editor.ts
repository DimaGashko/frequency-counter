
interface IEditorElements {
   [name: string]: HTMLElement,
   realText?: HTMLTextAreaElement,
}

export default class Editor {
   private _value = '';
   private $: IEditorElements = {};

   constructor(private root: HTMLElement) {
      this.init();
   }

   private init() {
      this.getElements();
      this.initValue();
      this.initEvents();
   }

   private initEvents() {
      this.$.realText.addEventListener('keydown', () => this.readRealText());
      this.$.realText.addEventListener('keyup', () => this.readRealText())
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