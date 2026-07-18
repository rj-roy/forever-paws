'use server';

import { revalidatePath } from 'next/cache';

export async function deletePetAction(petId: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/pets/delete/${petId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Failed to delete pet');
    }

    revalidatePath('/dashboard/shelter/manage-pets');
    return { success: true };
  } catch (error) {
    console.error('Delete error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to delete pet' };
  }
}
