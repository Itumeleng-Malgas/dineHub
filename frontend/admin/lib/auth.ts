import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, { AuthOptions } from 'next-auth';
import bcrypt from 'bcryptjs';
import axios from 'axios';

type User = {
  id: string;
  name: string;
  email: string;
};

export async function hashPass(unHashPass: string) {
  return await bcrypt.hash(unHashPass, 10);
}

async function verifyPass(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

async function getUser(email: string, password: string): Promise<any> {
  try {
    const user = await axios.post('http://localhost:3001/api/v1/auth/login', { email, password });
    console.log(user.data)
    if(await verifyPass(password, user.data.password)){
      return user;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await getUser(credentials.email as string, credentials.password as string);
        return user ?? null;
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
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };