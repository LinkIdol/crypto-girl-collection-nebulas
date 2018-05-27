

export function isChrome() {
  if (typeof window !== 'undefined') {
    const userAgent = navigator.userAgent.toLowerCase();
    // eslint-disable-next-line
    if (userAgent.match(/chrome\/([\d\.]+)/)) {
      return true;
    }
  }
  return false;
}

export function randomCode(len) {
  let d;
  let e;

  const b = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let c = '';
  for (d = 0; len > d; d += 1) {
    e = Math.random() * b.length;
    e = Math.floor(e);
    c += b.charAt(e);
  }
  return c;
}
