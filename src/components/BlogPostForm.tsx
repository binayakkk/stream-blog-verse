import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Eye } from 'lucide-react';

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
}

interface BlogPostFormProps {
  post?: BlogPost;
  onSave: (post: Omit<BlogPost, 'id' | 'date'>) => void;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ post, onSave }) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    author: post?.author || '',
    category: post?.category || '',
    tags: post?.tags.join(', ') || '',
    featured: post?.featured || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    });
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>{post ? 'Edit Post' : 'Create New Post'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter post title..."
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleChange('author', e.target.value)}
                placeholder="Author name..."
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                placeholder="Technology, Lifestyle, etc..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
                placeholder="react, javascript, web development (comma separated)"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt *</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => handleChange('excerpt', e.target.value)}
              placeholder="Brief description of the post..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="Write your blog post content here..."
              rows={12}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => handleChange('featured', e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="featured">Featured Post</Label>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </Button>
            <Button type="submit" className="flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>{post ? 'Update Post' : 'Save Post'}</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BlogPostForm;
