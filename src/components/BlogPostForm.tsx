
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Eye, Sparkles } from 'lucide-react';
import AIContentGenerator from '@/components/AIContentGenerator';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
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

  const handleAIContentGenerated = (content: string, type: string) => {
    switch (type) {
      case 'title':
        // If multiple titles are generated, take the first one
        const titles = content.split('\n').filter(line => line.trim());
        setFormData(prev => ({ ...prev, title: titles[0]?.replace(/^\d+\.\s*/, '') || content }));
        break;
      case 'excerpt':
        setFormData(prev => ({ ...prev, excerpt: content }));
        break;
      case 'content':
      case 'improve':
        setFormData(prev => ({ ...prev, content: content }));
        break;
    }
  };

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>{post ? 'Edit Post' : 'Create New Post'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="editor" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="ai-generator" className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4" />
              <span>AI Generator</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="editor">
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
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    placeholder="Technology, Lifestyle, etc..."
                    required
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
          </TabsContent>

          <TabsContent value="ai-generator">
            <AIContentGenerator 
              onContentGenerated={handleAIContentGenerated}
              existingContent={formData.content}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BlogPostForm;
