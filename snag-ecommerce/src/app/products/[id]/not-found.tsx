import Link from "next/link";

export default function NotFound() {
  return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="text-center">
                    <h2 className="mb-4 text-4xl font-bold text-gray-900">
                              Product Not Found
                                      </h2>
                                              <p className="mb-8 text-gray-600">
                                                        Sorry, we couldn't find the product you're looking for.
                                                                </p>
                                                                        <Link
                                                                                  href="/"
                                                                                            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                                                                                                    >
                                                                                                             &larr; Back to Products
                                                                                                                      </Link>
                                                                                                                            </div>
                                                                                                                                </div>
                                                                                                                                  );
                                                                                                                                  }