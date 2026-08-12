const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://127.0.0.1:8000/api";

class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data: any) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = "ApiError";
  }
}

async function request(path: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers || {});
  
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  
  headers.set("Accept", "application/json");

  // Get token from localStorage
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("resumeflow_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  let data = null;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = { message: await response.text() };
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data.message || `API request failed with status ${response.status}`,
      data
    );
  }

  return data;
}

export const api = {
  auth: {
    async register(name: string, email: string, password: string) {
      return request("/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
    },

    async verifyEmail(email: string, code: string) {
      return request("/verify-email", {
        method: "POST",
        body: JSON.stringify({ email, code }),
      });
    },

    async resendVerification(email: string) {
      return request("/resend-verification", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
    },

    async login(email: string, password: string) {
      const response = await request("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // If login returns access_token directly (no 2FA required), save it
      if (response.access_token && typeof window !== "undefined") {
        localStorage.setItem("resumeflow_token", response.access_token);
        localStorage.setItem("resumeflow_user", JSON.stringify(response.user));
      }

      return response;
    },

    async verify2fa(twoFactorToken: string, code: string) {
      const response = await request("/verify-2fa", {
        method: "POST",
        body: JSON.stringify({ two_factor_token: twoFactorToken, code }),
      });

      if (response.access_token && typeof window !== "undefined") {
        localStorage.setItem("resumeflow_token", response.access_token);
        localStorage.setItem("resumeflow_user", JSON.stringify(response.user));
      }

      return response;
    },

    async forgotPassword(email: string) {
      return request("/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
    },

    async resetPassword(email: string, code: string, password: string) {
      return request("/reset-password", {
        method: "POST",
        body: JSON.stringify({ email, code, password }),
      });
    },

    async logout() {
      try {
        await request("/logout", { method: "POST" });
      } catch (e) {
        console.error("Logout request failed:", e);
      } finally {
        if (typeof window !== "undefined") {
          localStorage.removeItem("resumeflow_token");
          localStorage.removeItem("resumeflow_user");
        }
      }
    },

    async user() {
      const user = await request("/user", { method: "GET" });
      if (typeof window !== "undefined") {
        localStorage.setItem("resumeflow_user", JSON.stringify(user));
      }
      return user;
    },

    async setup2fa() {
      return request("/2fa/setup", { method: "POST" });
    },

    async enable2fa(code: string) {
      return request("/2fa/enable", {
        method: "POST",
        body: JSON.stringify({ code }),
      });
    },

    async disable2fa(password: string) {
      return request("/2fa/disable", {
        method: "POST",
        body: JSON.stringify({ password }),
      });
    },
  },
};
