
import React, { createContext, useContext, useState, useEffect } from "react";
import { Shop, Product } from "@/types";
import { useAuth } from "./AuthContext";
import { toast } from "@/components/ui/sonner";
import apiService from "@/utils/api";

interface ShopContextType {
  shops: Shop[];
  products: Product[];
  addShop: (shop: Omit<Shop, "id" | "approved" | "createdAt">) => Promise<Shop>;
  approveShop: (shopId: string) => Promise<Shop>;
  rejectShop: (shopId: string) => Promise<boolean>;
  addProduct: (product: Omit<Product, "id" | "createdAt">) => Promise<Product>;
  updateProduct: (productId: string, productData: Partial<Product>) => Promise<Product>;
  deleteProduct: (productId: string) => Promise<boolean>;
  getShopById: (shopId: string) => Promise<Shop | undefined>;
  getShopProducts: (shopId: string) => Promise<Product[]>;
  getProductById: (productId: string) => Promise<Product | undefined>;
  getShopsByOwner: (ownerId: string) => Promise<Shop[]>;
  getPendingShops: () => Promise<Shop[]>;
  fetchAllShops: (approved?: boolean) => Promise<Shop[]>;
  fetchAllProducts: () => Promise<Product[]>;
  isLoading: boolean;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch shops and products on initial load
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [shopsData, productsData] = await Promise.all([
          apiService.shops.getAll(),
          apiService.products.getAll()
        ]);
        
        setShops(shopsData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        toast.error("Failed to load shops and products data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchAllShops = async (approved = true) => {
    try {
      setIsLoading(true);
      const shopsData = await apiService.shops.getAll(approved);
      setShops(shopsData);
      return shopsData;
    } catch (error) {
      console.error("Error fetching shops:", error);
      toast.error("Failed to load shops data");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllProducts = async () => {
    try {
      setIsLoading(true);
      const productsData = await apiService.products.getAll();
      setProducts(productsData);
      return productsData;
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products data");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const addShop = async (shop: Omit<Shop, "id" | "approved" | "createdAt">) => {
    if (!user) throw new Error("You must be logged in to create a shop");

    try {
      setIsLoading(true);
      const newShop = await apiService.shops.create({
        ...shop,
        ownerId: user.id
      });
      
      setShops(prevShops => [...prevShops, newShop]);
      toast.success("Shop created! Pending approval.");
      return newShop;
    } catch (error) {
      console.error("Error creating shop:", error);
      toast.error("Failed to create shop");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const approveShop = async (shopId: string) => {
    try {
      setIsLoading(true);
      const updatedShop = await apiService.shops.approve(shopId);
      
      setShops(prevShops =>
        prevShops.map(shop =>
          shop.id === shopId ? updatedShop : shop
        )
      );
      
      toast.success("Shop approved successfully!");
      return updatedShop;
    } catch (error) {
      console.error("Error approving shop:", error);
      toast.error("Failed to approve shop");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const rejectShop = async (shopId: string) => {
    try {
      setIsLoading(true);
      await apiService.shops.delete(shopId);
      
      setShops(prevShops => 
        prevShops.filter(shop => shop.id !== shopId)
      );
      
      toast.success("Shop rejected and removed");
      return true;
    } catch (error) {
      console.error("Error rejecting shop:", error);
      toast.error("Failed to reject shop");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const addProduct = async (product: Omit<Product, "id" | "createdAt">) => {
    try {
      setIsLoading(true);
      const newProduct = await apiService.products.create(product);
      
      setProducts(prevProducts => [...prevProducts, newProduct]);
      toast.success("Product added successfully!");
      return newProduct;
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (productId: string, productData: Partial<Product>) => {
    try {
      setIsLoading(true);
      const updatedProduct = await apiService.products.update(productId, productData);
      
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === productId ? updatedProduct : product
        )
      );
      
      toast.success("Product updated successfully!");
      return updatedProduct;
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      setIsLoading(true);
      await apiService.products.delete(productId);
      
      setProducts(prevProducts => 
        prevProducts.filter(product => product.id !== productId)
      );
      
      toast.success("Product deleted successfully!");
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getShopById = async (shopId: string) => {
    try {
      return await apiService.shops.getById(shopId);
    } catch (error) {
      console.error("Error getting shop:", error);
      return undefined;
    }
  };

  const getShopProducts = async (shopId: string) => {
    try {
      return await apiService.products.getByShop(shopId);
    } catch (error) {
      console.error("Error getting shop products:", error);
      return [];
    }
  };

  const getProductById = async (productId: string) => {
    try {
      return await apiService.products.getById(productId);
    } catch (error) {
      console.error("Error getting product:", error);
      return undefined;
    }
  };

  const getShopsByOwner = async (ownerId: string) => {
    try {
      return await apiService.shops.getByOwner(ownerId);
    } catch (error) {
      console.error("Error getting owner shops:", error);
      return [];
    }
  };

  const getPendingShops = async () => {
    try {
      return await apiService.shops.getPendingApprovals();
    } catch (error) {
      console.error("Error getting pending shops:", error);
      return [];
    }
  };
  return (
    <ShopContext.Provider
      value={{
        shops,
        products,
        addShop,
        approveShop,
        rejectShop,
        addProduct,
        updateProduct,
        deleteProduct,
        getShopById,
        getShopProducts,
        getProductById,
        getShopsByOwner,
        getPendingShops,
        fetchAllShops,
        fetchAllProducts,
        isLoading
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
