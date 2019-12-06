import { debounce } from 'throttle-debounce';
import 'normalize.scss/normalize.scss';
import './index.scss';

import calcCharPairFrequency, { ICharPairsFrequency } from './scripts/algorithms/char-frequency/calc-char-pair-frequency';
import calcCharFrequency, { ICharFrequency } from './scripts/algorithms/char-frequency/calc-char-frequency';
import Editor from './scripts/Editor';

const $: { [type: string]: HTMLElement } = {};
$.root = document.querySelector('.app');
$.editor = $.root.querySelector('.app-editor')
$.total = $.root.querySelector('.app-res__total');
$.uniqueChars = $.root.querySelector('.app-res__unique-chars');
$.uniquePairs = $.root.querySelector('.app-res__unique-pairs')

const toolbarForm: HTMLFormElement = $.root.querySelector('.app-toolbar__form');

const editor = new Editor($.editor);

let frequency: ICharFrequency = null;
let pairsFrequency: ICharPairsFrequency = null;
let text = '';

const run = debounce(500, () => {
    text = editor.getText();
    updateFrequency();
    updateColors();
    updateSummary();
});

init();
initEvents();
run();

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

function updateFrequency() {
    frequency = calcCharFrequency(text, {
        ignoreCase: toolbarForm.case.checked,
        spaces: !toolbarForm.spaces.checked,
        digits: !toolbarForm.digits.checked,
        punctuation: !toolbarForm.punctuation.checked,
    });

    pairsFrequency = calcCharPairFrequency(text);
}

function updateColors() {
    const highlightMap = frequencyToHighlightMap(frequency.map);
    editor.setHighlightMap(highlightMap);
}

function updateSummary() {
    $.total.innerHTML = frequency.len + '';
    $.uniqueChars.innerHTML = frequency.map.size + '';
    $.uniquePairs.innerHTML = pairsFrequency.map.size + '';
}

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