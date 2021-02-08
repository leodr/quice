export function prettifyPropertyName(name: string) {
  const words = (name.match(/[A-Za-z][a-z]*/g) || []).map((s) =>
    s.toLowerCase()
  );

  const firstWord = words[0];
  words[0] = firstWord.charAt(0).toUpperCase() + firstWord.substring(1);

  return words.join(" ");
}
