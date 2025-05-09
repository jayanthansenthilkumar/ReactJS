import { LanguageOption } from '@/lib/data';
import { playAudio, generateAudio } from '@/utils/audioUtils';
import { toast } from '@/components/ui/use-toast';

export type GrammarCategory = 'nouns' | 'verbs' | 'sentenceStructure' | 'adjectives';

export const getCategoryTitle = (language: LanguageOption, category: GrammarCategory): string => {
  switch (category) {
    case 'nouns':
      return language === 'tamil' ? 'பெயர்ச்சொல் (Nouns)' : 'നാമം (Nouns)';
    case 'verbs':
      return language === 'tamil' ? 'வினைச்சொல் (Verbs)' : 'ക്രിയ (Verbs)';
    case 'sentenceStructure':
      return language === 'tamil' ? 'வாக்கிய அமைப்பு (Sentence Structure)' : 'വാക്യ ഘടന (Sentence Structure)';
    case 'adjectives':
      return language === 'tamil' ? 'உரிச்சொல் (Adjectives)' : 'വിശേഷണം (Adjectives)';
    default:
      return 'Grammar';
  }
};

export const handlePlayAudio = async (audioUrl?: string, label: string = 'pronunciation', language: LanguageOption = 'tamil', text?: string) => {
  // Use our API key
  const apiKey = 'Uzi84l9Ggw2h7_XqjX9MHOM3HnPZSko2STYTkAp4eRk6';
  
  try {
    // If we have text, generate audio for it
    if (text) {
      toast({
        title: "Generating Audio",
        description: `Creating ${language} audio for you...`,
        duration: 2000,
      });
      
      const generatedAudioUrl = await generateAudio(text, language, apiKey);
      
      toast({
        title: "Audio Ready",
        description: `Playing ${language} pronunciation`,
        duration: 2000,
      });
      
      return playAudio(generatedAudioUrl);
    }
    
    // Otherwise fall back to the provided URL (legacy support)
    if (!audioUrl) {
      toast({
        title: "Audio Unavailable",
        description: `No audio available for this ${label}.`,
        variant: "destructive"
      });
      return Promise.reject(new Error('No audio URL or text provided'));
    }
    
    return playAudio(audioUrl);
  } catch (err) {
    toast({
      title: "Playback Error",
      description: "Could not generate or play the audio. Please try again.",
      variant: "destructive"
    });
    return Promise.reject(err);
  }
};
