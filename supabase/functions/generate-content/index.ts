
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, type, existingContent } = await req.json();

    let systemPrompt = '';
    let userPrompt = '';

    switch (type) {
      case 'title':
        systemPrompt = 'You are a creative blog title generator. Generate catchy, SEO-friendly titles that capture attention and accurately represent the content.';
        userPrompt = `Generate 3 engaging blog post titles for the following topic or content: ${prompt}`;
        break;
      case 'excerpt':
        systemPrompt = 'You are a blog excerpt writer. Create compelling, concise excerpts that summarize the main points and entice readers.';
        userPrompt = `Create a compelling excerpt (2-3 sentences, max 150 words) for this blog post: ${prompt}`;
        break;
      case 'content':
        systemPrompt = 'You are a professional blog content writer. Write engaging, informative, and well-structured blog posts with proper headings, paragraphs, and flow.';
        userPrompt = `Write a comprehensive blog post about: ${prompt}. Include an introduction, main sections with headings (use ## for headings), and a conclusion. Make it engaging and informative.`;
        break;
      case 'improve':
        systemPrompt = 'You are an expert content editor. Improve the existing content by making it more engaging, clear, and well-structured while maintaining the original meaning.';
        userPrompt = `Improve this blog post content: ${existingContent}`;
        break;
      default:
        throw new Error('Invalid generation type');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: type === 'content' ? 2000 : 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content;

    return new Response(JSON.stringify({ generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-content function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
