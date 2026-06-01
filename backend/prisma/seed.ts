import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const demoProducts = [
  {
    name: 'Essence Mascara Lash Princess',
    description: '[beauty] The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
    price: 9.99,
    stock: 99,
    imageUrl: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
  },
  {
    name: 'Eyeshadow Palette with Mirror',
    description: '[beauty] The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it is convenient for on-the-go makeup application.',
    price: 19.99,
    stock: 34,
    imageUrl: 'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp',
  },
  {
    name: 'Powder Canister',
    description: '[beauty] The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.',
    price: 14.99,
    stock: 89,
    imageUrl: 'https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp',
  },
  {
    name: 'Red Lipstick',
    description: 'A classic and bold choice for adding a pop of color, with a creamy and pigmented formula that provides a vibrant, long-lasting finish.',
    price: 12.99,
    stock: 91,
    imageUrl: 'https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp',
  },
  {
    name: 'Red Nail Polish',
    description: 'A rich and glossy red hue for polished nails, with a quick-drying formula that provides a salon-quality finish at home.',
    price: 8.99,
    stock: 79,
    imageUrl: 'https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp',
  },
  {
    name: 'Calvin Klein CK One',
    description: '[fragrances] CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It is a versatile fragrance suitable for everyday wear.',
    price: 49.99,
    stock: 29,
    imageUrl: 'https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp',
  },
  {
    name: 'Chanel Coco Noir Eau De',
    description: '[fragrances] Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.',
    price: 129.99,
    stock: 58,
    imageUrl: 'https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp',
  },
  {
    name: "Dior J'adore",
    description: "[fragrances] J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
    price: 89.99,
    stock: 98,
    imageUrl: "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/thumbnail.webp",
  },
  {
    name: 'Dolce Shine Eau de',
    description: '[fragrances] Dolce Shine by Dolce and Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It is a joyful and youthful scent.',
    price: 69.99,
    stock: 4,
    imageUrl: 'https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/thumbnail.webp',
  },
  {
    name: 'Gucci Bloom Eau de',
    description: '[fragrances] Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It is a modern and romantic scent.',
    price: 79.99,
    stock: 91,
    imageUrl: 'https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/thumbnail.webp',
  },
  {
    name: 'Annibale Colombo Bed',
    description: '[furniture] The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.',
    price: 1899.99,
    stock: 88,
    imageUrl: 'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp',
  },
  {
    name: 'Annibale Colombo Sofa',
    description: '[furniture] The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.',
    price: 2499.99,
    stock: 60,
    imageUrl: 'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp',
  },
  {
    name: 'Bedside Table African Cherry',
    description: '[furniture] A stylish and functional bedside table in African Cherry, providing convenient storage space and a touch of elegance.',
    price: 299.99,
    stock: 64,
    imageUrl: 'https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/thumbnail.webp',
  },
  {
    name: 'Knoll Saarinen Executive Conference Chair',
    description: '[furniture] A modern and ergonomic chair for an office or conference room, with a clean, timeless design.',
    price: 499.99,
    stock: 26,
    imageUrl: 'https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/thumbnail.webp',
  },
  {
    name: 'Wooden Bathroom Sink With Mirror',
    description: '[furniture] A unique bathroom fixture with a wooden sink countertop and a matching mirror for a warm, modern finish.',
    price: 799.99,
    stock: 7,
    imageUrl: 'https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/thumbnail.webp',
  },
  {
    name: 'Decoration Swing',
    description: '[home-decoration] A charming decor piece crafted with intricate details, adding elegance and a playful accent to any room.',
    price: 59.99,
    stock: 47,
    imageUrl: 'https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/thumbnail.webp',
  },
  {
    name: 'Family Tree Photo Frame',
    description: '[home-decoration] A sentimental and stylish way to display cherished family memories with multiple photo slots.',
    price: 29.99,
    stock: 77,
    imageUrl: 'https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/thumbnail.webp',
  },
  {
    name: 'House Showpiece Plant',
    description: '[home-decoration] An artificial plant that brings a touch of nature to the home without maintenance, adding greenery and style to any space.',
    price: 39.99,
    stock: 28,
    imageUrl: 'https://cdn.dummyjson.com/product-images/home-decoration/house-showpiece-plant/thumbnail.webp',
  },
  {
    name: 'Plant Pot',
    description: '[home-decoration] A stylish container for indoor or outdoor plants, with a sleek design that complements modern decor.',
    price: 14.99,
    stock: 59,
    imageUrl: 'https://cdn.dummyjson.com/product-images/home-decoration/plant-pot/thumbnail.webp',
  },
  {
    name: 'Table Lamp',
    description: '[home-decoration] A functional and decorative lighting solution with a modern design for ambient and task lighting.',
    price: 49.99,
    stock: 9,
    imageUrl: 'https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/thumbnail.webp',
  },
  {
    name: 'Bamboo Spatula',
    description: '[kitchen-accessories] A versatile kitchen tool made from eco-friendly bamboo, ideal for flipping, stirring, and serving various dishes.',
    price: 7.99,
    stock: 37,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/thumbnail.webp',
  },
  {
    name: 'Black Aluminium Cup',
    description: '[kitchen-accessories] A stylish and durable cup suitable for hot and cold beverages, with a sleek black finish.',
    price: 5.99,
    stock: 75,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/black-aluminium-cup/thumbnail.webp',
  },
  {
    name: 'Black Whisk',
    description: '[kitchen-accessories] A practical whisk with an ergonomic handle and sleek design for everyday prep.',
    price: 9.99,
    stock: 73,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/black-whisk/thumbnail.webp',
  },
  {
    name: 'Boxed Blender',
    description: '[kitchen-accessories] A powerful and compact blender for smoothies, shakes, and quick kitchen tasks.',
    price: 39.99,
    stock: 9,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/thumbnail.webp',
  },
  {
    name: 'Carbon Steel Wok',
    description: '[kitchen-accessories] A versatile cooking pan for stir-frying, sauteing, and deep frying, with sturdy heat distribution.',
    price: 29.99,
    stock: 40,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/carbon-steel-wok/thumbnail.webp',
  },
  {
    name: 'Chopping Board',
    description: '[kitchen-accessories] An essential food prep surface made from durable material for safe and hygienic cutting.',
    price: 12.99,
    stock: 14,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/chopping-board/thumbnail.webp',
  },
  {
    name: 'Citrus Squeezer Yellow',
    description: '[kitchen-accessories] A handy tool for extracting juice from citrus fruits, with a bright yellow finish.',
    price: 8.99,
    stock: 22,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/citrus-squeezer-yellow/thumbnail.webp',
  },
  {
    name: 'Egg Slicer',
    description: '[kitchen-accessories] A convenient tool for slicing boiled eggs evenly for salads, sandwiches, and plated dishes.',
    price: 6.99,
    stock: 40,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/egg-slicer/thumbnail.webp',
  },
  {
    name: 'Electric Stove',
    description: '[kitchen-accessories] A portable and efficient cooking solution for small kitchens or additional cooking surface needs.',
    price: 49.99,
    stock: 21,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/thumbnail.webp',
  },
  {
    name: 'Fine Mesh Strainer',
    description: '[kitchen-accessories] A versatile tool for straining liquids and sifting dry ingredients with efficient fine mesh filtering.',
    price: 9.99,
    stock: 85,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/fine-mesh-strainer/thumbnail.webp',
  },
  {
    name: 'Fork',
    description: '[kitchen-accessories] A classic utensil for dining and serving, with a durable and ergonomic design for everyday use.',
    price: 3.99,
    stock: 7,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/fork/thumbnail.webp',
  },
  {
    name: 'Glass',
    description: '[kitchen-accessories] A versatile and elegant drinking vessel suitable for a variety of beverages.',
    price: 4.99,
    stock: 46,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/glass/thumbnail.webp',
  },
  {
    name: 'Grater Black',
    description: '[kitchen-accessories] A handy kitchen tool for grating cheese, vegetables, and more, with sharp blades and a sleek finish.',
    price: 10.99,
    stock: 84,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/grater-black/thumbnail.webp',
  },
  {
    name: 'Hand Blender',
    description: '[kitchen-accessories] A compact kitchen appliance for blending, pureeing, and mixing with a powerful motor.',
    price: 34.99,
    stock: 84,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/thumbnail.webp',
  },
  {
    name: 'Ice Cube Tray',
    description: '[kitchen-accessories] A practical accessory for making ice cubes in various shapes to keep drinks cool.',
    price: 5.99,
    stock: 13,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/ice-cube-tray/thumbnail.webp',
  },
  {
    name: 'Kitchen Sieve',
    description: '[kitchen-accessories] A versatile tool for sifting and straining dry and wet ingredients with smooth results.',
    price: 7.99,
    stock: 68,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/kitchen-sieve/thumbnail.webp',
  },
  {
    name: 'Knife',
    description: '[kitchen-accessories] An essential kitchen tool for chopping, slicing, and dicing with a sharp blade and ergonomic handle.',
    price: 14.99,
    stock: 7,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/knife/thumbnail.webp',
  },
  {
    name: 'Lunch Box',
    description: '[kitchen-accessories] A portable container for packing and carrying meals, with compartments for different foods.',
    price: 12.99,
    stock: 94,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/lunch-box/thumbnail.webp',
  },
  {
    name: 'Microwave Oven',
    description: '[kitchen-accessories] A compact kitchen appliance for quick cooking, reheating, and defrosting.',
    price: 89.99,
    stock: 59,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/microwave-oven/thumbnail.webp',
  },
  {
    name: 'Mug Tree Stand',
    description: '[kitchen-accessories] A stylish and space-saving organizer for keeping mugs accessible and neatly displayed.',
    price: 15.99,
    stock: 88,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/mug-tree-stand/thumbnail.webp',
  },
  {
    name: 'Pan',
    description: '[kitchen-accessories] A versatile cookware item for frying, sauteing, and cooking various dishes with easy cleanup.',
    price: 24.99,
    stock: 90,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/pan/thumbnail.webp',
  },
  {
    name: 'Plate',
    description: '[kitchen-accessories] A classic dishware item for serving meals, suitable for everyday use or special occasions.',
    price: 3.99,
    stock: 66,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/plate/thumbnail.webp',
  },
  {
    name: 'Red Tongs',
    description: '[kitchen-accessories] Versatile kitchen tongs suitable for cooking and serving tasks, with a bold red finish.',
    price: 6.99,
    stock: 82,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/red-tongs/thumbnail.webp',
  },
  {
    name: 'Silver Pot With Glass Cap',
    description: '[kitchen-accessories] A stylish cookware item for boiling, simmering, and meal prep, with a clear cap for monitoring progress.',
    price: 39.99,
    stock: 40,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/silver-pot-with-glass-cap/thumbnail.webp',
  },
  {
    name: 'Slotted Turner',
    description: '[kitchen-accessories] A kitchen utensil designed for flipping and turning food while allowing excess liquid to drain.',
    price: 8.99,
    stock: 88,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/slotted-turner/thumbnail.webp',
  },
  {
    name: 'Spice Rack',
    description: '[kitchen-accessories] A convenient organizer for spices and seasonings that keeps kitchen essentials within reach.',
    price: 19.99,
    stock: 79,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/spice-rack/thumbnail.webp',
  },
  {
    name: 'Spoon',
    description: '[kitchen-accessories] A versatile utensil for stirring, serving, and tasting with durable everyday construction.',
    price: 4.99,
    stock: 59,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/spoon/thumbnail.webp',
  },
  {
    name: 'Tray',
    description: '[kitchen-accessories] A functional and decorative item for serving snacks, appetizers, or drinks.',
    price: 16.99,
    stock: 71,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/tray/thumbnail.webp',
  },
  {
    name: 'Wooden Rolling Pin',
    description: '[kitchen-accessories] A classic kitchen tool with smooth surface and sturdy handles for rolling dough evenly.',
    price: 11.99,
    stock: 80,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/wooden-rolling-pin/thumbnail.webp',
  },
  {
    name: 'Yellow Peeler',
    description: '[kitchen-accessories] A handy tool for peeling fruits and vegetables with ease, finished in bright yellow.',
    price: 5.99,
    stock: 35,
    imageUrl: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/yellow-peeler/thumbnail.webp',
  },
];

async function main() {
  console.log('Seeding database...');

  const hashedPassword = await bcrypt.hash('password123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {
      password: hashedPassword,
      role: 'ADMIN',
    },
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {
      password: hashedPassword,
      role: 'USER',
    },
    create: {
      email: 'user@example.com',
      password: hashedPassword,
      role: 'USER',
    },
  });

  await prisma.product.deleteMany({
    where: { authorId: admin.id },
  });

  const created = await prisma.product.createMany({
    data: demoProducts.map((product) => ({
      ...product,
      authorId: admin.id,
    })),
  });

  console.log(`Created Admin: ${admin.email}`);
  console.log(`Created User: ${user.email}`);
  console.log(`Successfully seeded ${created.count} products!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
