import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSupabasePosts } from '@/hooks/useSupabasePosts';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BlogPostForm from '@/components/BlogPostForm';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import ProfileSection from '@/components/ProfileSection';
import AuthorPosts from '@/components/AuthorPosts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  PlusCircle, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  Users,
  Settings,
  FileText,
  TrendingUp,
  ExternalLink,
  Loader2
} from 'lucide-react';

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
}

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'create' | 'edit'>('dashboard');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  
  const { posts, loading, user, addPost, updatePost, deletePost, toggleFeatured } = useSupabasePosts();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [loading, user, navigate]);

  const handleSavePost = async (postData: Omit<BlogPost, 'id' | 'date'>) => {
    if (editingPost) {
      await updatePost(editingPost.id, postData);
      toast({
        title: "Post updated",
        description: "Your blog post has been successfully updated.",
      });
    } else {
      const newPost = await addPost(postData);
      if (newPost) {
        toast({
          title: "Post created",
          description: "Your new blog post has been successfully created.",
        });
      }
    }
    
    setCurrentView('dashboard');
    setEditingPost(null);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setCurrentView('edit');
  };

  const handleDeletePost = async (postId: string) => {
    await deletePost(postId);
    toast({
      title: "Post deleted",
      description: "The blog post has been successfully deleted.",
    });
  };

  const handleToggleFeatured = async (postId: string) => {
    await toggleFeatured(postId);
    toast({
      title: "Post updated",
      description: "Featured status has been updated.",
    });
  };

  const handleViewPost = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="text-lg">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  const categories = ['all', ...Array.from(new Set(posts.map(post => post.category || 'Technology')))];
  
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || (post.category || 'Technology') === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    totalPosts: posts.length,
    featuredPosts: posts.filter(p => p.featured).length,
    categories: new Set(posts.map(p => p.category || 'Technology')).size,
    totalViews: posts.reduce((sum, post) => sum + (post.views || 0), 0).toLocaleString()
  };

  if (currentView === 'create') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button 
            variant="outline" 
            onClick={() => setCurrentView('dashboard')}
            className="mb-4"
          >
            ← Back to Dashboard
          </Button>
          <BlogPostForm onSave={handleSavePost} />
        </div>
      </div>
    );
  }

  if (currentView === 'edit' && editingPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button 
            variant="outline" 
            onClick={() => {
              setCurrentView('dashboard');
              setEditingPost(null);
            }}
            className="mb-4"
          >
            ← Back to Dashboard
          </Button>
          <BlogPostForm post={editingPost} onSave={handleSavePost} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600 text-lg">Manage your blog content and track performance</p>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Posts</span>
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center space-x-2">
              <PlusCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Create</span>
            </TabsTrigger>
            <TabsTrigger value="authors" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Authors</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="posts">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Manage Posts</h1>
                <p className="text-gray-600 mt-1">View, edit, and delete your blog posts</p>
              </div>
              <Button 
                onClick={() => setCurrentView('create')}
                className="flex items-center space-x-2"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Create New Post</span>
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Posts</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalPosts}</p>
                      <p className="text-sm text-green-600">Stored in database</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Featured</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.featuredPosts}</p>
                      <p className="text-sm text-blue-600">Active now</p>
                    </div>
                    <Eye className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Categories</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.categories}</p>
                      <p className="text-sm text-purple-600">Well organized</p>
                    </div>
                    <Edit className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Views</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalViews}</p>
                      <p className="text-sm text-orange-600">From database</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search posts by title, author, or tags..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts Management */}
            <Card>
              <CardHeader>
                <CardTitle>Manage Posts ({filteredPosts.length} of {posts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredPosts.map(post => (
                    <div key={post.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{post.title}</h3>
                          {post.featured && (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <span>By</span>
                            <span className="font-medium text-gray-700">{post.author}</span>
                          </span>
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                            {post.category || 'Technology'}
                          </span>
                          <span className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{post.views || 0} views</span>
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {post.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewPost(post.id)}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleToggleFeatured(post.id)}
                          className={post.featured ? "text-yellow-600 border-yellow-200" : ""}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditPost(post)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {filteredPosts.length === 0 && (
                    <div className="text-center py-8">
                      <h3 className="text-lg font-medium text-gray-600 mb-2">No posts found</h3>
                      <p className="text-gray-500">
                        {posts.length === 0 
                          ? "Create your first blog post to get started!" 
                          : "Try adjusting your search or filter criteria"
                        }
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PlusCircle className="h-5 w-5" />
                  <span>Create New Post</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BlogPostForm onSave={handleSavePost} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="authors">
            <AuthorPosts />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
