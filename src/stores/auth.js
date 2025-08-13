import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        token: null
    }),

    actions: {
        async login(username, password) {
            try {
                const credentials = { username, password };

                const res = await fetch("https://fakestoreapi.com/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(credentials)
                });

                if (!res.ok) {
                    throw new Error(`Login failed: ${res.statusText}`);
                }

                const data = await res.json();

                if (data.token) {
                    this.user = { username }; 
                    this.token = data.token;
                    localStorage.setItem("auth", JSON.stringify({
                        username,
                        token: data.token
                    }));
                } else {
                    throw new Error("Invalid login response");
                }

            } catch (err) {
                console.error("Login error:", err);
                throw err;
            }
        },

        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem("auth");
        },

        loadFromStorage() {
            const stored = localStorage.getItem("auth");
            if (stored) {
                const parsed = JSON.parse(stored);
                this.user = { username: parsed.username };
                this.token = parsed.token;
            }
        }
    }
});
