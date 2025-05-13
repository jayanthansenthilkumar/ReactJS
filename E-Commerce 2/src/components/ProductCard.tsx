
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  showShopName?: boolean;
  shopName?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showShopName = false,
  shopName
}) => {
  const { addToCart } = useCart();

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md flex flex-col">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-green-500">
          ${product.price.toFixed(2)}
        </Badge>
      </div>
      <CardContent className="pt-4 flex-grow">
        <h3 className="font-medium text-lg">{product.name}</h3>
        {showShopName && shopName && (
          <div className="text-sm text-gray-500 mb-1">Shop: {shopName}</div>
        )}
        <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 pb-4 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          asChild
        >
          <Link to={`/product/${product.id}`}>
            <Info className="h-4 w-4 mr-2" />
            Details
          </Link>
        </Button>
        <Button 
          onClick={() => addToCart(product, 1)}
          size="sm"
          className="flex-1 bg-green-500 hover:bg-green-600"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
