const base64UrlEncode = (value) =>
  btoa(unescape(encodeURIComponent(JSON.stringify(value))))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

const base64UrlDecode = (value) => {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(decodeURIComponent(escape(atob(base64))));
};

// Demonstration only: this token mimics JWT shape but is not cryptographically signed.
export function createMockJwt(user) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode({ alg: 'none', typ: 'JWT' });
  const payload = base64UrlEncode({
    sub: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    iat: now,
    exp: now + 60 * 60,
  });
  return `${header}.${payload}.mock-signature`;
}

export function decodeMockJwt(token) {
  try {
    const [, payload] = token.split('.');
    const decoded = base64UrlDecode(payload);
    if (!decoded.exp || decoded.exp * 1000 < Date.now()) return null;
    return decoded;
  } catch {
    return null;
  }
}
