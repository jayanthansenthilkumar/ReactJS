
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shop } from "@/types";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface ShopCardProps {
  shop: Shop;
  isAdmin?: boolean;
  onApprove?: (shopId: string) => void;
  onReject?: (shopId: string) => void;
}

const ShopCard: React.FC<ShopCardProps> = ({ 
  shop, 
  isAdmin = false, 
  onApprove, 
  onReject 
}) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="relative">
        <div className="h-36 bg-gray-100 flex items-center justify-center">
          {shop.logoUrl ? (
            <img
              src={shop.logoUrl}
              alt={shop.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400">No Image</div>
          )}
        </div>
        {!shop.approved && (
          <Badge 
            variant="secondary" 
            className="absolute top-2 right-2 bg-orange-500 text-white"
          >
            Pending Approval
          </Badge>
        )}
      </div>
      <CardContent className="pt-4">
        <h3 className="font-medium text-lg">{shop.name}</h3>
        <p className="text-gray-500 text-sm line-clamp-2">{shop.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 pb-4">
        {isAdmin && !shop.approved ? (
          <div className="flex gap-2 w-full">
            <Button 
              onClick={() => onApprove?.(shop.id)} 
              variant="outline" 
              size="sm"
              className="flex-1 text-green-500 border-green-500 hover:bg-green-50"
            >
              Approve
            </Button>
            <Button 
              onClick={() => onReject?.(shop.id)} 
              variant="outline" 
              size="sm"
              className="flex-1 text-red-500 border-red-500 hover:bg-red-50"
            >
              Reject
            </Button>
          </div>
        ) : (
          <Button 
            variant="default" 
            size="sm"
            className="w-full bg-green-500 hover:bg-green-600"
            asChild
            disabled={!shop.approved}
          >
            <Link to={`/shop/${shop.id}`}>
              {shop.approved ? "Visit Shop" : "Awaiting Approval"}
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ShopCard;
