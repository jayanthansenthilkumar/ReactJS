
import React, { createContext, useContext, useState, useEffect } from "react";
import { Shop, Product } from "@/types";
import { useAuth } from "./AuthContext";
import { toast } from "@/components/ui/sonner";

interface ShopContextType {
  shops: Shop[];
  products: Product[];
  addShop: (shop: Omit<Shop, "id" | "approved">) => void;
  approveShop: (shopId: string) => void;
  rejectShop: (shopId: string) => void;
  addProduct: (product: Omit<Product, "id">) => void;
  getShopById: (shopId: string) => Shop | undefined;
  getShopProducts: (shopId: string) => Product[];
  getProductById: (productId: string) => Product | undefined;
}

// Mock initial data
const initialShops: Shop[] = [
  {
    id: "1",
    name: "Fresh Market",
    description: "The freshest produce in town",
    ownerId: "2", // Admin
    logoUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=150",
    approved: true,
  },
  {
    id: "2",
    name: "Organic Paradise",
    description: "100% Organic products",
    ownerId: "2", // Admin
    logoUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=150",
    approved: false,
  },
];

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Organic Apples",
    description: "Fresh organic apples from local farms",
    price: 3.99,
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=300",
    category: "Fruits",
    shopId: "1",
    inStock: 50,
  },
  {
    id: "2",
    name: "Whole Wheat Bread",
    description: "Freshly baked whole wheat bread",
    price: 2.49,
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=300",
    category: "Bakery",
    shopId: "1",
    inStock: 20,
  },
  {
    id: "3",
    name: "Organic Milk",
    description: "Fresh organic milk from local farms",
    price: 4.99,
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80&w=300",
    category: "Dairy",
    shopId: "1",
    inStock: 30,
  },
];

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [shops, setShops] = useState<Shop[]>(initialShops);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("shops", JSON.stringify(shops));
  }, [shops]);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Load from localStorage on initial render
  useEffect(() => {
    const storedShops = localStorage.getItem("shops");
    if (storedShops) {
      setShops(JSON.parse(storedShops));
    }

    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const addShop = (shop: Omit<Shop, "id" | "approved">) => {
    if (!user) return;

    const newShop: Shop = {
      ...shop,
      id: `shop_${Date.now()}`,
      ownerId: user.id,
      approved: user.role === "superadmin", // Auto-approve if superadmin
    };

    setShops((prevShops) => [...prevShops, newShop]);
    toast.success("Shop created! Pending approval.");
  };

  const approveShop = (shopId: string) => {
    setShops((prevShops) =>
      prevShops.map((shop) =>
        shop.id === shopId ? { ...shop, approved: true } : shop
      )
    );
    toast.success("Shop approved successfully!");
  };

  const rejectShop = (shopId: string) => {
    setShops((prevShops) => prevShops.filter((shop) => shop.id !== shopId));
    toast.success("Shop rejected and removed.");
  };

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...product,
      id: `product_${Date.now()}`,
    };

    setProducts((prevProducts) => [...prevProducts, newProduct]);
    toast.success("Product added successfully!");
  };

  const getShopById = (shopId: string) => {
    return shops.find((shop) => shop.id === shopId);
  };

  const getShopProducts = (shopId: string) => {
    return products.filter((product) => product.shopId === shopId);
  };

  const getProductById = (productId: string) => {
    return products.find((product) => product.id === productId);
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
        getShopById,
        getShopProducts,
        getProductById,
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
