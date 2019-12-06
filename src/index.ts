import { debounce } from 'throttle-debounce';
import 'normalize.scss/normalize.scss';
import './index.scss';

import calcCharPairFrequency from './scripts/algorithms/char-frequency/calc-char-pair-frequency';
import calcCharFrequency from './scripts/algorithms/char-frequency/calc-char-frequency';
import Editor from './scripts/editor';

const $: { [type: string]: HTMLElement } = {};
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
    editor.events.addListener('input', () => {
        run();
    });

    toolbarForm.highlight.addEventListener('change', () => {
        editor.setHighlight(toolbarForm.highlight.checked);
    });

    toolbarForm.case.addEventListener('change', run);
    toolbarForm.spaces.addEventListener('change', run);
    toolbarForm.digits.addEventListener('change', run);
    toolbarForm.punctuation.addEventListener('change', run);
}

const run = debounce(500, function run() {
    const text = editor.getText();

    const frequency = calcCharFrequency(text, {
        ignoreCase: toolbarForm.case,
        spaces: !toolbarForm.spaces,
        digits: !toolbarForm.digits,
        punctuation: !toolbarForm.punctuation,
    });

    const highlightMap = frequencyToHighlightMap(frequency);
    editor.setHighlightMap(highlightMap);

    console.log(frequency)
    console.log(highlightMap);
});

function frequencyToHighlightMap(frequency: Map<string, number>) {
    const highlightMap: Map<string, string> = new Map();
    const maxFrequency = getMostFrequent(frequency).val;

    frequency.forEach((value, key) => {
        highlightMap.set(key, `rgb(${value * 255 / maxFrequency},0,0)`);
    });

    return highlightMap;
}

function getMostFrequent(frequency: Map<string, number>) {
    let val = 0;
    let key = null;

    frequency.forEach((curVal, curKey) => {
        if (val >= curVal) return;

        val = curVal;
        key = curKey;
    });

    return { val, key };
}

(<any>window).calcCharFrequency = calcCharFrequency;
(<any>window).calcCharPairFrequency = calcCharPairFrequency; 