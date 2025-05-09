
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GrammarItem, LanguageOption } from '@/lib/data';
import { handlePlayAudio } from './grammarUtils';
import { GrammarCategory } from './grammarUtils';
import { toast } from '@/components/ui/use-toast';

// Import or define mock grammar data
import { getTamilGrammarData, getMalayalamGrammarData } from '@/lib/data';

interface GrammarContentProps {
  language: LanguageOption;
  category: GrammarCategory;
}

const GrammarContent = ({ language, category }: GrammarContentProps) => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  
  // Get appropriate grammar data based on language and category
  const getGrammarData = () => {
    if (language === 'tamil') {
      return getTamilGrammarData(category);
    } else {
      return getMalayalamGrammarData(category);
    }
  };
  
  const grammarItems = getGrammarData();
  
  const handlePlay = async (audioUrl: string | undefined, index: number, text: string) => {
    if (playingIndex !== null) return; // Already playing something
    
    setPlayingIndex(index);
    try {
      // Show a friendly toast message before playing
      toast({
        title: "Let's learn together!",
        description: `I'll help you pronounce this ${language === 'tamil' ? 'Tamil' : 'Malayalam'} example.`,
        duration: 3000,
      });
      
      await handlePlayAudio(audioUrl, 'example', language, text);
      
      // Show a success toast after playing
      toast({
        title: "Great job listening!",
        description: "Try repeating what you heard to practice your pronunciation.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error playing audio:', error);
    } finally {
      setPlayingIndex(null);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {grammarItems.map((item, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <Accordion type="single" collapsible>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger>
                  <h3 className={`text-xl font-semibold ${
                    language === 'tamil' ? 'text-tamil-dark' : 'text-malayalam-dark'
                  }`}>
                    {item.title}
                  </h3>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="py-2 px-1 space-y-4">
                    <p className="text-muted-foreground">{item.explanation}</p>
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Examples:</h4>
                      <div className="space-y-2">
                        {item.examples.map((example, exIndex) => (
                          <div 
                            key={exIndex}
                            className="bg-muted/30 p-3 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center"
                          >
                            <div className="flex-1">
                              <div className={`font-medium ${
                                language === 'tamil' ? 'font-tamil' : 'font-malayalam'
                              }`}>
                                {example.original}
                              </div>
                              <div className="text-sm text-muted-foreground">{example.transliteration}</div>
                              <div className="text-sm">{example.meaning}</div>
                            </div>
                            
                            <Button
                              size="icon"
                              variant="ghost"
                              className={`mt-2 sm:mt-0 ${playingIndex === exIndex + (index * 100) ? 'animate-pulse' : ''}`}
                              onClick={() => handlePlay(example.audioUrl, exIndex + (index * 100), example.original)}
                              disabled={playingIndex !== null}
                            >
                              <Volume2 className={playingIndex === exIndex + (index * 100) ? 'text-primary' : ''} />
                              <span className="sr-only">Play audio</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
};

export default GrammarContent;
