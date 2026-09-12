export function createJsonRequest(
  body: unknown,
  init: RequestInit & { origin?: string } = {}
) {
  const headers = new Headers(init.headers);
  headers.set("content-type", "application/json");

  if (init.origin) {
    headers.set("origin", init.origin);
  }

  return new Request("http://localhost:3000/api/chat", {
    ...init,
    method: init.method ?? "POST",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}