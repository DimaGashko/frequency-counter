import _calcFrequency from "./_calc-frequency";

export interface ICharPairsFrequency {
   map: Map<string, number>;
   len: number;
}

/**
 * Calculate frequency of two-character sequences in the text
 * @param text
 * @returns map of two-character sequences and its frequency (in range [0, 1])
 */
export default function calcCharPairFrequency(text: string): ICharPairsFrequency {
   text = text.toLowerCase().replace(/[^a-zа-яёїієґ]+/g, '');
   const pairs = toPairs(text);

   return {
      map: _calcFrequency(pairs),
      len: pairs.length,
   }
}

function toPairs(text: string): string[] {
   const chars = text.split('');
   const pairs: string[] = [];
   const len = chars.length;

   for (let i = 0; i < len - 1; i++) {
      pairs.push(chars[i] + chars[i + 1]);
   }

   return pairs;
}