'use client';

import { MenuGroup } from "@/lib/sfcc/types";
import CartModal from "components/cart/modal";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";

interface NavbarProps {
  menuGroups: MenuGroup[];
  siteName: string;
}

export default function Navbar({ menuGroups, siteName }: NavbarProps) {
  // Transform MenuGroup[] to Menu[] for MobileMenu
  const mobileMenuItems = menuGroups.flatMap(group => 
    group.links.map(link => ({
      title: link.title,
      path: link.path
    }))
  );

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={mobileMenuItems} />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <Image 
              src="/static/img/brand-logo.png"
              alt="Western Trail Outfitters Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
              priority
            />
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden">
              {siteName}
            </div>
          </Link>
          {menuGroups.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menuGroups.map((item: MenuGroup) => (
                <li key={item.handle}>
                  <Link
                    href={item.links[0]?.path || ''}
                    prefetch={true}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.links[0]?.title || ''}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
        <div className="flex justify-end md:w-1/3">
          <CartModal />
        </div>
      </div>
    </nav>
  );
}
