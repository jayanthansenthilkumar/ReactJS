
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useShop } from "@/contexts/ShopContext";
import { useCart } from "@/contexts/CartContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingCart, 
  Store, 
  Heart, 
  Share2, 
  Truck, 
  ArrowLeft,
  Minus,
  Plus
} from "lucide-react";
import ProductCard from "@/components/ProductCard";

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { getProductById, getShopById, products, getShopProducts } = useShop();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(productId || "");
  const shop = product ? getShopById(product.shopId) : undefined;
  
  // Get related products from the same shop and category
  const relatedProducts = product
    ? products
        .filter(
          (p) => 
            p.id !== product.id && 
            (p.shopId === product.shopId || p.category === product.category)
        )
        .slice(0, 4)
    : [];

  if (!product || !shop) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-6">The product you are looking for does not exist or has been removed.</p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= product.inStock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/products" className="flex items-center text-green-600 hover:text-green-700">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden border">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-auto object-cover aspect-square"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  {product.category}
                </Badge>
                {product.inStock < 10 && (
                  <Badge variant="outline" className="text-amber-500 border-amber-500">
                    Low Stock: {product.inStock} left
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</span>
              </div>
              
              <Link to={`/shop/${shop.id}`} className="inline-flex items-center text-sm text-gray-500 hover:text-green-600 mt-2">
                <Store className="h-4 w-4 mr-1" />
                {shop.name}
              </Link>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center space-x-4 mb-6">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-l-md rounded-r-none"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <div className="h-8 px-4 flex items-center justify-center border-t border-b">
                    {quantity}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-r-md rounded-l-none"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.inStock}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.inStock} available
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="pt-6 border-t">
              <div className="flex items-start space-x-2 text-sm text-gray-600">
                <Truck className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Free delivery on orders over $50</p>
                  <p>Estimated delivery: 2-4 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="details" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            <TabsTrigger value="vendor">About the Vendor</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="p-6 border rounded-md mt-2">
            <div className="space-y-4">
              <h3 className="font-semibold">Product Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Category</p>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Origin</p>
                  <p className="text-sm text-gray-500">Local Farm</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Storage</p>
                  <p className="text-sm text-gray-500">Keep refrigerated</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Shelf Life</p>
                  <p className="text-sm text-gray-500">7 days from delivery</p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="p-6 border rounded-md mt-2">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Shipping Policy</h3>
                <p className="text-sm text-gray-600 mt-1">
                  We offer free standard shipping on all orders over $50. For orders under $50, 
                  a flat rate shipping fee of $5.99 applies. Orders are typically processed within 
                  24 hours and delivered within 2-4 business days.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Return Policy</h3>
                <p className="text-sm text-gray-600 mt-1">
                  If you're not completely satisfied with your purchase, you may return it within 
                  7 days of delivery. Perishable items must be reported within 24 hours of delivery 
                  if damaged or incorrect. Please contact our customer service team to initiate a return.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="vendor" className="p-6 border rounded-md mt-2">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                {shop.logoUrl && (
                  <img 
                    src={shop.logoUrl} 
                    alt={shop.name} 
                    className="w-16 h-16 object-cover rounded-full"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-lg">{shop.name}</h3>
                  <Link to={`/shop/${shop.id}`} className="text-green-600 text-sm hover:underline">
                    Visit Shop
                  </Link>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {shop.description}
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => {
                const relatedShop = getShopById(relatedProduct.shopId);
                return (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                    showShopName={true}
                    shopName={relatedShop?.name}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
