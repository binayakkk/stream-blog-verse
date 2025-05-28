
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag, Clock } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category?: string;
  tags: string[];
  image?: string;
  authorAvatar?: string;
  readTime?: string;
  featured: boolean;
}

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  const cardClasses = featured 
    ? "bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:-translate-y-2" 
    : "bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group transform hover:-translate-y-1";

  return (
    <article className={cardClasses}>
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? 'h-80' : 'h-56'}`}>
        <img
          src={post.image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop'}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm text-blue-600 text-sm font-semibold rounded-full shadow-lg">
            {post.category || 'Technology'}
          </span>
        </div>
        {featured && (
          <div className="absolute top-4 right-4">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg">
              Featured
            </span>
          </div>
        )}
      </div>
      
      <div className={`p-6 ${featured ? 'p-8' : ''}`}>
        <Link to={`/post/${post.id}`} className="block group-hover:text-blue-600 transition-colors">
          <h2 className={`font-bold text-gray-900 mb-4 line-clamp-2 leading-tight ${featured ? 'text-3xl' : 'text-xl'}`}>
            {post.title}
          </h2>
        </Link>
        
        <p className={`text-gray-600 mb-6 line-clamp-3 leading-relaxed ${featured ? 'text-lg' : ''}`}>
          {post.excerpt}
        </p>
        
        {/* Author Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={post.authorAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'}
              alt={post.author}
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
            />
            <div>
              <div className="font-semibold text-gray-900 text-sm">{post.author}</div>
              <div className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</div>
            </div>
          </div>
          {post.readTime && (
            <div className="flex items-center space-x-1 text-gray-500 text-sm">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          )}
        </div>
        
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium hover:bg-blue-100 transition-colors cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogCard;
