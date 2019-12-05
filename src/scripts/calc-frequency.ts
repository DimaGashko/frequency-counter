interface IFrequencyOptions {

}

/**
 * Calculate character frequency
 * @param text
 * @param options
 * @returns map of character frequency where key is a char contain value in range [0, 1]
 */
export default function calcFrequency(text: string, options: IFrequencyOptions): Map<string, number> { 
   const chars = text.trim().toLowerCase().split('');
   return calcFrequencyOfChars(chars);   
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