
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { usePosts } from '@/hooks/usePosts';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Categories = () => {
  const { posts } = usePosts();
  
  const categoryStats = posts.reduce((acc, post) => {
    if (!acc[post.category]) {
      acc[post.category] = {
        count: 0,
        latestPost: post.date,
        description: getCategoryDescription(post.category)
      };
    }
    acc[post.category].count++;
    if (new Date(post.date) > new Date(acc[post.category].latestPost)) {
      acc[post.category].latestPost = post.date;
    }
    return acc;
  }, {} as Record<string, { count: number; latestPost: string; description: string }>);

  function getCategoryDescription(category: string): string {
    const descriptions: Record<string, string> = {
      'Technology': 'Latest trends and insights in software development, programming languages, and tech innovations.',
      'Design': 'UI/UX design principles, creative workflows, and visual design inspiration.',
      'Backend': 'Server-side development, APIs, databases, and system architecture.',
      'Frontend': 'Client-side development, frameworks, and user interface technologies.'
    };
    return descriptions[category] || 'Explore articles and insights in this category.';
  }

  const categoryColors = [
    'from-blue-500 to-blue-600',
    'from-green-500 to-green-600', 
    'from-purple-500 to-purple-600',
    'from-orange-500 to-orange-600',
    'from-pink-500 to-pink-600',
    'from-indigo-500 to-indigo-600'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Categories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover articles organized by topics that interest you most. 
            From technology and design to development and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(categoryStats).map(([category, stats], index) => (
            <Link key={category} to={`/?category=${encodeURIComponent(category)}`}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${categoryColors[index % categoryColors.length]} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl font-bold text-white">
                      {category.charAt(0)}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {category}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {stats.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-sm">
                      {stats.count} {stats.count === 1 ? 'article' : 'articles'}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      Latest: {new Date(stats.latestPost).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {Object.keys(categoryStats).length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📚</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-4">No categories yet</h3>
            <p className="text-gray-500 mb-8">Categories will appear here once you start creating blog posts.</p>
            <Link 
              to="/admin"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Your First Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
