import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useShop } from "@/contexts/ShopContext";
import ProductCard from "@/components/ProductCard";
import ShopCard from "@/components/ShopCard";

const Index: React.FC = () => {
  const { products, shops, getShopById } = useShop();
  
  // Get featured products (first 4)
  const featuredProducts = products
    .filter(product => {
      const shop = getShopById(product.shopId);
      return shop?.approved;
    })
    .slice(0, 4);
  
  // Get approved shops (first 3)
  const approvedShops = shops
    .filter(shop => shop.approved)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-500 text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Fresh Groceries Delivered to Your Door
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Shop from a variety of local stores at PriSona Mart and get your groceries delivered
                fresh and fast.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100"
                >
                  <Link to="/products">Shop Now</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-black hover:bg-white/20"
                >
                  <Link to="/shops">Browse Shops</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <CategoryCard 
                title="Fruits" 
                imageUrl="https://images.unsplash.com/photo-1610397153801-6b1bd900031d?auto=format&fit=crop&w=500&q=60"
                link="/products?category=Fruits"
              />
              <CategoryCard 
                title="Vegetables" 
                imageUrl="https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=500&q=60"
                link="/products?category=Vegetables"
              />
              <CategoryCard 
                title="Dairy" 
                imageUrl="https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=500&q=60"
                link="/products?category=Dairy"
              />
              <CategoryCard 
                title="Bakery" 
                imageUrl="https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=500&q=60"
                link="/products?category=Bakery"
              />
              <CategoryCard 
                title="Organic" 
                imageUrl="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=500&q=60"
                link="/products?category=Organic"
              />
              <CategoryCard 
                title="Beverages" 
                imageUrl="https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=500&q=60"
                link="/products?category=Beverages"
              />
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-12 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
              <Button asChild variant="ghost" className="text-green-600 hover:text-green-800">
                <Link to="/products">View all</Link>
              </Button>
            </div>
            
            {featuredProducts.length > 0 ? (
              <div className="product-grid">
                {featuredProducts.map((product) => {
                  const shop = getShopById(product.shopId);
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
              <div className="text-center py-12 border rounded-lg bg-green-50">
                <p className="text-green-600">No products available yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* Featured Shops Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Featured Shops</h2>
              <Button asChild variant="ghost" className="text-green-600 hover:text-green-800">
                <Link to="/shops">View all</Link>
              </Button>
            </div>
            
            {approvedShops.length > 0 ? (
              <div className="shop-grid">
                {approvedShops.map((shop) => (
                  <ShopCard key={shop.id} shop={shop} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg bg-green-50">
                <p className="text-green-600">No shops available yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">How PriSona Mart Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-semibold mb-3">Browse Products</h3>
                <p className="text-green-700">
                  Explore thousands of products from local vendors in our marketplace.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-semibold mb-3">Add to Cart</h3>
                <p className="text-green-700">
                  Select your items from multiple shops in a single order.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-semibold mb-3">Get Delivery</h3>
                <p className="text-green-700">
                  Receive your order fresh and on time at your doorstep.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">What Our Customers Say</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <TestimonialCard 
                name="Sarah Johnson"
                role="Regular Customer"
                quote="PriSona Mart has made grocery shopping so convenient. The produce is always fresh, and I love supporting local businesses!"
              />
              <TestimonialCard 
                name="Michael Patel"
                role="Shop Owner"
                quote="Being a vendor on PriSona Mart has helped me reach customers I never would have found otherwise. The platform is easy to use and very merchant-friendly."
              />
              <TestimonialCard 
                name="Emily Richardson"
                role="Premium Member"
                quote="The premium membership is worth every penny. Free delivery and exclusive discounts have saved me so much money over the past year."
              />
            </div>
          </div>
        </section>

        {/* Call to Action for Shop Owners */}
        <section className="py-16 bg-green-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Own a grocery store?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Register your shop on PriSona Mart and reach more customers. 
              It's easy to set up and start selling.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700"
            >
              <Link to="/register?role=admin">Register as Shop Owner</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Category Card Component
const CategoryCard: React.FC<{ title: string; imageUrl: string; link: string }> = ({ 
  title, 
  imageUrl, 
  link 
}) => {
  return (
    <Link to={link} className="group">
      <div className="overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
        <div className="aspect-square overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
        </div>
        <div className="p-3 text-center">
          <h3 className="font-medium">{title}</h3>
        </div>
      </div>
    </Link>
  );
};

// Testimonial Card Component
const TestimonialCard: React.FC<{ name: string; role: string; quote: string }> = ({
  name,
  role,
  quote
}) => {
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-green-200 rounded-full mr-4"></div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-green-600">{role}</p>
        </div>
      </div>
      <p className="italic text-green-700">"{quote}"</p>
    </div>
  );
};

export default Index;
