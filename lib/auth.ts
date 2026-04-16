import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Complete set of demo users — admin, manager, AND customers all work
const DEMO_USERS = [
  {
    id: "admin-001",
    name: "Alex Rivera",
    email: "admin@cleanopsai.com",
    password: "Admin123!",
    role: "ADMIN",
    orgId: "org-001",
    orgName: "Pristine Pro Cleaning",
  },
  {
    id: "manager-001",
    name: "Jordan Blake",
    email: "manager@cleanopsai.com",
    password: "Manager123!",
    role: "MANAGER",
    orgId: "org-001",
    orgName: "Pristine Pro Cleaning",
  },
  // Customer accounts — these all work for login
  {
    id: "customer-001",
    name: "Sarah Mitchell",
    email: "sarah@example.com",
    password: "Customer123!",
    role: "CUSTOMER",
    orgId: "org-001",
    orgName: "Pristine Pro Cleaning",
  },
  {
    id: "customer-002",
    name: "James Okafor",
    email: "james@example.com",
    password: "Customer123!",
    role: "CUSTOMER",
    orgId: "org-001",
    orgName: "Pristine Pro Cleaning",
  },
  {
    id: "customer-003",
    name: "Chen Wei",
    email: "chen@example.com",
    password: "Customer123!",
    role: "CUSTOMER",
    orgId: "org-001",
    orgName: "Pristine Pro Cleaning",
  },
];

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login", error: "/login" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Check all demo users — customers included
        const demo = DEMO_USERS.find(
          (u) =>
            u.email.toLowerCase() === credentials.email.toLowerCase() &&
            u.password === credentials.password
        );

        if (demo) {
          return {
            id: demo.id,
            name: demo.name,
            email: demo.email,
            role: demo.role,
            orgId: demo.orgId,
            orgName: demo.orgName,
          } as any;
        }

        // Production: check DB
        if (process.env.DEMO_MODE !== "true") {
          try {
            const { PrismaClient } = await import("@prisma/client");
            const bcrypt = await import("bcryptjs");
            const db = new PrismaClient();
            const user = await db.user.findUnique({
              where: { email: credentials.email },
              include: { org: true },
            });
            if (!user?.hashedPassword) return null;
            const valid = await bcrypt.compare(
              credentials.password,
              user.hashedPassword
            );
            if (!valid) return null;
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              orgId: user.orgId,
              orgName: user.org?.name,
            } as any;
          } catch {
            return null;
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.orgId = (user as any).orgId;
        token.orgName = (user as any).orgName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).role = token.role;
        (session.user as any).orgId = token.orgId;
        (session.user as any).orgName = token.orgName;
      }
      return session;
    },
  },
};
