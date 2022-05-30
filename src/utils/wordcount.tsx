const CHUNK_SIZE = 100; // How many characters we check before setTimeout

function isLetter(character: string) {
  return /\p{Letter}/u.test(character);
}

/* There is ABSOLUTELY no need for this to be async, but I wanted to do it this way */
export default async function countWords(text: string) {
  if (!text || !text.length) {
    return 0;
  }

  return new Promise((resolve) => {
    let count = 0;
    let index = 0;
    (function loop(): void {
      index += 1;

      /* Add word count When we transition from letter to non-letter, */
      /* or if we are at the last character and it is a letter */
      if (isLetter(text[index - 1]) && (index === text.length || !isLetter(text[index]))) {
        count += 1;
      }

      if (index === text.length) {
        return resolve(count);
      }

      /* Every CHUNK_SIZE of the loop, we cease the control to the main thread if it needs it */
      if (index % CHUNK_SIZE === 0) {
        setTimeout(loop, 0);
        return null;
      }

      return loop();
    }());
  });
}
