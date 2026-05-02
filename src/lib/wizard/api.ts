// Wizard API client — direct fetch wrappers.
// We use direct fetch (not openapi-fetch) because the wizard endpoints are on
// plain Hono (not OpenAPIHono) — see backend src/routes/orders.ts comment.
// Re-add openapi-fetch typings if/when wizard routes get full OpenAPI annotations.

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export interface Theme {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  suitableAgeBands: string[];
  illustrationKey?: string;
  active: boolean;
}

export interface MoralValue {
  id: string;
  nameAr: string;
  nameEn: string;
  description?: string;
  suitableAgeBands: string[];
  active: boolean;
  sortOrder: number;
}

export async function createDraftOrder(
  buyerName?: string,
): Promise<string> {
  const res = await fetch(`${API_URL}/api/orders/draft`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ buyerName }),
  });
  if (!res.ok) throw new Error("Failed to create draft order");
  const data = (await res.json()) as { orderId: string };
  return data.orderId;
}

export async function patchOrder(
  orderId: string,
  patch: Record<string, unknown>,
): Promise<void> {
  const res = await fetch(`${API_URL}/api/orders/${orderId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to update order: ${error}`);
  }
}

export async function fetchOrder(orderId: string): Promise<Record<string, unknown>> {
  const res = await fetch(`${API_URL}/api/orders/${orderId}`);
  if (!res.ok) throw new Error("Failed to fetch order");
  return (await res.json()) as Record<string, unknown>;
}

export async function fetchThemes(ageBand?: string): Promise<Theme[]> {
  const url = ageBand
    ? `${API_URL}/api/catalog/themes?ageBand=${ageBand}`
    : `${API_URL}/api/catalog/themes`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch themes");
  const data = (await res.json()) as { themes: Theme[] };
  return data.themes;
}

export async function fetchMoralValues(): Promise<MoralValue[]> {
  const res = await fetch(`${API_URL}/api/catalog/moral-values`);
  if (!res.ok) throw new Error("Failed to fetch moral values");
  const data = (await res.json()) as { moralValues: MoralValue[] };
  return data.moralValues;
}

export async function uploadPhoto(
  orderId: string,
  file: File,
  ownerType: "main_child" | "supporting_character" = "main_child",
  ownerCharacterId?: string,
): Promise<{ photoId: string; url: string }> {
  const formData = new FormData();
  formData.append("file", file);
  const params = new URLSearchParams({ orderId, ownerType });
  if (ownerCharacterId) params.set("ownerCharacterId", ownerCharacterId);
  const res = await fetch(
    `${API_URL}/api/photos/upload?${params.toString()}`,
    { method: "POST", body: formData },
  );
  if (!res.ok) throw new Error("Photo upload failed");
  return (await res.json()) as { photoId: string; url: string };
}

export async function createPaymentIntent(orderId: string): Promise<{
  checkoutUrl: string;
}> {
  const res = await fetch(`${API_URL}/api/payments/intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to create payment intent: ${err}`);
  }
  return (await res.json()) as { checkoutUrl: string };
}
