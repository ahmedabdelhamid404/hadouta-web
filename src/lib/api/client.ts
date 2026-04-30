import createClient from "openapi-fetch";
import type { paths } from "./api-types";

/**
 * Type-safe API client for the Hadouta backend.
 *
 * The `paths` type is auto-generated from the backend's OpenAPI spec via
 * `pnpm sync-types`. Run that command whenever the backend's Zod schemas
 * change so the frontend's types stay in lockstep.
 *
 * Usage:
 *   import { apiClient } from "@/lib/api/client";
 *   const { data, error, response } = await apiClient.POST("/waitlist", {
 *     body: { email, phone, name, source },
 *   });
 */
export const apiClient = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001",
  // Send cookies for Better-Auth sessions later (Sprint 2+).
  credentials: "include",
});
