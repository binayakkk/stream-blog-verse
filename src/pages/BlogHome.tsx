
import React, { useState } from 'react';
import Header from '@/components/Header';
import BlogCard from '@/components/BlogCard';
import { Search, TrendingUp, Users, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

// Enhanced sample blog posts data with images
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
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
    readTime: '8 min read'
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
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    readTime: '6 min read'
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
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    readTime: '12 min read'
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
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=400&fit=crop',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    readTime: '10 min read'
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
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    readTime: '15 min read'
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
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    readTime: '9 min read'
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
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=400&fit=crop',
    authorAvatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face',
    readTime: '11 min read'
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
    image: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&h=400&fit=crop',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    readTime: '7 min read'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      
      {/* Modern Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-7xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight">
            StreamBlog
          </h1>
          <p className="text-2xl md:text-3xl mb-12 text-gray-200 max-w-4xl mx-auto font-light leading-relaxed">
            Where ideas flow and stories come to life. 
            <span className="block mt-2 text-blue-300">Join our community of passionate writers.</span>
          </p>
          
          <div className="flex justify-center space-x-12 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400">{stats.totalPosts}+</div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">Stories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400">{stats.authors}+</div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">Writers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400">{stats.categories}</div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">Topics</div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
            <Input
              type="text"
              placeholder="Discover amazing stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-16 py-6 text-gray-900 text-lg rounded-2xl border-0 shadow-2xl bg-white/95 backdrop-blur-sm"
            />
          </div>
        </div>
      </section>

      {/* Enhanced Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 border-0 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Trending Content</h3>
              <p className="text-gray-600 leading-relaxed">Discover the most popular stories and emerging topics in tech and beyond</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 border-0 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Authors</h3>
              <p className="text-gray-600 leading-relaxed">Learn from industry leaders and passionate developers sharing their knowledge</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 border-0 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fresh Insights</h3>
              <p className="text-gray-600 leading-relaxed">Weekly updates with cutting-edge insights and practical tutorials</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Category Filter */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Explore by Category</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-4 rounded-full transition-all duration-300 font-semibold text-lg ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 shadow-md hover:shadow-lg'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
                {category !== 'all' && (
                  <span className="ml-3 text-sm bg-white/20 text-white px-3 py-1 rounded-full">
                    {samplePosts.filter(p => p.category === category).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              {searchTerm || selectedCategory !== 'all' ? 'Search Results' : 'Latest Stories'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPost && (
                <div className="md:col-span-2 lg:col-span-2">
                  <BlogCard post={featuredPost} featured={true} />
                </div>
              )}
              {regularPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-3xl font-bold text-gray-600 mb-4">No stories found</h3>
            <p className="text-gray-500 text-xl mb-8 max-w-md mx-auto">Try adjusting your search or explore different categories</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg"
            >
              Show All Stories
            </button>
          </div>
        )}

        {/* Newsletter Section */}
        <section className="mt-24">
          <Card className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white border-0 shadow-2xl">
            <CardContent className="p-16 text-center">
              <h3 className="text-4xl font-bold mb-6">Never Miss a Story</h3>
              <p className="text-xl text-purple-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                Get the latest articles, insights, and exclusive content delivered to your inbox. 
                Join our community of curious minds and passionate learners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 text-gray-900 py-4 px-6 rounded-full text-lg"
                />
                <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-10 py-4 rounded-full font-bold hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 text-lg shadow-lg">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-purple-200 mt-6">
                Free forever. Unsubscribe anytime.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default BlogHome;
