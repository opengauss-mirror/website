export function canonicalPagePath(url: string): string {
  let rest = url.replace(/^\/+/, '');
  const slash = rest.indexOf('/');
  if (slash === -1) return '';
  rest = rest.slice(slash + 1);
  return rest.replace(/\.html$/i, '').replace(/\/+$/, '');
}

export function pageLangFromUrl(url: string): string {
  const rest = url.replace(/^\/+/, '');
  const slash = rest.indexOf('/');
  return slash === -1 ? rest : rest.slice(0, slash);
}
