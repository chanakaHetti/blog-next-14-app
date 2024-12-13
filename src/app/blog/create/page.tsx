'use client';

import { useFormState } from 'react-dom';

import { createPost } from '@/actions/create-post';

export default function CreatePostPage() {
  const [formState, action] = useFormState(createPost, { errors: {} });

  return (
    <div className="container mx-auto px-4 py-8">
      <form action={action} className="max-w-xl mx-auto">
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            name="title"
            placeholder="Title"
            className="w-full px-3 py-2 border rounded"
          />
          {formState.errors.title && (
            <p className="text-red-500">{formState.errors.title?.join(', ')}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Content</label>
          <input
            name="content"
            placeholder="Content"
            className="w-full px-3 py-2 border rounded"
          />
          {formState.errors.content && (
            <p className="text-red-500">
              {formState.errors.content?.join(', ')}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Author</label>
          <input
            name="author"
            placeholder="Author"
            className="w-full px-3 py-2 border rounded"
          />
          {formState.errors.author && (
            <p className="text-red-500">
              {formState.errors.author?.join(', ')}
            </p>
          )}
        </div>

        {formState.errors._form ? (
          <div className="p-2 bg-red-200 border-red-400 rounded">
            {formState.errors._form?.join(', ')}{' '}
          </div>
        ) : null}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
