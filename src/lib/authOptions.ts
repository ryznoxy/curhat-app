import { Session, TokenSet } from "next-auth";
import githubAuth from "next-auth/providers/github";

export const authOptions = {
  providers: [
    githubAuth({
      clientId: process.env.GITHUB_CLIENT as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }: any) {
      if (account) {
        token.accessToken = token.access_token;
      }
      return token;
    },
    async session({ session, token, user }: any) {
      if (user) {
        session.user.id = user.id;
        token;
        user;
      }

      return {
        user: { ...session.user, uuid: token.sub },
        expires: session.expires,
      };
    },
  },
};
