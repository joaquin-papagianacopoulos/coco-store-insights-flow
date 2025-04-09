
import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  AlertTriangle, 
  Edit, 
  Check, 
  X, 
  ChevronUp, 
  ChevronDown, 
  ArrowUpDown 
} from 'lucide-react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';

interface InventoryManagerProps {
  products: Product[];
  onUpdateStock?: (productId: string, newStock: number) => void;
}

type SortField = 'name' | 'category' | 'price' | 'stock';
type SortDirection = 'asc' | 'desc';

const InventoryManager: React.FC<InventoryManagerProps> = ({ products, onUpdateStock }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'category':
        comparison = a.category.localeCompare(b.category);
        break;
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'stock':
        comparison = a.stock - b.stock;
        break;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditValue(product.stock);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = (productId: string) => {
    if (onUpdateStock) {
      onUpdateStock(productId, editValue);
    }
    setEditingId(null);
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown size={14} />;
    return sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl flex gap-2 items-center">
          <Package className="h-5 w-5" />
          <span>Inventory Manager</span>
        </CardTitle>
        <Button variant="outline" size="sm">
          <Plus className="mr-1 h-4 w-4" />
          Add Product
        </Button>
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

        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-1">
                    <span>Product</span>
                    {renderSortIcon('name')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center gap-1">
                    <span>Category</span>
                    {renderSortIcon('category')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer text-right"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Price</span>
                    {renderSortIcon('price')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer text-right"
                  onClick={() => handleSort('stock')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Stock</span>
                    {renderSortIcon('stock')}
                  </div>
                </TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{product.name}</span>
                      <span className="text-xs text-muted-foreground">{product.description}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    {editingId === product.id ? (
                      <Input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(parseInt(e.target.value) || 0)}
                        className="w-20 text-right"
                        min={0}
                      />
                    ) : (
                      <div className="flex items-center justify-end gap-2">
                        {product.stock <= 15 && (
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                        )}
                        <span className={product.stock <= 5 ? "text-destructive font-medium" : ""}>
                          {product.stock}
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 justify-end">
                      {editingId === product.id ? (
                        <>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => saveEdit(product.id)}
                            className="h-7 w-7 text-primary"
                          >
                            <Check size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={cancelEdit}
                            className="h-7 w-7 text-muted-foreground"
                          >
                            <X size={16} />
                          </Button>
                        </>
                      ) : (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => startEdit(product)}
                          className="h-7 w-7"
                        >
                          <Edit size={16} />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryManager;
