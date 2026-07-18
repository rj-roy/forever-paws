'use server';

import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export async function getPostAuthRedirect(): Promise<string> {
  const headerList = await headers();
  const session = await auth.api.getSession({ headers: headerList });

  if (!session?.user) {
    return '/auth?login=true';
  }

  const role = (session.user as Record<string, unknown>).role;

  switch (role) {
    case 'shelter':
      return '/dashboard/shelter';
    case 'admin':
      return '/dashboard/admin';
    case 'adopter':
    default:
      return '/dashboard/profile';
  }
}
