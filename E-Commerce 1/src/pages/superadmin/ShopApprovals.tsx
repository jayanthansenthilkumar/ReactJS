
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useShop } from "@/contexts/ShopContext";
import { Link } from "react-router-dom";
import {
  Store,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ShopApprovals: React.FC = () => {
  const { shops, approveShop, rejectShop } = useShop();
  const [filterStatus, setFilterStatus] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Apply filters
  const filteredShops = shops.filter(shop => {
    // Filter by status
    if (filterStatus === "pending" && shop.approved) return false;
    if (filterStatus === "approved" && !shop.approved) return false;
    
    // Filter by search term
    if (searchTerm && !shop.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost"
            size="icon"
            asChild
            className="mr-4"
          >
            <Link to="/superadmin/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Shop Approvals</h1>
            <p className="text-gray-500">Manage shop registration approvals and reviews</p>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full md:w-1/3 space-y-2">
              <Label htmlFor="search">Search Shops</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="search"
                  placeholder="Search by shop name..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="w-full md:w-1/4 space-y-2">
              <Label htmlFor="status-filter">Filter by Status</Label>
              <Select 
                value={filterStatus}
                onValueChange={setFilterStatus}
              >
                <SelectTrigger id="status-filter" className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Shops</SelectItem>
                  <SelectItem value="pending">Pending Approval</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-auto">
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops.length > 0 ? (
            filteredShops.map((shop) => (
              <Card key={shop.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle>{shop.name}</CardTitle>
                      <CardDescription>Owner ID: {shop.ownerId}</CardDescription>
                    </div>
                    <Badge 
                      className={shop.approved ? "bg-green-500" : "bg-amber-500"}
                    >
                      {shop.approved ? "Approved" : "Pending"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-100 rounded-md mb-4 overflow-hidden">
                    {shop.logoUrl ? (
                      <img 
                        src={shop.logoUrl} 
                        alt={shop.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Store className="h-10 w-10 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm">{shop.description}</p>
                    
                    {!shop.approved && (
                      <div className="flex space-x-2 pt-4">
                        <Button 
                          onClick={() => approveShop(shop.id)} 
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                        <Button 
                          onClick={() => rejectShop(shop.id)} 
                          variant="outline"
                          className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-gray-50 rounded-lg">
              <Store className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No shops found</h3>
              <p className="text-gray-500">
                {searchTerm ? "Try adjusting your search term" : 
                  filterStatus === "pending" ? "No shops pending approval" : 
                  filterStatus === "approved" ? "No approved shops yet" : 
                  "No shops available"}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShopApprovals;
