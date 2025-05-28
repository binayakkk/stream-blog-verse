
import React from 'react';
import { useSupabasePosts } from '@/hooks/useSupabasePosts';
import Header from '@/components/Header';
import BlogCard from '@/components/BlogCard';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, BookOpen, Users, Calendar } from 'lucide-react';

const BlogHome = () => {
  const { posts, loading } = useSupabasePosts();

  const featuredPosts = posts.filter(post => post.featured);
  const recentPosts = posts.filter(post => !post.featured).slice(0, 6);
  const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Loading skeleton */}
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <Skeleton className="h-12 w-96 mx-auto" />
              <Skeleton className="h-6 w-128 mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-16 w-16 rounded-full mb-4" />
                    <Skeleton className="h-6 w-20 mb-2" />
                    <Skeleton className="h-8 w-16" />
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[1, 2].map(i => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-2xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              StreamBlog
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover insights, stories, and knowledge from our community of writers. 
            Powered by modern technology and stored securely in the cloud.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Total Posts</h3>
                <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Total Views</h3>
                <p className="text-2xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Featured</h3>
                <p className="text-2xl font-bold text-gray-900">{featuredPosts.length}</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">This Month</h3>
                <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Stories</h2>
              <p className="text-xl text-gray-600">Our most popular and trending content</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map(post => (
                <BlogCard key={post.id} post={post} featured={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Articles</h2>
            <p className="text-xl text-gray-600">Fresh insights and stories from our community</p>
          </div>
          
          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-600 mb-2">No posts yet</h3>
              <p className="text-gray-500">
                Posts will appear here when authors start publishing content.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Share Your Story?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join our community of writers and share your knowledge with the world. 
            All posts are securely stored in our cloud database.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/auth" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg">
              Get Started
            </a>
            <a href="/about" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors">
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogHome;
