'use server';

import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { uploadImage } from '@/lib/cloudinary';

export async function updateProfileAction(formData: FormData) {
  const headerList = await headers();
  const session = await auth.api.getSession({ headers: headerList });

  if (!session?.user) {
    return { success: false, message: 'You must be signed in to update your profile.' };
  }

  const name = formData.get('name') as string | null;
  const phone = formData.get('phone') as number | null;
  const city = formData.get('city') as string | null;
  const state = formData.get('state') as string | null;
  const bio = formData.get('bio') as string | null;
  const imageFile = formData.get('profileImage') as File | null;

  const updateData: Record<string, unknown> = {};

  if (name) updateData.name = name;
  if (phone) updateData.phone = Number(phone) || null;
  if (city !== null) updateData.city = city;
  if (state !== null) updateData.state = state;
  if (bio !== null) updateData.bio = bio;

  if (imageFile && imageFile.size > 0) {
    try {
      const imageUrl = await uploadImage(imageFile);
      updateData.profileImage = imageUrl;
    } catch (error) {
      console.error('Cloudinary upload failed:', error);
      return { success: false, message: 'Failed to upload profile image. Please try again.' };
    }
  }

  if (Object.keys(updateData).length === 0) {
    return { success: false, message: 'No changes to save.' };
  }

  try {
    await auth.api.updateUser({
      body: updateData as Record<string, unknown>,
      headers: headerList,
    });

    revalidatePath('/dashboard/profile');
    return { success: true, message: 'Profile updated successfully!' };
  } catch (error) {
    console.error('Failed to update profile:', error);
    return { success: false, message: 'Failed to update profile. Please try again.' };
  }
}
