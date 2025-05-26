
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image?: string;
  featured: boolean;
}

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  const cardClasses = featured 
    ? "bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group col-span-2 row-span-2" 
    : "bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group";

  return (
    <article className={cardClasses}>
      <div className={`bg-gradient-to-br from-blue-500 to-purple-600 ${featured ? 'h-64' : 'h-48'} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block px-3 py-1 bg-white bg-opacity-90 text-blue-600 text-sm font-medium rounded-full">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className={`p-6 ${featured ? 'p-8' : ''}`}>
        <Link to={`/post/${post.id}`} className="block group-hover:text-blue-600 transition-colors">
          <h2 className={`font-bold text-gray-900 mb-3 line-clamp-2 ${featured ? 'text-2xl' : 'text-xl'}`}>
            {post.title}
          </h2>
        </Link>
        
        <p className={`text-gray-600 mb-4 line-clamp-3 ${featured ? 'text-lg' : ''}`}>
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        {post.tags.length > 0 && (
          <div className="flex items-center space-x-2 mt-4">
            <Tag className="h-4 w-4 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogCard;
