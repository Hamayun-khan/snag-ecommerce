import { api} from "~/trpc/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AddToCartButton } from "~/app/_components/AddToCartButton";

export default async function ProductPage({
     params,
}: {
    params: Promise<{ id: string}>;
})
{
     const { id } = await params
     const product = await api.product.getById({ id })


    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <Link href="/ " className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800">
                    &larr; Back to Products 
                </Link>

                        {/* Product Detail */}
                                <div className="grid gap-8 md:grid-cols-2">
                                          {/* Image */}
                                                    <div className="overflow-hidden rounded-lg bg-white shadow-lg">
                                                                <img
                                                                              src={product.imageUrl}
                                                                                            alt={product.name}
                                                                                                          className="h-[500px] w-full object-cover"
                                                                                                                      />
                                                                                                                                </div>

                                                                                                                                          {/* Details */}
                                                                                                                                                    <div className="flex flex-col">
                                                                                                                                                                <div className="rounded-lg bg-white p-8 shadow-lg">
                                                                                                                                                                              <span className="mb-3 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-800">
                                                                                                                                                                                              {product.category}
                                                                                                                                                                                                            </span>
                                                                                                                                                                                                                          
                                                                                                                                                                                                                                        <h1 className="mb-4 text-4xl font-bold text-gray-900">
                                                                                                                                                                                                                                                        {product.name}
                                                                                                                                                                                                                                                                      </h1>
                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                  <p className="mb-6 text-lg text-gray-600">
                                                                                                                                                                                                                                                                                                                  {product.description}
                                                                                                                                                                                                                                                                                                                                </p>
                                                                                                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                                                                                                            <div className="mb-8 border-t border-gray-200 pt-6">
                                                                                                                                                                                                                                                                                                                                                                            <p className="text-5xl font-bold text-blue-600">
                                                                                                                                                                                                                                                                                                                                                                                              ${product.price.toFixed(2)}
                                                                                                                                                                                                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                                                                                                                                                                                                            </div>

<div className="mb-6 flex items-center gap-4">
{
    product.inStock ? (
        <span className="flex items-center text-green-600">
            <span className="mr-2 text-2xl"> &#10004;
                In Stock ({product.stock} available)
                 </span>
        </span>
    ) : (
        <span className="flex items-center text-red-600">
             <span className=" mr-2 text-2xl"> &#1008;
                Out of Stock
                 </span>
        </span>
    )
}
</div>
                                                                                                                                                                                                                                                                                                                                                                                                                                          {/* We'll add "Add to Cart" button in Phase 3 */}
                                                                                                                                                                                                                                                                                                                                                                                                                                                        <button disabled={!product.inStock}
                                                                                                                                                                                                                                                                                                                                                                                                                                                         className={`w-full rounded-lg px-8 py-4 text-lg font-semibold text-white transition-colors ${
                                                                                                                                                                                                                                                                                                                                                                                                                                                                product.inStock
                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ? "bg-blue-600 hover:bg-blue-700"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            : "cursor-not-allowed bg-gray-400"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              }`}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              >
                                                                                                                                                                                                                                                                                                                                                                                                                                                        {product.inStock ? "Add to Cart (Coming Soon)" : "Out of Stock"}
                                                                                                                                                                                                                                                                                                                                                                                                                                                        </button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <AddToCartButton product={product} />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <p className="mt-4 text-center text-sm text-gray-500">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  Free shipping on orders over $50
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </div>
            </div>
        </main>
    )
}