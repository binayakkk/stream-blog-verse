
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, User, Calendar, Eye, MapPin } from 'lucide-react';
import BlogCard from './BlogCard';

// Sample authors with their posts
const authorsData = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
    bio: 'Frontend developer passionate about React and modern web technologies',
    location: 'New York, NY',
    joinDate: '2023-01-15',
    followers: 1540,
    posts: [
      {
        id: '1',
        title: 'Getting Started with React Hooks: A Complete Guide',
        excerpt: 'Learn how to use React Hooks to manage state and side effects in your functional components.',
        content: 'React Hooks revolutionized how we write React components...',
        author: 'Sarah Johnson',
        date: '2024-01-15',
        category: 'Technology',
        tags: ['React', 'JavaScript', 'Frontend'],
        featured: true,
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
        readTime: '8 min read'
      }
    ]
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    bio: 'Full-stack developer and tech enthusiast exploring the future of web development',
    location: 'San Francisco, CA',
    joinDate: '2023-02-20',
    followers: 892,
    posts: [
      {
        id: '2',
        title: 'The Future of Web Development in 2024',
        excerpt: 'Explore the latest trends and technologies shaping the future of web development.',
        content: 'Web development continues to evolve at a rapid pace...',
        author: 'Mike Chen',
        date: '2024-01-12',
        category: 'Technology',
        tags: ['Web Development', 'Trends', 'AI'],
        featured: false,
        image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop',
        authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        readTime: '6 min read'
      }
    ]
  },
  {
    id: '3',
    name: 'Alex Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    bio: 'Backend engineer specializing in Node.js and scalable API development',
    location: 'Austin, TX',
    joinDate: '2023-03-10',
    followers: 756,
    posts: [
      {
        id: '3',
        title: 'Building Scalable APIs with Node.js',
        excerpt: 'Learn best practices for creating robust and scalable APIs using Node.js.',
        content: 'Creating scalable APIs is crucial for modern applications...',
        author: 'Alex Rodriguez',
        date: '2024-01-10',
        category: 'Backend',
        tags: ['Node.js', 'API', 'Backend'],
        featured: false,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        readTime: '12 min read'
      }
    ]
  }
];

const AuthorPosts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);

  const filteredAuthors = authorsData.filter(author =>
    author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    author.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedAuthorData = selectedAuthor 
    ? authorsData.find(author => author.id === selectedAuthor)
    : null;

  return (
    <div className="space-y-6">
      {/* Search Authors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Discover Authors</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search authors by name or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Authors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuthors.map((author) => (
              <Card 
                key={author.id} 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedAuthor === author.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
                }`}
                onClick={() => setSelectedAuthor(selectedAuthor === author.id ? null : author.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{author.name}</h3>
                      <div className="flex items-center space-x-1 text-sm text-gray-500 mb-1">
                        <MapPin className="h-3 w-3" />
                        <span>{author.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>Joined {new Date(author.joinDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{author.bio}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{author.posts.length}</div>
                      <div className="text-xs text-gray-500">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{author.followers}</div>
                      <div className="text-xs text-gray-500">Followers</div>
                    </div>
                    <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                      {selectedAuthor === author.id ? 'Hide Posts' : 'View Posts'}
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Author's Posts */}
      {selectedAuthorData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Posts by {selectedAuthorData.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedAuthorData.posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            {selectedAuthorData.posts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✍️</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts yet</h3>
                <p className="text-gray-500">This author hasn't published any posts yet.</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* All Authors Overview */}
      {!selectedAuthor && (
        <Card>
          <CardHeader>
            <CardTitle>All Authors Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{authorsData.length}</div>
                <div className="text-sm text-gray-600">Total Authors</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {authorsData.reduce((sum, author) => sum + author.posts.length, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Posts</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {authorsData.reduce((sum, author) => sum + author.followers, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Followers</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {Math.round(authorsData.reduce((sum, author) => sum + author.followers, 0) / authorsData.length)}
                </div>
                <div className="text-sm text-gray-600">Avg. Followers</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AuthorPosts;
