'use client';

import { useCart } from '@/components/CartContext';
import { Main } from '@/components/Main';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sneakers } from '@/lib/types';
import { fetchProduct } from '@/lib/utils';
import { BadgeCheck, BadgeX, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

const DetailCard = ({
  sneakers: {
    id,
    original_picture_url: img,
    price,
    story_html: description,
    name,
    brand_name: brand,
    gender: genders,
  },
}: {
  sneakers: Sneakers;
}) => {
  const cart = useCart();
  const router = useRouter();
  const itemFromCart = cart.items.find((item) => item.id === id);
  const gender = genders?.[0];

  function handleAddToCart(id: number) {
    cart.addItem({ id });
    toast.success('Added to cart.', {
      icon: <BadgeCheck className="size-5 text-green-500" />,
      action: {
        label: 'Open Cart →',
        onClick: () => router.push('/cart'),
      },
    });
  }

  function handleRemoveFromCart(id: number) {
    cart.removeItem(id);
    toast.error('Removed from cart.', {
      icon: <BadgeX className="size-5 text-destructive" />,
    });
  }

  return (
    <Main>
      <Card className="relative mx-auto shadow-xl">
        <Button className="absolute left-0 top-2" variant="link" asChild>
          <Link href="/sneakers">
            <ChevronLeft className="size-4" /> Return
          </Link>
        </Button>
        <div className="grid grid-cols-1 gap-x-6 px-5 py-10 md:grid-cols-2">
          <div className="flex h-[220px] items-center justify-center">
            <Image
              src={img}
              width={350}
              height={350}
              alt="sneakers-preview"
              className="-my-8 h-[350px] w-[350px] max-w-none shrink-0 object-cover md:my-0"
            />
          </div>

          <div>
            <div className="text-sm uppercase text-muted-foreground">
              {gender}&apos;s {brand}
            </div>
            <h1 className="font-semibold uppercase md:text-2xl">{name}</h1>
            <div className="mt-3 line-clamp-4 flex-1 text-sm text-black md:mt-7 md:line-clamp-4">
              {description}
            </div>
          </div>

          <div className="relative mt-6 flex flex-wrap-reverse items-start justify-end gap-3 md:mt-0">
            <div className="absolute right-0 top-0 pb-2 text-right text-2xl font-semibold text-muted-foreground">
              ${price}
            </div>
            {itemFromCart ? (
              <Button
                size="lg"
                variant="destructive"
                className="relative"
                onClick={() => handleRemoveFromCart(id)}
              >
                REMOVE ITEM
              </Button>
            ) : (
              <Button
                size="lg"
                className="relative"
                onClick={() => handleAddToCart(id)}
              >
                ADD TO CART
              </Button>
            )}
          </div>
        </div>
      </Card>
    </Main>
  );
};

export default function SneakersDetail() {
  const { id } = useParams();
  const sneakers = fetchProduct(id as string);

  if (!sneakers) {
    return <div>Not Found</div>;
  }

  return <DetailCard sneakers={sneakers} />;
}
