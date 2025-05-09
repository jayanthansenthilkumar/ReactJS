
import { Button } from '@/components/ui/button';
import { LanguageOption } from '@/lib/data';
import { GrammarCategory, getCategoryTitle } from './grammarUtils';

interface CategoryTabsProps {
  language: LanguageOption;
  currentCategory: GrammarCategory;
  onCategoryChange: (category: GrammarCategory) => void;
}

const CategoryTabs = ({ language, currentCategory, onCategoryChange }: CategoryTabsProps) => {
  const categories: GrammarCategory[] = ['nouns', 'verbs', 'sentenceStructure', 'adjectives'];
  
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {categories.map((category) => (
        <Button
          key={category}
          variant={currentCategory === category ? language : 'outline'}
          onClick={() => onCategoryChange(category)}
        >
          {getCategoryTitle(language, category)}
        </Button>
      ))}
    </div>
  );
};

export default CategoryTabs;
