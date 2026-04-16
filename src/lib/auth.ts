import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Test admin user
const testAdmin = {
  id: "1",
  name: "Admin User",
  email: "admin@premiumclean.com",
  password: "admin123", // In production, use hashed passwords
  role: "admin",
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Check test admin credentials
        if (
          credentials.email === testAdmin.email &&
          credentials.password === testAdmin.password
        ) {
          return {
            id: testAdmin.id,
            name: testAdmin.name,
            email: testAdmin.email,
            role: testAdmin.role,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || "admin";
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "dev-secret-key",
};
