import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "@/services/api";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        try {
          const res = await api.post("/users/login", {
            email: credentials.email,
            password: credentials.password,
          });

          const user = res.data;

          if (user) {
            return {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              accessToken: user.accessToken,
            };
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          throw new Error(error.response?.data?.message || error.message || "Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 21 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "super-secret-key-for-nextauth",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
