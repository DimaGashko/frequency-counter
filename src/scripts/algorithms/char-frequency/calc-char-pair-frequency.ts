import _calcFrequency from "./_calc-frequency";

/**
 * Calculate frequency of two-character sequences in the text
 * @param text
 * @returns map of two-character sequences and its frequency (in range [0, 1])
 */
export default function calcCharPairFrequency(text: string): Map<string, number> {
   text = text.toLowerCase().replace(/[^a-zа-яёїієґ]+/g, '');
   const pairs = toPairs(text);

   return _calcFrequency(pairs);
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