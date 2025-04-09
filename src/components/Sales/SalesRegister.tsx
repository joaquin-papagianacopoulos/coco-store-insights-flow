
import React, { useState, useEffect } from 'react';
import { Check, Search, Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Product, SaleItem, Sale } from '@/types';
import { toast } from 'sonner';
import { products as mockProducts } from '@/data/mockData';

interface SalesRegisterProps {
  onSaleComplete?: (sale: Sale) => void;
}

const SalesRegister: React.FC<SalesRegisterProps> = ({ onSaleComplete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<SaleItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'credit' | 'debit' | 'other'>('cash');
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    // In a real app, this would fetch from an API
    setProducts(mockProducts);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, products]);

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.productId === product.id);
    
    if (existingItem) {
      setCartItems(
        cartItems.map(item => 
          item.productId === product.id 
            ? { 
                ...item, 
                quantity: item.quantity + 1,
                total: (item.quantity + 1) * item.unitPrice 
              }
            : item
        )
      );
    } else {
      const newItem: SaleItem = {
        id: `temp-${Date.now()}`,
        productId: product.id,
        productName: product.name,
        quantity: 1,
        unitPrice: product.price,
        total: product.price
      };
      
      setCartItems([...cartItems, newItem]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };
  
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(
      cartItems.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              quantity: newQuantity,
              total: newQuantity * item.unitPrice 
            }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.total, 0);
  };

  const completeSale = () => {
    if (cartItems.length === 0) {
      toast.error('Cannot complete sale with empty cart');
      return;
    }

    const newSale: Sale = {
      id: `sale-${Date.now()}`,
      date: new Date().toISOString(),
      amount: calculateTotal(),
      items: cartItems,
      paymentMethod,
      ...(customerName && { customer: customerName })
    };

    // In a real app, this would send to an API
    if (onSaleComplete) {
      onSaleComplete(newSale);
    }

    toast.success('Sale completed successfully');
    
    // Reset the form
    setCartItems([]);
    setPaymentMethod('cash');
    setCustomerName('');
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Product Selection */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Select Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map(product => (
              <Button
                key={product.id}
                variant="outline"
                className="justify-start h-auto py-3 px-4"
                onClick={() => addToCart(product)}
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{product.name}</span>
                  <div className="flex justify-between w-full mt-1">
                    <span className="text-sm text-muted-foreground">${product.price.toFixed(2)}</span>
                    <span className={`text-xs ${product.stock < 5 ? 'text-destructive' : 'text-muted-foreground'}`}>
                      Stock: {product.stock}
                    </span>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cart & Checkout */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center text-lg">
            <span>Current Cart</span>
            <span className="text-sm font-normal text-muted-foreground">
              {cartItems.length} items
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 max-h-80 overflow-auto">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                <p>Cart is empty</p>
                <p className="text-sm">Add products to get started</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="w-8"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.productName}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >-</Button>
                          <span className="w-6 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >+</Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeFromCart(item.id)}
                          className="h-6 w-6 text-destructive"
                        >
                          <Trash size={14} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2 w-full">
            <Input 
              placeholder="Customer name" 
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <Select 
              value={paymentMethod} 
              onValueChange={(value: any) => setPaymentMethod(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="credit">Credit Card</SelectItem>
                  <SelectItem value="debit">Debit Card</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="w-full" 
                disabled={cartItems.length === 0}
              >
                Complete Sale
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Sale</DialogTitle>
                <DialogDescription>
                  Are you sure you want to complete this sale?
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={2} className="font-medium">Total</TableCell>
                      <TableCell className="text-right font-medium">${calculateTotal().toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <DialogFooter>
                <Button 
                  variant="default"
                  className="gap-2" 
                  onClick={completeSale}
                >
                  <Check size={16} />
                  Complete Sale
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SalesRegister;
