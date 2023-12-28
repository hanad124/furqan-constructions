// import type { NextAuthConfig } from "next-auth";

// export const authConfig = {
//   providers: [],
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = auth?.user;
//       const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL("/dashboard", nextUrl));
//       }
//     },
//   },
// };

// import type { NextAuthConfig } from "next-auth";

// export const authConfig = {
//   providers: [],
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       console.log("isLoggedIn", isLoggedIn);
//       const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL("/dashboard", nextUrl));
//       }
//       return true;
//     },
//   },
// } as NextAuthConfig;

import { auth as userAuth } from "@/auth";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async authorized({ auth, request }) {
      const user = await userAuth();
      // console.log("user", user?.user?.role);
      const isAdmin = user?.user?.role === "admin";
      const isLoggedIn = auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        if (isLoggedIn) {
          // Allow access to specific routes for non-admin users
          if (!isAdmin) {
            const allowedRoutes = [
              "/dashboard/customers",
              "/dashboard/newCustomer",
              "/dashboard/invoices/cash",
              "/dashboard/invoices/cash/create-invoice",
              "/dashboard/invoices/cash/preview/[id]",
              "/dashboard/invoices/cash/update/[id]",
            ];
            if (allowedRoutes.includes(request.nextUrl.pathname)) {
              return true;
            } else {
              return Response.redirect(
                new URL("/dashboard/customers", request.nextUrl)
              );
              // Redirect non-admin users to unauthorized page
            }
          }
          return true; // Allow access to admin users for all dashboard routes
        } else {
          return false; // Redirect unauthenticated users to login page
        }
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }
      return true;
    },
  },
};
