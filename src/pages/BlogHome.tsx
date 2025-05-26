
import React, { useState } from 'react';
import Header from '@/components/Header';
import BlogCard from '@/components/BlogCard';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Sample blog posts data
const samplePosts = [
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to StreamBlog
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Discover insights, tutorials, and stories from the world of technology and beyond
          </p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-gray-900"
            />
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
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
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogHome;
