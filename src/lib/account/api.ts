// Customer account API helpers — public order-status endpoints (no auth).
// Used by the /account pages to fetch + render the customer's books.

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export interface PublicOrderRow {
  orderId: string;
  orderStatus: string;
  childName: string | null;
  childAgeBand: string | null;
  themeTitleAr: string | null;
  generationStatus: string | null;
  coverUrl: string | null;
  pdfUrl: string | null;
  createdAt: string;
  paidAt: string | null;
  deliveredAt: string | null;
}

export interface PublicOrderStatus extends PublicOrderRow {
  moralNameAr: string | null;
  buyerName: string | null;
  buyerPhone: string | null;
  generationId: string | null;
}

export async function fetchOrdersByPhone(
  phone: string,
): Promise<PublicOrderRow[]> {
  const res = await fetch(
    `${API_URL}/api/public/orders-by-phone?phone=${encodeURIComponent(phone)}`,
  );
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      (body as { error?: string }).error ?? `HTTP ${res.status}`,
    );
  }
  const data = (await res.json()) as { orders: PublicOrderRow[] };
  return data.orders;
}

export async function fetchOrderStatus(
  orderId: string,
): Promise<PublicOrderStatus> {
  const res = await fetch(
    `${API_URL}/api/public/order-status/${encodeURIComponent(orderId)}`,
  );
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      (body as { error?: string }).error ?? `HTTP ${res.status}`,
    );
  }
  return (await res.json()) as PublicOrderStatus;
}
