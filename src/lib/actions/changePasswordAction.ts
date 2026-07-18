'use server';

import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export async function changePasswordAction(currentPassword: string, newPassword: string) {
  const headerList = await headers();
  const session = await auth.api.getSession({ headers: headerList });

  if (!session?.user) {
    return { success: false, message: 'You must be signed in to change your password.' };
  }

  try {
    await auth.api.changePassword({
      body: {
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      },
      headers: headerList,
    });

    return { success: true, message: 'Password changed successfully. Other sessions have been signed out.' };
  } catch (error) {
    console.error('Failed to change password:', error);
    return { success: false, message: 'Current password is incorrect.' };
  }
}
