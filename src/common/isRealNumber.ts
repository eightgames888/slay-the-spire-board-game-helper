function isRealNumber(str?: string | null) {
  if (str === undefined || str === null) return false;
  return isFinite(Number(str)) && !isNaN(parseFloat(str));
}

export const promptNumber = (fn: (X: number) => void) => {
  const x = window.prompt();
  if (isRealNumber(x)) {
    const X = Number(x);
    fn(X);
  }
};
