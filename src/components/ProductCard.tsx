'use client';

import { useCart } from '@/components/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { BadgeCheck, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

export type ProductCardProps = {
  id: number;
  nickname: string;
  story_html: string;
  price: number;
  original_picture_url: string;
};

export const ProductCard = ({
  product: {
    id,
    nickname,
    story_html: description,
    price,
    original_picture_url: img,
  },
}: {
  product: ProductCardProps;
}) => {
  const cart = useCart();
  const itemFromCart = cart.items.find((item) => item.id === id);

  function handleAddToCart() {
    cart.addItem({ id });
    toast.success('Added to cart.', {
      icon: <BadgeCheck className="size-5 text-green-500" />,
    });
  }

  return (
    <Card className="w-72 bg-background hover:shadow-2xl">
      <div className="flex h-[200px] items-center justify-center">
        <Image src={img} alt={nickname} width={200} height={200} />
      </div>
      <CardContent>
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-mono truncate text-lg font-semibold tracking-tight">
            {nickname}
          </h3>
          <div className="text-lg font-semibold">${price}</div>
        </div>
        <p className="mt-1 line-clamp-4 overflow-hidden text-ellipsis leading-6">
          {description}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center gap-2">
          <Button
            className="flex-1 gap-2"
            size="sm"
            disabled={Boolean(itemFromCart)}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="size-4" />
            {itemFromCart ? 'In cart' : 'Add to cart'}
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/sneakers/${id}`}>Preview</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
