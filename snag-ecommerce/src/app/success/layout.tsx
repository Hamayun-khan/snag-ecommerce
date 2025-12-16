import { Suspense } from "react";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}
