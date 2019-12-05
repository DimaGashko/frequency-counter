import _calcFrequency from "./_calc-frequency";

interface IFrequencyOptions {
   ignoreCase: boolean;
   spaces: boolean;
   digits: boolean;
   punctuation: boolean;
}

const DEF_FREQUENCY_OPTIONS: IFrequencyOptions = {
   ignoreCase: true,
   spaces: false,
   digits: false,
   punctuation: false,
}

/**
 * Calculate character frequency in the text
 * @param text
 * @param options
 * @returns map of characters and character frequency (in range [0, 1])
 */
export default function calcCharFrequency(text: string, options: IFrequencyOptions): Map<string, number> {
   options = { ...DEF_FREQUENCY_OPTIONS, ...options };
   text = prepareText(text, options);

   return _calcFrequency(text.split(''));
}

function prepareText(text: string, options: IFrequencyOptions): string {
   const { ignoreCase, spaces, digits, punctuation } = options;

   text = text.trim();

   if (ignoreCase) text = text.toLowerCase();
   if (!spaces) text = text.replace(/\s+/g, '')
   if (!digits) text = text.replace(/\d+/g, '');

   if (!punctuation) {
      text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]+/g, '');
   }

   return text;
}