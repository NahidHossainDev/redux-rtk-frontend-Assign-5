import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useGetProductsQuery } from '@/redux/features/products/productApi';
import { useState } from 'react';

export default function Products() {
  const [inStock, setInStock] = useState(true);
  const [priceRange, setPriceRange] = useState([10, 100]);

  const handleSlider = (value: number[]) => {
    setPriceRange(value);
  };
  const handleSwitch = (value: boolean) => {
    value;
  };

  const { isLoading, data, isSuccess, refetch } = useGetProductsQuery({
    inStock,
    fromPrice: priceRange[0],
    toPrice: priceRange[1],
  });

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl uppercase">Availability</h1>
          <div className="flex items-center space-x-2 mt-3">
            <Switch
              id="in-stock"
              checked={inStock}
              onCheckedChange={handleSwitch}
            />
            <Label htmlFor="in-stock">In stock</Label>
          </div>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Price Range</h1>
          <div className="max-w-xl">
            <Slider
              defaultValue={priceRange}
              onValueChange={(value) => handleSlider(value)}
            />
          </div>
          <div>
            From {priceRange[0]}$ To {priceRange[1]}$
          </div>
        </div>
        <Button onClick={refetch}>Filter</Button>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {isLoading && <p>Loading...</p>}
        {data?.data?.length ? (
          data?.data?.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))
        ) : (
          <p className="text-center text-red-500 text-2xl">No data found!</p>
        )}
      </div>
    </div>
  );
}
