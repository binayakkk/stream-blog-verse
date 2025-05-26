
import React, { useState } from 'react';
import Header from '@/components/Header';
import BlogCard from '@/components/BlogCard';
import { Search, TrendingUp, Users, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

// Enhanced sample blog posts data with more diverse content
const samplePosts = [
  {
    id: '1',
    title: 'Getting Started with React Hooks: A Complete Guide',
    excerpt: 'Learn how to use React Hooks to manage state and side effects in your functional components. This comprehensive guide covers useState, useEffect, and custom hooks with practical examples.',
    content: 'React Hooks revolutionized how we write React components...',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    category: 'Technology',
    tags: ['React', 'JavaScript', 'Frontend'],
    featured: true,
  },
  {
    id: '2',
    title: 'The Future of Web Development in 2024',
    excerpt: 'Explore the latest trends and technologies shaping the future of web development, from AI integration to new JavaScript frameworks and progressive web apps.',
    content: 'Web development continues to evolve at a rapid pace...',
    author: 'Mike Chen',
    date: '2024-01-12',
    category: 'Technology',
    tags: ['Web Development', 'Trends', 'AI'],
    featured: false,
  },
  {
    id: '3',
    title: 'Building Scalable APIs with Node.js',
    excerpt: 'Learn best practices for creating robust and scalable APIs using Node.js, Express, and modern development patterns. Includes performance optimization tips.',
    content: 'Creating scalable APIs is crucial for modern applications...',
    author: 'Alex Rodriguez',
    date: '2024-01-10',
    category: 'Backend',
    tags: ['Node.js', 'API', 'Backend'],
    featured: false,
  },
  {
    id: '4',
    title: 'CSS Grid vs Flexbox: When to Use What',
    excerpt: 'A detailed comparison of CSS Grid and Flexbox, helping you choose the right layout method for your projects with real-world examples and best practices.',
    content: 'CSS Grid and Flexbox are powerful layout tools...',
    author: 'Emma Wilson',
    date: '2024-01-08',
    category: 'Design',
    tags: ['CSS', 'Layout', 'Frontend'],
    featured: false,
  },
  {
    id: '5',
    title: 'Mastering TypeScript: Advanced Types and Patterns',
    excerpt: 'Dive deep into TypeScript\'s advanced type system and learn patterns that will make your code more robust and maintainable in large-scale applications.',
    content: 'TypeScript\'s type system is incredibly powerful...',
    author: 'David Kim',
    date: '2024-01-05',
    category: 'Technology',
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    featured: false,
  },
  {
    id: '6',
    title: 'UX Design Principles for Better User Engagement',
    excerpt: 'Discover essential UX design principles that drive user engagement and conversion. Learn how to create intuitive interfaces that users love.',
    content: 'User experience design is at the heart of successful products...',
    author: 'Jessica Park',
    date: '2024-01-03',
    category: 'Design',
    tags: ['UX', 'Design', 'User Experience'],
    featured: false,
  },
  {
    id: '7',
    title: 'Machine Learning in Web Development',
    excerpt: 'Explore how machine learning is transforming web development. From personalized content to intelligent automation, ML is changing the game.',
    content: 'Machine learning integration in web apps is becoming mainstream...',
    author: 'Dr. Raj Patel',
    date: '2024-01-01',
    category: 'Technology',
    tags: ['Machine Learning', 'AI', 'Web Development'],
    featured: false,
  },
  {
    id: '8',
    title: 'Sustainable Web Development Practices',
    excerpt: 'Learn how to build environmentally conscious websites that are both performant and sustainable. Green coding practices for the modern web.',
    content: 'Sustainability in web development is becoming increasingly important...',
    author: 'Maya Green',
    date: '2023-12-28',
    category: 'Technology',
    tags: ['Sustainability', 'Performance', 'Green Tech'],
    featured: false,
  }
];

const BlogHome = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(samplePosts.map(post => post.category)))];
  
  const filteredPosts = samplePosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const stats = {
    totalPosts: samplePosts.length,
    authors: new Set(samplePosts.map(p => p.author)).size,
    categories: new Set(samplePosts.map(p => p.category)).size
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-yellow-300">StreamBlog</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Discover insights, tutorials, and stories from the world of technology and beyond. 
            Join our community of passionate writers and readers.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">{stats.totalPosts}+</div>
              <div className="text-sm text-blue-200">Articles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">{stats.authors}+</div>
              <div className="text-sm text-blue-200">Authors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">{stats.categories}</div>
              <div className="text-sm text-blue-200">Categories</div>
            </div>
          </div>

          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search articles, authors, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-4 text-gray-900 text-lg rounded-full border-0 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Quick Stats Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trending Topics</h3>
              <p className="text-gray-600">React, TypeScript, and AI are the most popular topics this month</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Authors</h3>
              <p className="text-gray-600">Learn from industry experts and experienced developers</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fresh Content</h3>
              <p className="text-gray-600">New articles published weekly covering the latest trends</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Enhanced Category Filter */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full transition-all duration-200 font-medium ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-md'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
                {category !== 'all' && (
                  <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {samplePosts.filter(p => p.category === category).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Featured and Regular Posts */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {searchTerm || selectedCategory !== 'all' ? 'Search Results' : 'Latest Articles'}
          </h2>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPost && (
            <BlogCard post={featuredPost} featured={true} />
          )}
          {regularPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-3">No posts found</h3>
            <p className="text-gray-500 text-lg mb-6">Try adjusting your search or category filter</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Show All Posts
            </button>
          </div>
        )}

        {/* Newsletter Signup */}
        <section className="mt-20">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Get the latest articles and insights delivered straight to your inbox. 
                Join thousands of developers and designers who trust StreamBlog.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 text-gray-900"
                />
                <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-blue-200 mt-4">
                No spam, unsubscribe at any time.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default BlogHome;
