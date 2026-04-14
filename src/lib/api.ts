import type { ErrorDetail } from "@/types";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: ErrorDetail[],
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  error: string;
  details?: ErrorDetail[];
}

export interface FetchOptions extends RequestInit {
  timeout?: number;
}

export async function fetchApi<T>(
  url: string,
  options: FetchOptions = {},
): Promise<T> {
  const { timeout = 10000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      let details: ErrorDetail[] | undefined;

      try {
        const errorData = (await response.json()) as ApiErrorResponse;
        errorMessage = errorData.error || errorMessage;
        details = errorData.details;
      } catch {
        // Ignore JSON parse errors for non-JSON responses
      }

      throw new ApiError(response.status, errorMessage, details);
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error && error.name === "AbortError") {
      throw new ApiError(408, "Request timeout");
    }

    throw new ApiError(0, "Network error or unexpected failure");
  }
}

export function createSuccessResponse<T>(
  data: T,
  message?: string,
  status = 200,
): Response {
  return Response.json(
    { data, ...(message && { message }) } satisfies ApiResponse<T>,
    { status },
  );
}

export function createErrorResponse(
  error: string,
  status = 500,
  details?: ErrorDetail[],
): Response {
  return Response.json({ error, ...(details && { details }) }, { status });
}

export async function createApiRoute<T>(
  handler: () => Promise<T>,
): Promise<Response> {
  try {
    const data = await handler();
    return createSuccessResponse(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return createErrorResponse(message, 500);
  }
}
