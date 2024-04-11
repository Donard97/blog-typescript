import React, { useState } from 'react';
import { useStore } from './store';

const App: React.FC = () => {
  const { posts, addPost, editPost, deletePost } = useStore();
  const [editablePost, setEditablePost] = useState<{ id: string; title: string; content: string } | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleAddPost = () => {
    if (newTitle && newContent) {
      addPost({ title: newTitle, content: newContent });
      setNewTitle('');
      setNewContent('');
    }
  };

  const handleEditClick = (id: string, title: string, content: string) => {
    setEditablePost({ id, title, content });
  };

  const handleSaveEdit = (id: string) => {
    if (editablePost && editablePost.title && editablePost.content) {
      editPost(id, { title: editablePost.title, content: editablePost.content });
      setEditablePost(null);
    }
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(id);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">My Blog</h1>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <div className="flex">
            <input
              type="text"
              className="border border-gray-300 rounded px-4 py-2 mr-2"
              placeholder="Enter post title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              disabled={editablePost !== null}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddPost}
            >
              Create
            </button>
          </div>
          <textarea
            className="border border-gray-300 rounded px-4 py-2 mr-2 mt-2"
            placeholder="Enter post content"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            disabled={editablePost !== null}
          ></textarea>
        </div>
      </div>
      <ul className="mt-4">
        {posts.map((post) => (
          <li key={post.id} className="mb-4 p-4 border border-gray-300 rounded">
            {editablePost?.id === post.id ? (
              <>
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="border border-gray-300 rounded px-4 py-2 mb-2"
                    value={editablePost.title}
                    onChange={(e) => setEditablePost((prev) => (prev ? { ...prev, title: e.target.value } : null))}
                  />
                  <textarea
                    className="border border-gray-300 rounded px-4 py-2 mb-2"
                    value={editablePost.content}
                    onChange={(e) =>
                      setEditablePost((prev) => (prev ? { ...prev, content: e.target.value } : null))
                    }
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleSaveEdit(post.id)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setEditablePost(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-700">{post.content}</p>
                <div className="flex justify-end mt-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleEditClick(post.id, post.title, post.content)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
