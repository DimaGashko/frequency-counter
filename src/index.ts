import 'normalize.scss/normalize.scss';
import './index.scss';
import calcFrequency from './scripts/calc-frequency';

const $: {[type: string]: HTMLElement} = {};
$.root = document.querySelector('.app');

(<any>window).calcFrequency = calcFrequency; 