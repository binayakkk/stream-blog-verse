
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface GenerationRequest {
  prompt: string;
  type: 'title' | 'excerpt' | 'content' | 'improve';
  existingContent?: string;
}

export const useAIContentGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateContent = async ({ prompt, type, existingContent }: GenerationRequest): Promise<string | null> => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please provide a prompt for content generation.",
        variant: "destructive",
      });
      return null;
    }

    setIsGenerating(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: { prompt, type, existingContent },
      });

      if (error) {
        throw error;
      }

      if (!data?.generatedText) {
        throw new Error('No content generated');
      }

      toast({
        title: "Content Generated",
        description: `AI has successfully generated ${type} content.`,
      });

      return data.generatedText;
    } catch (error: any) {
      console.error('Error generating content:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate content. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateContent,
    isGenerating,
  };
};
