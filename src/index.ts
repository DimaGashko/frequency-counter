import { debounce } from 'throttle-debounce';
import 'normalize.scss/normalize.scss';
import './index.scss';

import Editor from './scripts/Editor';
import Chart from 'chart.js';
import Frequency from './scripts/Frequency';

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

const frequency = new Frequency();
const editor = new Editor($.editor);

const chartOptions: Chart.ChartOptions = {
    maintainAspectRatio: false,
    legend: {
        display: false,
    }
}

let frequencyChart = null;

const run = debounce(500, () => {
    updateFrequency();
    editor.setHighlightMap(frequency.charColors);
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
    frequency.update(editor.getText(), {
        ignoreCase: toolbarForm.case.checked,
        spaces: !toolbarForm.spaces.checked,
        digits: !toolbarForm.digits.checked,
        punctuation: !toolbarForm.punctuation.checked,
    });
}

function updateSummary() {
    $.total.innerHTML = frequency.char.len + '';
    $.uniqueChars.innerHTML = frequency.char.map.size + '';
    $.uniquePairs.innerHTML = frequency.pair.map.size + '';
}

function formatValue(value: number) {
    return +(value * 100).toFixed(2);
}

function updateFrequencyChart() {
    console.log('hi');

    const entries = Array.from(frequency.char.map.entries());
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
                    return `rgb(${val * 255 / frequency.mostFrequentChar.val / 100},0,0)`;
                },
                data,
            }]
        },
        options: chartOptions,
    });
}