import { useState, useEffect } from 'react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  featured: boolean;
  views?: number;
  image?: string;
  authorAvatar?: string;
  readTime?: string;
}

const STORAGE_KEY = 'blog_posts';

const defaultPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with React Hooks: A Complete Guide',
    excerpt: 'Learn how to use React Hooks to manage state and side effects in your functional components. This comprehensive guide covers useState, useEffect, and custom hooks.',
    content: 'React Hooks revolutionized how we write React components...',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    category: 'Technology',
    tags: ['React', 'JavaScript', 'Frontend'],
    featured: true,
    views: 1250,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
    readTime: '8 min read'
  },
  {
    id: '2',
    title: 'The Future of Web Development in 2024',
    excerpt: 'Explore the latest trends and technologies shaping the future of web development, from AI integration to new JavaScript frameworks.',
    content: 'Web development continues to evolve at a rapid pace...',
    author: 'Mike Chen',
    date: '2024-01-12',
    category: 'Technology',
    tags: ['Web Development', 'Trends', 'AI'],
    featured: false,
    views: 890,
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    readTime: '6 min read'
  },
  {
    id: '3',
    title: 'Building Scalable APIs with Node.js',
    excerpt: 'Learn best practices for creating robust and scalable APIs using Node.js, Express, and modern development patterns.',
    content: 'Creating scalable APIs is crucial for modern applications...',
    author: 'Alex Rodriguez',
    date: '2024-01-10',
    category: 'Backend',
    tags: ['Node.js', 'API', 'Backend'],
    featured: false,
    views: 654,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    readTime: '12 min read'
  },
  {
    id: '4',
    title: 'CSS Grid vs Flexbox: When to Use What',
    excerpt: 'A detailed comparison of CSS Grid and Flexbox, helping you choose the right layout method for your projects.',
    content: 'CSS Grid and Flexbox are powerful layout tools...',
    author: 'Emma Wilson',
    date: '2024-01-08',
    category: 'Design',
    tags: ['CSS', 'Layout', 'Frontend'],
    featured: false,
    views: 432,
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=400&fit=crop',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    readTime: '10 min read'
  },
  {
    id: '5',
    title: 'Mastering TypeScript: Advanced Types and Patterns',
    excerpt: 'Dive deep into TypeScript\'s advanced type system and learn patterns that will make your code more robust and maintainable.',
    content: 'TypeScript\'s type system is incredibly powerful...',
    author: 'David Kim',
    date: '2024-01-05',
    category: 'Technology',
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    featured: false,
    views: 789,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    readTime: '15 min read'
  }
];

export const usePosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  // Load posts from localStorage on mount
  useEffect(() => {
    const storedPosts = localStorage.getItem(STORAGE_KEY);
    if (storedPosts) {
      try {
        setPosts(JSON.parse(storedPosts));
      } catch (error) {
        console.error('Error parsing stored posts:', error);
        setPosts(defaultPosts);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
      }
    } else {
      setPosts(defaultPosts);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
    }
  }, []);

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    }
  }, [posts]);

  const addPost = (postData: Omit<BlogPost, 'id' | 'date'>) => {
    const newPost: BlogPost = {
      ...postData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      views: 0,
    };
    setPosts(prev => [newPost, ...prev]);
    return newPost;
  };

  const updatePost = (id: string, postData: Omit<BlogPost, 'id' | 'date'>) => {
    setPosts(prev => prev.map(post => 
      post.id === id 
        ? { ...postData, id, date: post.date, views: post.views }
        : post
    ));
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const toggleFeatured = (id: string) => {
    setPosts(prev => prev.map(post => 
      post.id === id ? { ...post, featured: !post.featured } : post
    ));
  };

  const getPostById = (id: string) => {
    return posts.find(post => post.id === id);
  };

  return {
    posts,
    addPost,
    updatePost,
    deletePost,
    toggleFeatured,
    getPostById
  };
};
