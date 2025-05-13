import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Address } from "@/types";

interface CheckoutFormProps {
  defaultAddress: Address;
  onAddressChange: (address: Address) => void;
}

// List of US states
const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

const CheckoutForm: React.FC<CheckoutFormProps> = ({ 
  defaultAddress, 
  onAddressChange 
}) => {
  const [address, setAddress] = useState<Address>(defaultAddress);
  
  // Update parent component when address changes
  useEffect(() => {
    onAddressChange(address);
  }, [address, onAddressChange]);
  
  // Handle input changes
  const handleChange = (field: keyof Address) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddress({
      ...address,
      [field]: e.target.value
    });
  };
  
  // Handle select changes
  const handleSelectChange = (field: keyof Address) => (value: string) => {
    setAddress({
      ...address,
      [field]: value
    });
  };
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="street">Street Address</Label>
        <Input 
          id="street"
          value={address.street}
          onChange={handleChange("street")}
          placeholder="123 Main St"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input 
            id="city"
            value={address.city}
            onChange={handleChange("city")}
            placeholder="City"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="state">State</Label>
          <Select 
            value={address.state} 
            onValueChange={handleSelectChange("state")}
          >
            <SelectTrigger id="state">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {US_STATES.map(state => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input 
            id="zipCode"
            value={address.zipCode}
            onChange={handleChange("zipCode")}
            placeholder="12345"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="country">Country</Label>
          <Input 
            id="country"
            value={address.country}
            onChange={handleChange("country")}
            placeholder="Country"
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="(123) 456-7890"
          required
        />
      </div>
    </div>
  );
};

export default CheckoutForm;