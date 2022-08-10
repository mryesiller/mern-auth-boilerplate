import create from "zustand"

export const authStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  signupFetch: async (email, password) => {
    set({ isLoading: true })

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    const json = await response.json()
    if (!response.ok) {
      set({ isLoading: false })
      set({ error: json.error })
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json))
      set({ user: json })
      set({ isLoading: false })
      set({ error: null })
    }
  },
  loginFetch: async (email, password) => {
    set({ isLoading: true })

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    const json = await response.json()
    if (!response.ok) {
      set({ isLoading: false })
      set({ error: json.error })
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json))
      set({ user: json })
      set({ isLoading: false })
      set({ error: null })
    }
  },
  logout: () => {
    localStorage.removeItem("user")
    set({ user: null })
  },
}))
