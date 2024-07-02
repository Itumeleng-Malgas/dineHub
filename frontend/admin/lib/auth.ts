import GoogleProvider from "next-auth/providers/google";
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

async function getUser(email: string): Promise<User | null> {

  //checkemail will verify if email exist
  //handle encryption
  try {
    // Mock user data
    return {
      id: '1',
      name: 'test user',
      email: email,
      password: "$2y$10$lm1rfrsvUZoIo4C5Wbp17OUY1B7croebOdXcv6m.rgX7BDcZ6KjG.", // hashed password
    };
  } catch (error) {
    return null;
  }
}

const handler = NextAuth({
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await getUser(credentials.email as string);
        
        if (!user) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(credentials.password as string, user.password);
        
        if (passwordsMatch) {
          return user;
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
});

export { handler as GET, handler as POST };
