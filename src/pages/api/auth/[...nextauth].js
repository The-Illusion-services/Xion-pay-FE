import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/login/`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const user = await response.json();
          console.log(user);

          // const decoded

          if (response.ok && user) {
            // Return user data if login is successful
            console.log(user);
            return user;
          } else {
            throw new Error(user?.message || "Invalid login credentials");
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/login",
  },
  session: {
    strategy: "jwt", // Storing session as a JWT
    maxAge: 6 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user info to token
      if (user) {
        token.accessToken = user.access_token;
        token.id = user.user_id;
        token.username = user.username;
        token.xion_address = user.xion_address
        token.email = user.email
      }
      return token;
    },
    async session({ session, token }) {
      // Make token data available in session
      session.user = {
        ...session.user,
        accessToken: token.accessToken,
        userId: token.id,
        xionAddress: token.xion_address,
        username: token.username,
        email: token.email
      };
      return session;
    },
  },
});
