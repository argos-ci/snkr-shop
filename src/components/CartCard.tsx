import products from '@/assets/data.json';
import { CartItem } from '@/lib/types';
import { Trash, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from './ui/button';
import { Card } from './ui/card';

export const CartCard = ({
  item,
  onRemove,
}: {
  item: CartItem;
  onRemove: (id: number) => void;
}) => {
  const product = products.find((product) => product.id === item.id);

  if (!product) return null;

  return (
    <Card key={item.id} className="bg-slate-100 p-4" role="listitem">
      <div className="flex h-[150] items-center">
        <Image
          src={product.original_picture_url}
          alt={product.name}
          width={160}
          height={160}
        />
      </div>

      <h4 className="mb-2 font-semibold">{product.name}</h4>
      <div className="relative line-clamp-3 items-end text-sm">
        {product.story_html}
      </div>

      <div className="mt-6 flex items-center justify-end gap-6">
        <div className="flex items-center gap-4">
          <div className="text-lg font-semibold">${product.price}</div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="mr-1 size-4" />
            Remove
          </Button>
        </div>
      </div>
    </Card>
  );
};
