
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useShop } from "@/contexts/ShopContext";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";

const Products: React.FC = () => {
  const { products, shops } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [selectedShop, setSelectedShop] = useState(searchParams.get("shop") || "all");
  const [sortOption, setSortOption] = useState(searchParams.get("sort") || "default");

  // Get unique categories
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  // Get approved shops
  const approvedShops = shops.filter((shop) => shop.approved);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const shop = shops.find((s) => s.id === product.shopId);
    
    // Filter by shop approval status
    if (!shop || !shop.approved) return false;

    // Filter by search term
    const matchesSearch = !searchTerm || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by category
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

    // Filter by shop
    const matchesShop = selectedShop === 'all' || product.shopId === selectedShop;

    return matchesSearch && matchesCategory && matchesShop;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  // Update search params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedCategory !== 'all') params.set("category", selectedCategory);
    if (selectedShop !== 'all') params.set("shop", selectedShop);
    if (sortOption !== "default") params.set("sort", sortOption);
    setSearchParams(params);
  }, [searchTerm, selectedCategory, selectedShop, sortOption, setSearchParams]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The effect above will update the URL params
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedShop("all");
    setSortOption("default");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Browse Products</h1>

        {/* Search and filters */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium block mb-2">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium block mb-2">Shop</label>
              <Select value={selectedShop} onValueChange={setSelectedShop}>
                <SelectTrigger>
                  <SelectValue placeholder="All Shops" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Shops</SelectItem>
                  {approvedShops.map((shop) => (
                    <SelectItem key={shop.id} value={shop.id}>
                      {shop.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium block mb-2">Sort By</label>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button variant="ghost" onClick={clearFilters} size="sm" className="text-indigo-600">
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Products grid */}
        <div className="mb-4 px-1 py-2 bg-gray-50 rounded-md flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {sortedProducts.length} products
          </div>
          <div className="text-sm text-gray-500">
            {selectedCategory !== 'all' ? `Category: ${selectedCategory}` : ''}
            {selectedCategory !== 'all' && selectedShop !== 'all' ? ' | ' : ''}
            {selectedShop !== 'all' ? `Shop: ${approvedShops.find(s => s.id === selectedShop)?.name}` : ''}
          </div>
        </div>

        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => {
              const shop = shops.find((s) => s.id === product.shopId);
              return (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  showShopName={true}
                  shopName={shop?.name}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 border rounded-lg bg-gray-50">
            <p className="text-gray-500">No products found matching your criteria.</p>
            <Button 
              variant="link" 
              onClick={clearFilters}
              className="mt-2 text-indigo-600"
            >
              Clear filters and try again
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Products;
