import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ApiError,
  createErrorResponse,
  createSuccessResponse,
  fetchApi,
} from "@/lib/api";

describe("api", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("ApiError", () => {
    it("creates error with status and message", () => {
      const error = new ApiError(404, "Not Found");
      expect(error.status).toBe(404);
      expect(error.message).toBe("Not Found");
      expect(error.name).toBe("ApiError");
    });

    it("creates error with details", () => {
      const details = [{ field: "email", message: "Invalid email" }];
      const error = new ApiError(400, "Validation error", details);
      expect(error.details).toEqual(details);
    });
  });

  describe("fetchApi", () => {
    it("fetches data successfully", async () => {
      const mockData = { id: 1, name: "Test" };
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      const result = await fetchApi("https://api.example.com/data");
      expect(result).toEqual(mockData);
    });

    it("throws ApiError on non-OK response", async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
        json: async () => ({ error: "Resource not found" }),
      } as Response);

      await expect(
        fetchApi("https://api.example.com/notfound"),
      ).rejects.toThrow(ApiError);
    });

    it.skip("throws timeout error after timeout", async () => {});

    it("sets correct headers", async () => {
      const mockData = { test: "data" };
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      await fetchApi("https://api.example.com/data", {
        headers: { Authorization: "Bearer token" },
      });

      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.example.com/data",
        expect.objectContaining({
          headers: expect.objectContaining({
            "Content-Type": "application/json",
            Authorization: "Bearer token",
          }),
        }),
      );
    });
  });

  describe("createSuccessResponse", () => {
    it("creates success response with data", () => {
      const data = { id: 1 };
      const response = createSuccessResponse(data);

      expect(response.status).toBe(200);
      expect(response).toBeInstanceOf(Response);
    });

    it("creates success response with data and message", () => {
      const data = { id: 1 };
      const response = createSuccessResponse(data, "Created successfully");

      expect(response.status).toBe(200);
    });

    it("creates success response with custom status", () => {
      const data = { id: 1 };
      const response = createSuccessResponse(data, "Created", 201);

      expect(response.status).toBe(201);
    });
  });

  describe("createErrorResponse", () => {
    it("creates error response", () => {
      const response = createErrorResponse("Server error");

      expect(response.status).toBe(500);
      expect(response).toBeInstanceOf(Response);
    });

    it("creates error response with custom status", () => {
      const response = createErrorResponse("Not found", 404);

      expect(response.status).toBe(404);
    });

    it("creates error response with details", () => {
      const details = [{ field: "email", message: "Invalid" }];
      const response = createErrorResponse("Validation error", 400, details);

      expect(response.status).toBe(400);
    });
  });
});
