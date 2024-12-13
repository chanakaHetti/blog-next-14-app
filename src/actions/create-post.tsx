'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const createPostScheme = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  author: z.string().min(2, 'Author name is required'),
  slug: z.string(),
  published: z.boolean().optional().default(false),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    author?: string[];
    _form?: string[];
  };
}

export async function createPost(
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const result = createPostScheme.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    author: formData.get('author'),
    slug:
      (formData.get('title') as string)?.toLowerCase().replace(/ /g, '-') ||
      'deault-slug',
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        author: result.data.author,
        slug: result.data.slug,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    }

    return {
      errors: {
        _form: ['Something went wrong!'],
      },
    };
  }

  // Revalidate the topic show page
  revalidatePath('/blog/create');
  redirect('/blog');
}
