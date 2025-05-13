
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useShop } from "@/contexts/ShopContext";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Store,
  Map,
  Phone,
  Mail,
  ArrowLeft,
  FilterX,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ShopDetails: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const { getShopById, getShopProducts } = useShop();
  
  const shop = getShopById(shopId || "");
  const products = shop ? getShopProducts(shop.id) : [];
  
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("name_asc");
  
  // Get unique categories
  const categories = ["all", ...new Set(products.map(product => product.category))];
  
  // Filter and sort products
  const filteredProducts = products.filter(product => {
    // Filter by search term
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by category
    if (categoryFilter !== "all" && product.category !== categoryFilter) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    // Sort products
    switch (sortOption) {
      case "name_asc":
        return a.name.localeCompare(b.name);
      case "name_desc":
        return b.name.localeCompare(a.name);
      case "price_asc":
        return a.price - b.price;
      case "price_desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  if (!shop) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Shop Not Found</h1>
            <p className="mb-6">The shop you are looking for does not exist or has been removed.</p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link to="/shops">Browse Shops</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const shopHours = [
    { day: "Monday", hours: "9:00 AM - 6:00 PM" },
    { day: "Tuesday", hours: "9:00 AM - 6:00 PM" },
    { day: "Wednesday", hours: "9:00 AM - 6:00 PM" },
    { day: "Thursday", hours: "9:00 AM - 6:00 PM" },
    { day: "Friday", hours: "9:00 AM - 7:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 5:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Shop Header */}
        <div className="bg-green-700 text-white">
          <div className="container mx-auto px-4 py-12">
            <div className="mb-6">
              <Link to="/shops" className="flex items-center text-white/80 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Shops
              </Link>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-24 h-24 bg-white rounded-lg overflow-hidden flex-shrink-0">
                {shop.logoUrl ? (
                  <img
                    src={shop.logoUrl}
                    alt={shop.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <Store className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{shop.name}</h1>
                <p className="text-white/80 mb-4 max-w-2xl">{shop.description}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <Badge className="bg-white/20">Organic Produce</Badge>
                  <Badge className="bg-white/20">Local Farm</Badge>
                  <Badge className="bg-white/20">Free Delivery</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Shop Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg border p-6 sticky top-20">
                <h3 className="text-lg font-semibold mb-4">Shop Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Map className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-sm text-gray-600">123 Market Street, Farmville, CA 94123</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-gray-600">(555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-gray-600">info@{shop.name.toLowerCase().replace(/\s/g, '')}.com</p>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <Clock className="h-5 w-5 text-green-600" />
                    <h3 className="font-medium">Business Hours</h3>
                  </div>
                  <div className="space-y-2">
                    {shopHours.map((item) => (
                      <div key={item.day} className="flex justify-between text-sm">
                        <span className={item.day === "Sunday" ? "font-medium" : ""}>{item.day}</span>
                        <span className={item.hours === "Closed" ? "text-red-500" : "text-gray-600"}>
                          {item.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Products */}
            <div className="lg:col-span-9">
              <Tabs defaultValue="products" className="mb-8">
                <TabsList className="w-full">
                  <TabsTrigger value="products" className="flex-1">Products ({products.length})</TabsTrigger>
                  <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
                  <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="products" className="py-4">
                  <div className="bg-white rounded-lg border p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                      <div className="w-full md:w-2/5">
                        <label className="block text-sm font-medium mb-1">Search Products</label>
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                          <Input
                            placeholder="Search by product name..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="w-full md:w-1/4">
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <Select 
                          value={categoryFilter}
                          onValueChange={setCategoryFilter}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All Categories" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category === "all" ? "All Categories" : category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="w-full md:w-1/4">
                        <label className="block text-sm font-medium mb-1">Sort By</label>
                        <Select 
                          value={sortOption}
                          onValueChange={setSortOption}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sort by" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                            <SelectItem value="name_desc">Name (Z-A)</SelectItem>
                            <SelectItem value="price_asc">Price (Low to High)</SelectItem>
                            <SelectItem value="price_desc">Price (High to Low)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Button 
                          variant="ghost" 
                          className="flex items-center"
                          onClick={() => {
                            setSearchTerm("");
                            setCategoryFilter("all");
                            setSortOption("name_asc");
                          }}
                        >
                          <FilterX className="h-4 w-4 mr-1" />
                          Reset
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {filteredProducts.length > 0 ? (
                    <div className="product-grid">
                      {filteredProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">No Products Found</h3>
                      <p className="text-gray-600 mb-6">
                        {searchTerm 
                          ? "No products match your search criteria." 
                          : "This shop has no products yet."}
                      </p>
                      {searchTerm && (
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setSearchTerm("");
                            setCategoryFilter("all");
                          }}
                        >
                          Clear Filters
                        </Button>
                      )}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="about" className="py-4">
                  <div className="bg-white rounded-lg border p-6">
                    <h2 className="text-xl font-bold mb-4">About {shop.name}</h2>
                    <p className="mb-4">
                      {shop.description} We pride ourselves on offering the freshest produce directly from our farm to your table. 
                      Our commitment to sustainable farming practices ensures that all our products are of the highest quality.
                    </p>
                    <p className="mb-6">
                      Founded in 2018, {shop.name} has grown from a small family farm to one of the most trusted suppliers 
                      in the region. We work with local restaurants and grocers to ensure that our community has access to 
                      fresh, seasonal produce year-round.
                    </p>
                    
                    <h3 className="text-lg font-bold mb-2">Our Promise</h3>
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-700 mb-2">100% Organic</h4>
                        <p className="text-sm">All our products are grown without synthetic pesticides or fertilizers.</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-700 mb-2">Freshly Harvested</h4>
                        <p className="text-sm">Products are harvested daily for maximum freshness and flavor.</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-700 mb-2">Local & Sustainable</h4>
                        <p className="text-sm">Supporting local economy while minimizing environmental impact.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="py-4">
                  <div className="bg-white rounded-lg border p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">Customer Reviews</h2>
                      <Button className="bg-green-600 hover:bg-green-700">Write a Review</Button>
                    </div>
                    
                    <div className="mb-8">
                      <div className="flex items-center mb-2">
                        <div className="flex text-amber-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-lg font-semibold">4.8 out of 5</span>
                      </div>
                      <p className="text-gray-600">Based on 24 reviews</p>
                    </div>
                    
                    {/* Sample Reviews */}
                    <div className="space-y-6">
                      <div className="border-b pb-6">
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center">
                            <div className="font-bold mr-2">Sarah Johnson</div>
                            <div className="flex text-amber-400">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">May 3, 2023</div>
                        </div>
                        <p className="text-gray-700">
                          The produce from this shop is always fresh and flavorful. 
                          I especially love their organic apples and strawberries. Delivery was prompt and everything 
                          was packaged carefully.
                        </p>
                      </div>
                      
                      <div className="border-b pb-6">
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center">
                            <div className="font-bold mr-2">Michael Thompson</div>
                            <div className="flex text-amber-400">
                              {[1, 2, 3, 4].map((star) => (
                                <svg key={star} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">April 28, 2023</div>
                        </div>
                        <p className="text-gray-700">
                          Good selection of fresh vegetables. Would give 5 stars but delivery was slightly delayed.
                          Otherwise, quality products and fair prices.
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center">
                            <div className="font-bold mr-2">Emily Wilson</div>
                            <div className="flex text-amber-400">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">April 22, 2023</div>
                        </div>
                        <p className="text-gray-700">
                          I've been ordering from this shop weekly for the past few months, and I've never been disappointed. 
                          Their seasonal produce is exceptional, and I appreciate their commitment to organic farming.
                          Customer service is also excellent.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShopDetails;
