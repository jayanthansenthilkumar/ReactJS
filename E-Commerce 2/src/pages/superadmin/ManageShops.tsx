import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Shop } from "@/types";
import apiService from "@/utils/api";
import { formatDate } from "@/utils/formatters";
import { toast } from "@/components/ui/sonner";
import { 
  Search, 
  MoreVertical, 
  Eye, 
  CheckCircle, 
  XCircle,
  Filter,
  Store
} from "lucide-react";

const ManageShops: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [approvalFilter, setApprovalFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    // Ensure only superadmins can access this page
    if (user?.role !== "superadmin") {
      navigate("/");
      return;
    }

    const fetchShops = async () => {
      try {
        setLoading(true);
        // Get all shops including unapproved ones
        const allShops = await apiService.shops.getAll(false);
        setShops(allShops);
      } catch (error) {
        console.error("Error fetching shops:", error);
        toast.error("Failed to load shops");
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, [user, navigate]);

  const handleApproveShop = async (shopId: string) => {
    try {
      await apiService.shops.approve(shopId);
      
      // Update local state
      setShops(shops.map(shop => 
        shop.id === shopId ? { ...shop, approved: true } : shop
      ));
      
      toast.success("Shop approved successfully");
    } catch (error) {
      console.error("Error approving shop:", error);
      toast.error("Failed to approve shop");
    }
  };

  const handleDeleteShop = async (shopId: string) => {
    if (!confirm("Are you sure you want to delete this shop? This action cannot be undone.")) {
      return;
    }
    
    try {
      await apiService.shops.delete(shopId);
      
      // Update local state
      setShops(shops.filter(shop => shop.id !== shopId));
      
      toast.success("Shop deleted successfully");
    } catch (error) {
      console.error("Error deleting shop:", error);
      toast.error("Failed to delete shop");
    }
  };

  // Filter shops based on approval status and search term
  const filteredShops = shops
    .filter(shop => {
      if (approvalFilter === "all") return true;
      if (approvalFilter === "approved") return shop.approved;
      if (approvalFilter === "pending") return !shop.approved;
      return true;
    })
    .filter(shop => {
      if (!searchTerm) return true;
      
      const search = searchTerm.toLowerCase();
      return (
        shop.name.toLowerCase().includes(search) ||
        shop.description.toLowerCase().includes(search) ||
        shop.ownerId.toLowerCase().includes(search)
      );
    });

  // Calculate shop statistics
  const approvedShops = shops.filter(shop => shop.approved).length;
  const pendingShops = shops.filter(shop => !shop.approved).length;

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Shops</h1>

      {/* Shop Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Shops
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shops.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Approved Shops
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedShops}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Approval
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingShops}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search shops..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full sm:w-48">
          <Select value={approvalFilter} onValueChange={setApprovalFilter}>
            <SelectTrigger>
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Shops</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending Approval</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Shops Table */}
      {loading ? (
        <div className="text-center py-8">Loading shops...</div>
      ) : filteredShops.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg border">
          <Store className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">No Shops Found</h3>
          <p className="text-gray-500">
            {approvalFilter !== "all" 
              ? `No ${approvalFilter} shops found.` 
              : "No shops match your search criteria."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead>Shop Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredShops.map((shop) => (
                <TableRow key={shop.id}>
                  <TableCell>
                    <div className="h-10 w-10 rounded-full bg-gray-100 overflow-hidden">
                      <img 
                        src={shop.logoUrl} 
                        alt={shop.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{shop.name}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {shop.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{shop.ownerId}</TableCell>
                  <TableCell>{formatDate(shop.createdAt)}</TableCell>
                  <TableCell>
                    <Badge className={shop.approved ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>
                      {shop.approved ? "Approved" : "Pending Approval"}
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
                        <DropdownMenuItem onClick={() => navigate(`/shops/${shop.id}`)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Shop
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {!shop.approved && (
                          <DropdownMenuItem onClick={() => handleApproveShop(shop.id)}>
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                            Approve Shop
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem 
                          onClick={() => handleDeleteShop(shop.id)}
                          className="text-red-500"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Delete Shop
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

export default ManageShops;