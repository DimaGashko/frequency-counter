import { debounce } from 'throttle-debounce';
import 'normalize.scss/normalize.scss';
import './index.scss';

import calcCharPairFrequency, { ICharPairsFrequency } from './scripts/algorithms/char-frequency/calc-char-pair-frequency';
import calcCharFrequency, { ICharFrequency } from './scripts/algorithms/char-frequency/calc-char-frequency';
import Editor from './scripts/Editor';
import Chart from 'chart.js';

const $: { [type: string]: HTMLElement } = {};
$.root = document.querySelector('.app');
$.editor = $.root.querySelector('.app-editor')
$.total = $.root.querySelector('.app-res__total');
$.uniqueChars = $.root.querySelector('.app-res__unique-chars');
$.uniquePairs = $.root.querySelector('.app-res__unique-pairs')

const toolbarForm: HTMLFormElement = $.root.querySelector('.app-toolbar__form');

const $frequencyChart: HTMLCanvasElement = $.root.querySelector('.app-res__frequency-chart');
const $pairsFrequencyChart: HTMLCanvasElement = $.root.querySelector('.app-res__pairs-frequency-chart');

const frequencyChartCtx = $frequencyChart.getContext('2d');
const pairsFrequencyChartCtx = $pairsFrequencyChart.getContext('2d');

const editor = new Editor($.editor);

const chartOptions: Chart.ChartOptions = {
    maintainAspectRatio: false,
    legend: {
        display: false,
    }
}

let frequency: ICharFrequency = null;
let pairsFrequency: ICharPairsFrequency = null;
let text = '';

let maxFrequency = 1;

let frequencyChart = null;

const run = debounce(500, () => {
    text = editor.getText();
    updateFrequency();
    updateColors();
    updateSummary();
    updateFrequencyChart();
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
    maxFrequency = getMostFrequent(frequency).val;

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

function formatValue(value: number) {
    return +(value * 100).toFixed(2);
}

function updateFrequencyChart() {
    console.log('hi');

    const entries = Array.from(frequency.map.entries());
    entries.sort((a, b) => b[1] - a[1]);

    const labels = entries.map(e => e[0]);
    const data = entries.map(e => e[1]).map(v => formatValue(v));

    if (frequencyChart) {
        frequencyChart.data.labels = labels;
        frequencyChart.data.datasets[0].data = data;
        frequencyChart.update();
        return;
    }

    frequencyChart = new Chart(frequencyChartCtx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                backgroundColor: ({ dataIndex, dataset }) => {
                    const val = <number>dataset.data[dataIndex];
                    return `rgb(${val * 255 / maxFrequency/ 100},0,0)`;
                },
                data,
            }]
        },
        options: chartOptions,
    });
}