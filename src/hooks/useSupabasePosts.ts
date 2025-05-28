
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@supabase/supabase-js';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category?: string;
  tags: string[];
  featured: boolean;
  views?: number;
  image?: string;
  authorAvatar?: string;
  readTime?: string;
  user_id?: string;
}

export const useSupabasePosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Get current user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Load posts from Supabase
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching posts:', error);
          toast({
            title: "Error loading posts",
            description: error.message,
            variant: "destructive",
          });
        } else {
          // Transform data to match the expected interface
          const transformedPosts = data?.map(post => ({
            id: post.id,
            title: post.title,
            excerpt: post.excerpt || '',
            content: post.content,
            author: post.author,
            date: post.date,
            category: 'Technology', // Default category since it's not in DB yet
            tags: post.tags || [],
            featured: post.featured || false,
            views: post.views || 0,
            user_id: post.user_id,
            // Add some default values for display
            image: post.image_url || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
            authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
            readTime: '5 min read'
          })) || [];
          
          setPosts(transformedPosts);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast({
          title: "Error loading posts",
          description: "Failed to load posts from database",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [toast]);

  const addPost = async (postData: Omit<BlogPost, 'id' | 'date' | 'user_id'>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create posts",
        variant: "destructive",
      });
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([{
          title: postData.title,
          content: postData.content,
          excerpt: postData.excerpt,
          author: postData.author,
          tags: postData.tags,
          featured: postData.featured,
          views: 0,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating post:', error);
        toast({
          title: "Error creating post",
          description: error.message,
          variant: "destructive",
        });
        return null;
      }

      // Transform and add to local state
      const newPost = {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt || '',
        content: data.content,
        author: data.author,
        date: data.date,
        category: 'Technology',
        tags: data.tags || [],
        featured: data.featured || false,
        views: data.views || 0,
        user_id: data.user_id,
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
        readTime: '5 min read'
      };

      setPosts(prev => [newPost, ...prev]);
      return newPost;
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error creating post",
        description: "Failed to create post",
        variant: "destructive",
      });
      return null;
    }
  };

  const updatePost = async (id: string, postData: Omit<BlogPost, 'id' | 'date' | 'user_id'>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to update posts",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('posts')
        .update({
          title: postData.title,
          content: postData.content,
          excerpt: postData.excerpt,
          author: postData.author,
          tags: postData.tags,
          featured: postData.featured,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating post:', error);
        toast({
          title: "Error updating post",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setPosts(prev => prev.map(post => 
        post.id === id 
          ? { ...post, ...postData }
          : post
      ));
    } catch (error) {
      console.error('Error updating post:', error);
      toast({
        title: "Error updating post",
        description: "Failed to update post",
        variant: "destructive",
      });
    }
  };

  const deletePost = async (id: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to delete posts",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting post:', error);
        toast({
          title: "Error deleting post",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error deleting post",
        description: "Failed to delete post",
        variant: "destructive",
      });
    }
  };

  const toggleFeatured = async (id: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to update posts",
        variant: "destructive",
      });
      return;
    }

    const post = posts.find(p => p.id === id);
    if (!post) return;

    try {
      const { error } = await supabase
        .from('posts')
        .update({ featured: !post.featured })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error toggling featured:', error);
        toast({
          title: "Error updating post",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setPosts(prev => prev.map(post => 
        post.id === id ? { ...post, featured: !post.featured } : post
      ));
    } catch (error) {
      console.error('Error toggling featured:', error);
      toast({
        title: "Error updating post",
        description: "Failed to update post",
        variant: "destructive",
      });
    }
  };

  const getPostById = (id: string) => {
    return posts.find(post => post.id === id);
  };

  return {
    posts,
    loading,
    user,
    addPost,
    updatePost,
    deletePost,
    toggleFeatured,
    getPostById
  };
};
