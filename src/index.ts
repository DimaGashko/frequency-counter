import 'normalize.scss/normalize.scss';
import './index.scss';

import calcCharPairFrequency from './scripts/algorithms/char-frequency/calc-char-pair-frequency';
import calcCharFrequency from './scripts/algorithms/char-frequency/calc-char-frequency';
import Editor from './scripts/editor';

const $: {[type: string]: HTMLElement} = {};
$.root = document.querySelector('.app');
$.editor = $.root.querySelector('.app-editor')

const editor = new Editor($.editor);

(<any>window).calcCharFrequency = calcCharFrequency; 
(<any>window).calcCharPairFrequency = calcCharPairFrequency; 