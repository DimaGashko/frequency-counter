import _calcFrequency from "./_calc-frequency";

export interface ICharFrequency {
   map: Map<string, number>;
   len: number;
}

export interface ICharFrequencyOptions {
   ignoreCase?: boolean;
   spaces?: boolean;
   digits?: boolean;
   punctuation?: boolean;
}

const DEF_FREQUENCY_OPTIONS: ICharFrequencyOptions = {
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
export default function calcCharFrequency(text: string, options?: ICharFrequencyOptions): ICharFrequency {   
   options = { ...DEF_FREQUENCY_OPTIONS, ...options || {} };
   text = prepareText(text, options);

   return {
      map: _calcFrequency(text.split('')),
      len: text.length,
   }
}

function prepareText(text: string, options: ICharFrequencyOptions): string {
   const { ignoreCase, spaces, digits, punctuation } = options;

   text = text.trim();

   if (ignoreCase) text = text.toLowerCase();
   if (!spaces) text = text.replace(/\s+/g, '')
   if (!digits) text = text.replace(/\d+/g, '');

   if (!punctuation) {
      text = text.replace(/[.,\/#!$\?%\^&\*";:{}=\-_`~()\[\]]+/g, '');
   }

   return text;
}