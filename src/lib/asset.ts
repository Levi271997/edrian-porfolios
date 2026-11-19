/**
 * Files in /public are not prefixed with `basePath` automatically, so a
 * GitHub Pages build (served from /<repo>) needs the prefix added by hand.
 */
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${base}${path}`;
