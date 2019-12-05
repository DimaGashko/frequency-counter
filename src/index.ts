import 'normalize.scss/normalize.scss';
import './index.scss';

import calcCharPairFrequency from './scripts/algorithms/char-frequency/calc-char-pair-frequency';
import calcCharFrequency from './scripts/algorithms/char-frequency/calc-char-frequency';
import Editor from './scripts/editor';

const $: {[type: string]: HTMLElement} = {};
$.root = document.querySelector('.app');
$.editor = $.root.querySelector('.app-editor')

const toolbarForm: HTMLFormElement = $.root.querySelector('.app-toolbar__form');

const editor = new Editor($.editor);

init();
initEvents();

function init() {
    editor.setHighlight(toolbarForm.highlight.checked);
}

function initEvents() { 
    toolbarForm.highlight.addEventListener('change', () => {
        editor.setHighlight(toolbarForm.highlight.checked);
    });

    toolbarForm.case.addEventListener('change', run);
    toolbarForm.spaces.addEventListener('change', run);
    toolbarForm.digits.addEventListener('change', run);
    toolbarForm.punctuation.addEventListener('change', run);
}

function run() {
    const text = editor.getText();

    const frequency = calcCharFrequency(text, {
        ignoreCase: toolbarForm.case,
        spaces: !toolbarForm.spaces,
        digits: !toolbarForm.digits,
        punctuation: !toolbarForm.punctuation,
    });
    
    console.log(frequency);
}

(<any>window).calcCharFrequency = calcCharFrequency; 
(<any>window).calcCharPairFrequency = calcCharPairFrequency; 