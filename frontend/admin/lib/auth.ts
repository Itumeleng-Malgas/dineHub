import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, { AuthOptions, DefaultSession } from 'next-auth';
import axios from 'axios';

type UserProfile = {
  id: string;
  name: string;
  email: string;
  expire?: string;
  provider?: string;
};

declare module 'next-auth' {
  interface Session {
    user: UserProfile & DefaultSession["user"];
  }
}

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        rememberMe: { label: 'Remember Me', type: 'checkbox' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await getUser(credentials.email as string, credentials.password as string);
        if (user) {
          // Calculate expires date based on rememberMe checkbox
          const expires = credentials.rememberMe ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : undefined;

          return {
            ...user,
            expires,
          };
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.provider = "google"; // Example: 'google'
  
        // You can fetch additional user information
      } else if (user) {
        // Credentials login
        token.id = user.id;
        token.email = user.email;
        token.provider = 'credentials'; // Set a specific value for credentials login
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          provider: token.provider as string,
        };
        session.expires = token.expires as string;
      }
      return session;
    }, 
  }, 
};

// Function to fetch user from API using axios
async function getUser(email: string, password: string): Promise<UserProfile | null> {
  try {
    const response = await axios.post('http://localhost:3001/api/v1/auth/login', { email, password });
    const user: UserProfile = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
    };
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
