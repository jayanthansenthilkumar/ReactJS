
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Category } from '../data/books';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/category/${category.slug}`}>
      <Card className="category-pill overflow-hidden border border-border hover:border-primary/50 transition-colors h-full">
        <CardContent className="p-6 h-full">
          <h3 className="text-xl font-serif font-medium mb-2">{category.name}</h3>
          <p className="text-sm text-muted-foreground">{category.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
