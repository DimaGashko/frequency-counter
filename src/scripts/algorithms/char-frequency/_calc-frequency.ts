
export default function _calcFrequency(arr: any[]): Map<string, number> {
   const charsMap: Map<string, number> = new Map();
   const frequencyMap: Map<string, number> = new Map();

   arr.forEach((char) => {
      if (charsMap.has(char)) {
         charsMap.set(char, charsMap.get(char) + 1);
      } else {
         charsMap.set(char, 1);
      }
   });

   charsMap.forEach((value, key) => {
      frequencyMap.set(key, value / arr.length);
   });

   return frequencyMap;
}