
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSupabasePosts } from '@/hooks/useSupabasePosts';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Calendar, User, Tag, Clock, Eye, Share2 } from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { posts, loading, getPostById } = useSupabasePosts();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (!loading && id) {
      const foundPost = getPostById(id);
      if (foundPost) {
        setPost(foundPost);
      } else if (posts.length > 0) {
        // Post not found and we've loaded posts
        navigate('/');
      }
    }
  }, [id, loading, posts, getPostById, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-6 w-3/4 mb-8" />
          <Skeleton className="h-64 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')} 
          className="mb-8 hover:bg-blue-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Button>

        {/* Hero Image */}
        <div className="relative mb-8 rounded-2xl overflow-hidden shadow-xl">
          <img
            src={post.image || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop'}
            alt={post.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          {post.featured && (
            <div className="absolute top-6 right-6">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Article Header */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-6">
              <div className="flex items-center space-x-2">
                <img
                  src={post.authorAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'}
                  alt={post.author}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div>
                  <span className="font-semibold text-gray-900">{post.author}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              
              {post.readTime && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{post.views || 0} views</span>
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share Button */}
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.excerpt,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                className="flex items-center space-x-2"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Article Content */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {post.content}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Author Bio */}
        <Card className="mt-8 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <img
                src={post.authorAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'}
                alt={post.author}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">About {post.author}</h3>
                <p className="text-gray-600">
                  A passionate writer sharing insights and knowledge with the community.
                  Follow for more articles on technology, lifestyle, and innovation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </article>
    </div>
  );
};

export default BlogPost;
