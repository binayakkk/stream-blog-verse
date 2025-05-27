
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAIContentGenerator } from '@/hooks/useAIContentGenerator';
import { Sparkles, Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIContentGeneratorProps {
  onContentGenerated?: (content: string, type: string) => void;
  existingContent?: string;
}

const AIContentGenerator: React.FC<AIContentGeneratorProps> = ({
  onContentGenerated,
  existingContent
}) => {
  const [prompt, setPrompt] = useState('');
  const [generationType, setGenerationType] = useState<'title' | 'excerpt' | 'content' | 'improve'>('content');
  const [generatedContent, setGeneratedContent] = useState('');
  const { generateContent, isGenerating } = useAIContentGenerator();
  const { toast } = useToast();

  const handleGenerate = async () => {
    const result = await generateContent({
      prompt,
      type: generationType,
      existingContent: generationType === 'improve' ? existingContent : undefined,
    });

    if (result) {
      setGeneratedContent(result);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
      toast({
        title: "Copied!",
        description: "Content copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy content to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleUseContent = () => {
    if (onContentGenerated && generatedContent) {
      onContentGenerated(generatedContent, generationType);
      setGeneratedContent('');
      setPrompt('');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          <span>AI Content Generator</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="generation-type">Generation Type</Label>
          <Select value={generationType} onValueChange={(value: any) => setGenerationType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select generation type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Blog Title</SelectItem>
              <SelectItem value="excerpt">Blog Excerpt</SelectItem>
              <SelectItem value="content">Full Content</SelectItem>
              {existingContent && (
                <SelectItem value="improve">Improve Existing Content</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        {generationType !== 'improve' && (
          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                generationType === 'title' 
                  ? "Enter the topic or main idea for your blog post..."
                  : generationType === 'excerpt'
                  ? "Enter the main content or topic to create an excerpt for..."
                  : "Describe what you want to write about..."
              }
              rows={3}
            />
          </div>
        )}

        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating || (!prompt.trim() && generationType !== 'improve')}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate {generationType === 'improve' ? 'Improved' : ''} Content
            </>
          )}
        </Button>

        {generatedContent && (
          <div className="space-y-3">
            <Label>Generated Content:</Label>
            <div className="relative">
              <Textarea
                value={generatedContent}
                onChange={(e) => setGeneratedContent(e.target.value)}
                rows={generationType === 'content' ? 12 : 4}
                className="pr-20"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyToClipboard}
                className="absolute top-2 right-2"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleUseContent} className="flex-1">
                Use This Content
              </Button>
              <Button variant="outline" onClick={() => setGeneratedContent('')}>
                Clear
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIContentGenerator;
