'use client';
import * as React from "react";
import { BookOpenCheck, HandPlatter, Heart, PlusCircle, User } from "lucide-react";
import { HomeOutlined, MenuOutlined } from '@ant-design/icons';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function NavMenu() {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MenuOutlined />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="cursor-pointer flex gap-2 items-center" onClick={() => router.push('/page')}>
          <HomeOutlined size={15} className="mr-2" />
          <span>Home</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex gap-2 items-center" onClick={() => router.push('/restaurants/[restaurantId]')}>
          <HandPlatter size={15} className="mr-2" />
          <span>Restaurants</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex gap-2 items-center" onClick={() => router.push('/restaurants/bookings')}>
          <BookOpenCheck size={15} className="mr-2" />
          <span>Bookings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex gap-2 items-center" onClick={() => router.push('/favorites')}>
          <Heart size={15} className="mr-2" />
          <span>Favorites</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex gap-2 items-center" onClick={() => router.push('/dine-in')}>
          <User size={15} className="mr-2" />
          <span>Dine in</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex gap-2 items-center" onClick={() => router.push('/register-restaurants')}>
          <PlusCircle size={15} className="mr-2" />
          <span>Register Restaurants</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
