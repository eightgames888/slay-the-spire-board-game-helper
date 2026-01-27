export const uuid = () => {
  const timestamp = Date.now().toString(36);
  const microtime = performance.now().toString(36).replace(".", "");
  const random1 = Math.random().toString(36).substring(2, 10);
  const random2 = Math.random().toString(36).substring(2, 10);

  return `${timestamp}-${microtime}-${random1}${random2}`.toUpperCase();
};
