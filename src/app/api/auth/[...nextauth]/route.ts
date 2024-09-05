import nextAuth from "next-auth";
import githubAuth from "next-auth/providers/github";

const authOptions = {
  providers: [
    githubAuth({
      clientId: process.env.GITHUB_CLIENT || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
