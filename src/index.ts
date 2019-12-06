import { debounce } from 'throttle-debounce';
import 'normalize.scss/normalize.scss';
import './index.scss';

import Editor from './scripts/Editor';
import Frequency from './scripts/Frequency';
import Res from './scripts/Res';

const $: { [type: string]: HTMLElement } = {};
$.root = document.querySelector('.app');
$.editor = $.root.querySelector('.app-editor')
$.res = $.root.querySelector('.app-res');

const toolbarForm: HTMLFormElement = $.root.querySelector('.app-toolbar__form');

const frequency = new Frequency();
const editor = new Editor($.editor);
const res = new Res($.res, frequency);

const update = debounce(500, () => {
    updateFrequency();

    editor.setHighlight(toolbarForm.highlight.checked);
    editor.setHighlightMap(frequency.charColors);
});

update();
initEvents();

function initEvents() {
    editor.events.addListener('input', () => {
        update();
    });

    toolbarForm.highlight.addEventListener('change', () => {
        editor.setHighlight(toolbarForm.highlight.checked);
    });

    toolbarForm.case.addEventListener('change', update);
    toolbarForm.spaces.addEventListener('change', update);
    toolbarForm.digits.addEventListener('change', update);
    toolbarForm.punctuation.addEventListener('change', update);
}

function updateFrequency() {
    frequency.update(editor.getText(), {
        ignoreCase: toolbarForm.case.checked,
        spaces: !toolbarForm.spaces.checked,
        digits: !toolbarForm.digits.checked,
        punctuation: !toolbarForm.punctuation.checked,
    });
}