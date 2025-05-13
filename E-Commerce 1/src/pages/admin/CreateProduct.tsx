
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useShop } from "@/contexts/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { Package, UploadCloud } from "lucide-react";

const CreateProduct: React.FC = () => {
  const { user } = useAuth();
  const { addProduct, shops } = useShop();
  const navigate = useNavigate();

  // Find shops owned by the current user
  const userShops = shops.filter((shop) => shop.ownerId === user?.id);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
    inStock: "0",
    shopId: userShops.length > 0 ? userShops[0].id : "",
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (!formData.shopId) {
        toast.error("Please select a shop or create one first");
        return;
      }
      
      addProduct({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        imageUrl: formData.imageUrl,
        category: formData.category,
        inStock: parseInt(formData.inStock),
        shopId: formData.shopId,
      });
      
      toast.success("Product created successfully!");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  // Product categories
  const categories = [
    "Fruits", "Vegetables", "Dairy", "Bakery", "Organic", "Beverages"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Add New Product</h1>
        
        <div className="max-w-3xl mx-auto">
          {userShops.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Create a Shop First</CardTitle>
                <CardDescription>
                  You need to create a shop before you can add products.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  onClick={() => navigate("/admin/create-shop")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Create Shop
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Package className="mr-2 h-5 w-5 text-green-600" />
                  Product Information
                </CardTitle>
                <CardDescription>
                  Fill out the form below to add a new product to your shop.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter product name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          min="0.01"
                          step="0.01"
                          value={formData.price}
                          onChange={handleChange}
                          placeholder="0.00"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe your product"
                        rows={4}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleSelectChange("category", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="inStock">Quantity in Stock</Label>
                        <Input
                          id="inStock"
                          name="inStock"
                          type="number"
                          min="0"
                          value={formData.inStock}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="shop">Shop</Label>
                      <Select
                        value={formData.shopId}
                        onValueChange={(value) => handleSelectChange("shopId", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select shop" />
                        </SelectTrigger>
                        <SelectContent>
                          {userShops.map((shop) => (
                            <SelectItem key={shop.id} value={shop.id}>
                              {shop.name} {!shop.approved && "(Pending Approval)"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="imageUrl">Product Image</Label>
                      <div className="flex gap-2">
                        <Input
                          id="imageUrl"
                          name="imageUrl"
                          value={formData.imageUrl}
                          onChange={handleChange}
                          placeholder="https://example.com/image.jpg"
                          required
                        />
                        <Button type="button" variant="outline" className="flex-shrink-0">
                          <UploadCloud className="mr-2 h-4 w-4" />
                          Upload
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Provide an image URL or upload a new image.
                      </p>
                    </div>
                  </div>
                  
                  <CardFooter className="flex justify-end gap-2 px-0 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/admin/dashboard")}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      disabled={loading || formData.shopId === ""}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {loading ? "Adding..." : "Add Product"}
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateProduct;
