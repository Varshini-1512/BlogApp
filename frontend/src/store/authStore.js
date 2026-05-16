import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import BASE_URL from "../components/config/BaseApi";

export const useAuth = create(
  persist(
    (set) => ({

      loading: false,
      error: null,
      isAuthenticated: false,
      currentUser: null,

      // LOGIN
      login: async (userCredObj) => {
        try {

          set({
            loading: true,
            error: null
          });

          const res = await axios.post(
            `${BASE_URL}/common-api/login`,
            userCredObj,
            { withCredentials: true }
          );

          console.log("LOGIN SUCCESS:", res.data);

          set({
            loading: false,
            isAuthenticated: true,
            currentUser: {
  _id: res.data.payload._id || res.data.payload.userId,
  ...res.data.payload
},
            error: null
          });

          return {
            success: true
          };

        } catch (err) {

          console.log("LOGIN ERROR:", err);

          set({
            loading: false,
            isAuthenticated: false,
            currentUser: null,
            error: err.response?.data?.error || "Login failed"
          });

          return {
            success: false
          };
        }
      },

      // LOGOUT
      logout: async () => {
        try {

          set({
            loading: true,
            error: null
          });

          await axios.get(
            `${BASE_URL}/common-api/logout`,
            { withCredentials: true }
          );

          set({
            loading: false,
            isAuthenticated: false,
            currentUser: null,
            error: null
          });

        } catch (err) {

          set({
            loading: false,
            isAuthenticated: false,
            currentUser: null,
            error: err.response?.data?.error || "Logout failed"
          });
        }
      },

      // CHECK AUTH AFTER REFRESH
      checkAuth: async () => {
        try {

          set({
            loading: true,
            error: null
          });

          const res = await axios.get(
            `${BASE_URL}/common-api/check-auth`,
            { withCredentials: true }
          );

          console.log("CHECK AUTH SUCCESS:", res.data);

          set({
            loading: false,
            isAuthenticated: true,
            currentUser: {
  _id: res.data.payload._id || res.data.payload.userId,
  ...res.data.payload
},
            error: null
          });

        } catch (err) {

          console.log("CHECK AUTH ERROR:", err);

          set({
            loading: false,
            isAuthenticated: false,
            currentUser: null,
            error: err.response?.data?.error
          });
        }
      },

      // CHANGE PASSWORD
      changepassword: async (userCredObj) => {

        try {

          set({
            loading: true,
            error: null
          });

          const res = await axios.put(
            `${BASE_URL}/common-api/change-password`,
            userCredObj,
            { withCredentials: true }
          );

          set({
            loading: false,
            error: null
          });

          return {
            success: true,
            message: res.data.message
          };

        } catch (err) {

          set({
            loading: false,
            error: err.response?.data?.error || "Password change failed"
          });

          return {
            success: false,
            message: err.response?.data?.error || "Password change failed"
          };
        }
      }

    }),
    {
      name: "auth-storage"
    }
  )
);