// prisma/seed.ts
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Wireless Headphones",
        price: 79.99,
        imageUrl:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        description: "Premium wireless headphones with noise cancellation",
        category: "Electronics",
      },
      {
        name: "Coffee Mug",
        price: 12.99,
        imageUrl:
          "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500",
        description: "Ceramic coffee mug, 12oz capacity",
        category: "Kitchen",
      },
      {
        name: "Notebook",
        price: 8.99,
        imageUrl:
          "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500",
        description: "Spiral bound notebook, 200 pages",
        category: "Stationery",
      },
      {
        name: "Backpack",
        price: 45.99,
        imageUrl:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        description: "Durable backpack with laptop compartment",
        category: "Accessories",
      },
    ],
    skipDuplicates: true, // This prevents errors if you run the seed multiple times
  });
  console.log("✅ Sample products have been created.");
}

// Execute and handle connection cleanup
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
