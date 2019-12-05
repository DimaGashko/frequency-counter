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
 * Calculate character frequency
 * @param text
 * @param options
 * @returns map of characters and character frequency (in range [0, 1])
 */
export default function calcFrequency(text: string, options: IFrequencyOptions): Map<string, number> {
   options = { ...DEF_FREQUENCY_OPTIONS, ...options };
   text = prepareText(text, options);

   return calcFrequencyOfChars(text.split(''));
}

function calcFrequencyOfChars(chars: string[]): Map<string, number> {
   const charsMap: Map<string, number> = new Map();
   const frequencyMap: Map<string, number> = new Map();

   chars.forEach((char) => {
      if (charsMap.has(char)) {
         charsMap.set(char, charsMap.get(char) + 1);
      } else {
         charsMap.set(char, 1);
      }
   });

   charsMap.forEach((value, key) => {
      frequencyMap[key] = value / chars.length;
   });

   return frequencyMap;
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