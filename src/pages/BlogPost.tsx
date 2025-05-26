
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample blog posts data (in a real app, this would come from an API or database)
const samplePosts = [
  {
    id: '1',
    title: 'Getting Started with React Hooks: A Complete Guide',
    excerpt: 'Learn how to use React Hooks to manage state and side effects in your functional components.',
    content: `React Hooks revolutionized how we write React components by allowing us to use state and other React features without writing a class component. In this comprehensive guide, we'll explore the most important hooks and how to use them effectively.

## What are React Hooks?

React Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8 and have since become the standard way to write React components.

## useState Hook

The useState hook is the most fundamental hook for managing state in functional components:

\`\`\`javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## useEffect Hook

The useEffect hook lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount combined.

\`\`\`javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## Custom Hooks

You can also create your own hooks to reuse stateful logic between components:

\`\`\`javascript
import { useState, useEffect } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}
\`\`\`

## Best Practices

1. **Always call hooks at the top level** - Don't call hooks inside loops, conditions, or nested functions
2. **Use multiple state variables** - Instead of one complex state object, use multiple useState calls
3. **Optimize with useMemo and useCallback** - For expensive calculations and preventing unnecessary re-renders
4. **Clean up effects** - Always clean up subscriptions and timeouts in useEffect

React Hooks provide a more direct API to the React concepts you already know. They don't change how React works fundamentally, but they do provide a more ergonomic way to reuse stateful logic and manage component lifecycle.`,
    author: 'Sarah Johnson',
    date: '2024-01-15',
    category: 'Technology',
    tags: ['React', 'JavaScript', 'Frontend'],
    featured: true,
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const post = samplePosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/">
            <Button>← Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            {paragraph.replace('## ', '')}
          </h2>
        );
      }
      
      if (paragraph.includes('```')) {
        const codeContent = paragraph.replace(/```\w*\n?/, '').replace(/```/, '');
        return (
          <pre key={index} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6">
            <code>{codeContent}</code>
          </pre>
        );
      }
      
      if (paragraph.includes('`') && !paragraph.includes('```')) {
        const parts = paragraph.split('`');
        return (
          <p key={index} className="text-gray-700 leading-relaxed mb-6">
            {parts.map((part, i) => 
              i % 2 === 0 ? part : (
                <code key={i} className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                  {part}
                </code>
              )
            )}
          </p>
        );
      }
      
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-6">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Blog</span>
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Hero Image */}
          <div className="h-64 md:h-80 bg-gradient-to-br from-blue-500 to-purple-600 relative">
            <div className="absolute inset-0 bg-black bg-opacity-20" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-3 py-1 bg-white bg-opacity-90 text-blue-600 text-sm font-medium rounded-full mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                {post.title}
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>By {post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {post.excerpt}
              </p>
              
              <div className="text-gray-800">
                {formatContent(post.content)}
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h3>
          <div className="bg-white rounded-lg p-6 text-center">
            <p className="text-gray-600">More related posts coming soon!</p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
