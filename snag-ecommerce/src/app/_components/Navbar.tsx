 "use client"
 import Link from "next/link";
import { useEffect, useState } from "react";
 import { useCartStore } from "~/lib/store/cartStore";

export function Navbar() {
        
        const [mounted, setMounted] = useState(false);
        const totalItems = useCartStore((state) => state.getTotalItems())

        useEffect(() => {
                setMounted(true);
        },[]);
  return (
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                    {/* Logo */}
                            <Link href="/" className="text-2xl font-bold text-blue-600">
                                      MyShop
                                              </Link>

                                                      {/* Navigation Links */}
                                                              <div className="flex items-center gap-6">
                                                                        <Link
                                                                                    href="/"
                                                                                                className="text-gray-600 transition-colors hover:text-gray-900"
                                                                                                          >
                                                                                                                      Products
                                                                                                                                </Link>
                                                                                                                                          
                                                                                                                                                    <Link 
                                                                                                                                                                href="/cart"
                                                                                                                                                                                className="relative rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
                                                                                                                                                                                        Cart 🛒 
                                                                                                                                                                                                { mounted && totalItems > 0 && (
                                                                                                                                                                                                        <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-sm font-bold text-blue-600">
                                                                                                                                                                                                                                {totalItems}
                                                                                                                                                                                                                                              </span>
                                                                                                                                                                                                                                              
                                                                                                                                                                                                )}
                                                                                                                                                                                </Link>
                                                                                                                                                                                            </div>
                                                                                                                                                                                           </div>
                                                                                                                                                                                                      </nav>
                                                                                                                                                                                                        );
                                                                                                                                                                                                        }