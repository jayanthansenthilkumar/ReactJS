import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useShop } from "@/contexts/ShopContext";
import { Shop, Product, Category } from "@/types";
import apiService from "@/utils/api";
import { formatPrice } from "@/utils/formatters";
import { toast } from "@/components/ui/sonner";
import { 
  Package, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash, 
  PlusCircle, 
  Tag, 
  Filter,
  ShoppingBag
} from "lucide-react";

const ManageProducts: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedShop, setSelectedShop] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    // Ensure only admins/superadmins can access this page
    if (user && user.role !== "admin" && user.role !== "superadmin") {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch shops owned by current user (for admin)
        // Or all shops (for superadmin)
        let userShops: Shop[];
        if (user?.role === "superadmin") {
          userShops = await apiService.shops.getAll(false); // Get all shops including unapproved
        } else {
          userShops = await apiService.shops.getByOwner(user?.id || "");
        }
        
        setShops(userShops);
        
        // Select the first shop by default
        if (userShops.length > 0 && !selectedShop) {
          setSelectedShop(userShops[0].id);
        }
        
        // Fetch categories
        const allCategories = await apiService.categories.getAll();
        setCategories(allCategories);
        
      } catch (error) {
        console.error("Error fetching initial data:", error);
        toast.error("Failed to load shop data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);
  
  // Fetch products whenever selected shop changes
  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedShop) return;
      
      try {
        setLoading(true);
        const shopProducts = await apiService.products.getByShop(selectedShop);
        setProducts(shopProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [selectedShop]);

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }
    
    try {
      await apiService.products.delete(productId);
      
      // Update local state
      setProducts(products.filter(product => product.id !== productId));
      
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  // Filter products based on category and search term
  const filteredProducts = products
    .filter(product => categoryFilter === "all" || product.category === categoryFilter)
    .filter(product => {
      if (!searchTerm) return true;
      
      const search = searchTerm.toLowerCase();
      return (
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
      );
    });

  // Get category name by ID
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <Button asChild className="bg-green-500 hover:bg-green-600">
          <Link to="/admin/create-product">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Product
          </Link>
        </Button>
      </div>

      {/* Shop Selection */}
      {shops.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Select Shop</label>
          <Select value={selectedShop} onValueChange={setSelectedShop}>
            <SelectTrigger className="w-full md:w-72">
              <SelectValue placeholder="Select a shop" />
            </SelectTrigger>
            <SelectContent>
              {shops.map((shop) => (
                <SelectItem key={shop.id} value={shop.id}>
                  {shop.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full sm:w-48">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by category" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Table */}
      {loading ? (
        <div className="text-center py-8">Loading products...</div>
      ) : !selectedShop ? (
        <div className="text-center py-8 bg-white rounded-lg border">
          <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">No Shop Selected</h3>
          <p className="text-gray-500 mb-6">
            {shops.length > 0 
              ? "Please select a shop to view its products" 
              : "You don't have any shops yet"}
          </p>
          {shops.length === 0 && (
            <Button asChild>
              <Link to="/admin/create-shop">Create a Shop</Link>
            </Button>
          )}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg border">
          <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">No Products Found</h3>
          <p className="text-gray-500 mb-6">
            {categoryFilter !== "all" 
              ? `No products in the selected category` 
              : "This shop doesn't have any products yet"}
          </p>
          <Button asChild>
            <Link to="/admin/create-product">Add Product</Link>
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="h-12 w-12 rounded-md bg-gray-100 overflow-hidden">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {product.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {getCategoryName(product.category)}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell>
                  <TableCell>
                    <Badge className={product.inStock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {product.inStock > 0 ? `${product.inStock} in stock` : "Out of stock"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem 
                          onClick={() => navigate(`/products/${product.id}`)}
                        >
                          View Product
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => navigate(`/admin/edit-product/${product.id}`)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-500"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Product
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;