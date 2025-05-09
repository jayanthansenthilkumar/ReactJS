
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopCard from "@/components/ShopCard";
import { useShop } from "@/contexts/ShopContext";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Shops: React.FC = () => {
  const { shops } = useShop();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter approved shops
  const approvedShops = shops
    .filter(shop => 
      shop.approved && 
      (searchTerm === "" || 
        shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Browse Shops</h1>

        {/* Search bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Search shops..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Shops grid */}
        {approvedShops.length > 0 ? (
          <div className="shop-grid">
            {approvedShops.map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border rounded-lg bg-gray-50">
            <p className="text-gray-500">
              {searchTerm ? "No shops found matching your search." : "No shops available yet."}
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Shops;
