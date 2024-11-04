'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Define the shape of the blog post data
interface BlogPost {
  id: string;
  title: string;
  description: string;
  category:string
}

// Define the props for the BlogUpdateForm component
interface BlogUpdateFormProps {
  initialData: BlogPost; // Explicitly define the type for initialData
}

// export default async function UpdateBlogForm({ id }: { id: string }) {
//     const [post, setPost] = useState<Blogdata | null>(null);
//     const router = useRouter();
export default function BlogUpdateForm({ initialData }: BlogUpdateFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || '',

  });
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Send updated data to API (replace with your actual API endpoint)
    const res = await fetch(`/api/update-blog/${initialData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Blog updated successfully!');
    } else {
      alert('Failed to update blog post.');
    }
  };
    
  function setPost(arg0: { category: string; title: any; description: any; }): void {
    throw new Error('Function not implemented.');
  }

  // useEffect(() => {
  //   const fetchPost = async () => {
  //       try {
  //         const response = await axios.get('http://localhost:3003/api/blog/blogs/' +id);
  //         setPost(response.data);
  //       } catch (error) {
  //         console.error('Error fetching post:', error);
  //         // Handle error (e.g., show error message to user)
  //       }
  //     };
  
  //     fetchPost();
  //   }, [id]);

   
     
return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Update Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-2 font-medium">
            Title
          </label>
          <input
          type="text"
          name='title'
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2 font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
            rows={4}
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-2 font-medium">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={formData.category}
            onChange={(e) => setPost({ ...formData, category: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}