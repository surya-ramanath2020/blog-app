import { useState } from 'react';
import axios from 'axios';

interface BlogData {
  title: string;
  category: string;
  description: string;
}

interface UpdateBlogButtonProps {
  blogId: string;
  initialData: BlogData;
  onUpdate: () => void;
}

export default function UpdateBlogButton({ blogId, initialData, onUpdate }: UpdateBlogButtonProps) {
  const [title, setTitle] = useState(initialData.title || '');
  const [category, setCategory] = useState(initialData.category || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);

    try {
      const response = await axios.put(`/api/blogs/${blogId}`, {
        title,
        category,
        description,
      });

      if (response.status === 200) {
        onUpdate();
        alert("Blog updated successfully");
      }
    } catch (error) {
      console.error("Failed to update blog:", error);
      alert("Failed to update blog.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <h3>Update Blog Details</h3>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button
        onClick={handleUpdate}
        disabled={isUpdating}
      >
        {isUpdating ? 'Updating...' : 'Update Blog'}
      </button>
    </div>
  );
}
