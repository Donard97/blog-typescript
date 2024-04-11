import { create } from 'zustand';

interface Post {
  id: string;
  title: string;
  content: string;
}

interface StoreState {
  posts: Post[];
  addPost: (post: Omit<Post, 'id'>) => void;
  editPost: (id: string, post: Partial<Post>) => void;
  deletePost: (id: string) => void;
}

const useStore = create<StoreState>((set) => ({
  posts: [],
  addPost: (post) =>
    set((state) => ({
      posts: [...state.posts, { ...post, id: (state.posts.length + 1).toString() }],
    })),
  editPost: (id, newPost) =>
    set((state) => ({
      posts: state.posts.map((post) => (post.id === id ? { ...post, ...newPost } : post)),
    })),
  deletePost: (id) => set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
}));

export { useStore };
