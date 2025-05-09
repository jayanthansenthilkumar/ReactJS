
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TabsContent } from '@/components/ui/tabs';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LanguageTabs from '@/components/LanguageTabs';
import CategoryTabs from '@/components/grammar/CategoryTabs';
import GrammarContent from '@/components/grammar/GrammarContent';
import { getCategoryTitle } from '@/components/grammar/grammarUtils';
import { LanguageOption } from '@/lib/data';

type GrammarCategory = 'nouns' | 'verbs' | 'sentenceStructure' | 'adjectives';

const GrammarPage = () => {
  const navigate = useNavigate();
  const { language: langParam, category: categoryParam } = useParams();
  
  const [language, setLanguage] = useState<LanguageOption>(
    (langParam === 'tamil' || langParam === 'malayalam') ? langParam : 'tamil'
  );
  
  const [category, setCategory] = useState<GrammarCategory>(
    (categoryParam === 'nouns' || categoryParam === 'verbs' || 
     categoryParam === 'sentenceStructure' || categoryParam === 'adjectives') 
      ? categoryParam as GrammarCategory : 'nouns'
  );
  
  useEffect(() => {
    // Update URL when language or category changes
    if (langParam !== language || categoryParam !== category) {
      navigate(`/grammar/${language}/${category}`);
    }
  }, [language, category, navigate, langParam, categoryParam]);
  
  const handleLanguageChange = (value: LanguageOption) => {
    setLanguage(value);
  };
  
  const handleCategoryChange = (newCategory: GrammarCategory) => {
    setCategory(newCategory);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Grammar</h1>
            <p className="text-muted-foreground mb-8">
              Learn essential {language === 'tamil' ? 'Tamil' : 'Malayalam'} grammar rules and structures.
            </p>
          </motion.div>
          
          <LanguageTabs value={language} onTabChange={handleLanguageChange}>
            <TabsContent value="tamil" className="space-y-8">
              <CategoryTabs 
                language="tamil"
                currentCategory={category}
                onCategoryChange={handleCategoryChange}
              />
              
              <h2 className="text-2xl font-semibold mb-4">{getCategoryTitle(language, category)}</h2>
              
              <GrammarContent language={language} category={category} />
            </TabsContent>
            
            <TabsContent value="malayalam" className="space-y-8">
              <CategoryTabs 
                language="malayalam"
                currentCategory={category}
                onCategoryChange={handleCategoryChange}
              />
              
              <h2 className="text-2xl font-semibold mb-4">{getCategoryTitle(language, category)}</h2>
              
              <GrammarContent language={language} category={category} />
            </TabsContent>
          </LanguageTabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GrammarPage;
