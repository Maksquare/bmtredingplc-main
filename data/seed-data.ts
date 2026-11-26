import {
  Category,
  Product,
  Testimonial,
  Partner,
  Customer,
  InventoryAdjustment,
  GalleryItem,
  Order,
  TeamMember,
  BlogPost,
} from "@/types";

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Safarian",
    slug: "safarian",
    description:
      "Versatile precision wood panels manufactured at our Werabe facility in 4 exact thicknesses (03mm, 06mm, 08mm, and 12mm) for furniture cabinetry, backing panels, interior partitions, and joinery.",
    image_url: "/images/products/safarian-main.jpg",
    order_index: 1,
    is_active: true,
    product_count: 1,
  },
  {
    id: "cat-2",
    name: "Plywood",
    slug: "plywood",
    description:
      "High-strength structural and furniture plywood crafted in 16mm and our signature 18mm Special Product thickness — built for heavy-duty commercial carpentry, formwork, and architectural joinery.",
    image_url: "/images/products/plywood-18mm-special.jpg",
    order_index: 2,
    is_active: true,
    product_count: 1,
  },
];

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Safarian",
    slug: "safarian",
    short_description:
      "Precision commercial board engineered in four calibrated thicknesses — 03mm, 06mm, 08mm, and 12mm — for Ethiopian furniture makers and interior joinery.",
    description:
      "Manufactured at our facility in Central Ethiopia, Silte Zone/ስልጤ ዞን, Werabe City, bmtradingplc Safarian sheets provide uniform surface flatness, clean cutting behavior, and dependable dimensional stability across four dedicated gauges: 03mm, 06mm, 08mm, and 12mm. Widely chosen by leading furniture workshops and commercial interior contractors for cabinetry backs, drawer bases, partitions, and structural joinery.",
    category_id: "cat-1",
    category_name: "Safarian",
    images: [
      "/images/products/safarian-main.jpg",
      "/images/products/safarian-detail.jpg",
    ],
    specs: {
      thickness: "03mm, 06mm, 08mm, 12mm",
      standard_size: "1220 x 2440 mm (4ft x 8ft)",
      grade: "Commercial & Furniture Joinery Grade",
      glue_type: "Moisture-Resistant Interior & Structural Bond",
      core_species: "Selected Seasoned Plantation Hardwood",
      surface_finish: "Smooth Factory-Sanded Face",
      moisture_content: "8% – 12%",
      origin: "Central Ethiopia, Silte Zone/ስልጤ ዞን, Werabe City",
    },
    applications: [
      "03mm & 06mm: Wardrobe backs, drawer bottoms, and lightweight wall linings",
      "08mm: Cabinet shelving frames, interior doors, and partition substrates",
      "12mm: Modular furniture carcasses, shelving structures, and heavy cabinetry",
      "CNC panel routing, commercial fit-outs, and bespoke millwork",
    ],
    is_featured: true,
    status: "published",
    stock_status: "in_stock",
    stock_quantity: 640,
    brand: "bmtradingplc Safarian",
    sku: "BMT-SAF-03-12",
    variants: [
      {
        id: "v-saf-03",
        thickness: "03mm",
        size: "1220 x 2440 mm (4ft x 8ft)",
        stock_status: "in_stock",
        stock_quantity: 220,
      },
      {
        id: "v-saf-06",
        thickness: "06mm",
        size: "1220 x 2440 mm (4ft x 8ft)",
        stock_status: "in_stock",
        stock_quantity: 180,
      },
      {
        id: "v-saf-08",
        thickness: "08mm",
        size: "1220 x 2440 mm (4ft x 8ft)",
        stock_status: "in_stock",
        stock_quantity: 140,
      },
      {
        id: "v-saf-12",
        thickness: "12mm",
        size: "1220 x 2440 mm (4ft x 8ft)",
        stock_status: "in_stock",
        stock_quantity: 100,
      },
    ],
    pdf_url: "/specs/safarian-specsheet.pdf",
    created_at: "2026-01-10T09:00:00Z",
  },
  {
    id: "prod-2",
    name: "Plywood",
    slug: "plywood",
    short_description:
      "Heavy-duty structural and furniture plywood in 16mm and our flagship 18mm Special Product thickness for high-load construction and joinery.",
    description:
      "Engineered for high structural load capacity and superior screw retention, bmtradingplc Plywood is produced in heavy-gauge 16mm and our flagship 18mm Special Product editions. Each multi-ply cross-laminated sheet is pressed at our Werabe factory for maximum planar flatness, warping resistance, and enduring durability across commercial construction developments and high-end furniture manufacturing.",
    category_id: "cat-2",
    category_name: "Plywood",
    images: [
      "/images/products/plywood-18mm-special.jpg",
      "/images/products/plywood-16mm-stack.jpg",
    ],
    specs: {
      thickness: "16mm, 18mm (Special Product)",
      standard_size: "1220 x 2440 mm (4ft x 8ft)",
      grade: "Heavy Structural & Signature Furniture Grade",
      glue_type: "High-Bond Structural Adhesive",
      core_species: "Cross-Laminated Dense Hardwood Veneers",
      surface_finish: "Calibrated Smooth Face (18mm Special Edition)",
      moisture_content: "8% – 12%",
      origin: "Central Ethiopia, Silte Zone/ስልጤ ዞን, Werabe City",
    },
    applications: [
      "18mm Special Product: Flagship heavy-duty wardrobe doors, office desks & structural slabs",
      "16mm: Solid cabinet carcasses, shelving frames, and dining tables",
      "Commercial interior partitioning and bespoke architectural joinery",
      "Heavy construction site framing and high-stability structural paneling",
    ],
    is_featured: true,
    status: "published",
    stock_status: "in_stock",
    stock_quantity: 520,
    brand: "bmtradingplc Signature",
    sku: "BMT-PLY-16-18",
    variants: [
      {
        id: "v-ply-16",
        thickness: "16mm",
        size: "1220 x 2440 mm (4ft x 8ft)",
        stock_status: "in_stock",
        stock_quantity: 200,
      },
      {
        id: "v-ply-18",
        thickness: "18mm",
        size: "1220 x 2440 mm (4ft x 8ft)",
        stock_status: "in_stock",
        stock_quantity: 320,
        is_special: true,
      },
    ],
    pdf_url: "/specs/plywood-18mm-special.pdf",
    created_at: "2026-01-14T10:30:00Z",
  },
];

export const partners: Partner[] = [
  {
    id: "part-1",
    name: "MIDROC Investment Group",
    category: "Commercial & Civil Development",
    initials: "MIG",
    logo_url: "/images/partners/midroc.jpg",
    website_url: "https://www.midrocinvestmentgroup.com",
    order_index: 1,
    is_active: true,
  },
  {
    id: "part-2",
    name: "Mina Furniture",
    category: "Commercial & Home Furniture",
    initials: "MF",
    logo_url: "/images/partners/mina-furniture.jpg",
    website_url: "https://minafurnitureet.com",
    order_index: 2,
    is_active: true,
  },
  {
    id: "part-3",
    name: "Warit Furniture",
    category: "Fine Joinery & Interiors",
    initials: "WF",
    logo_url: "/images/partners/warit-furniture.png",
    website_url: "https://www.warytwoodworks.com",
    order_index: 3,
    is_active: true,
  },
  {
    id: "part-4",
    name: "Classic Furniture",
    category: "Bespoke Cabinetry & Furnishings",
    initials: "CF",
    logo_url: "/images/partners/classic-furniture.jpg",
    website_url: "https://www.instagram.com/classic_furniture_ethio/",
    order_index: 4,
    is_active: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    client_name: "Procurement & Construction Directorate",
    company: "MIDROC Investment Group",
    role: "Major Developments Division",
    content:
      "Large-scale developments demand timber supply partners who deliver uniform thickness and structural strength without fail. bmtradingplc's 18mm special plywood and consistent dispatch from Werabe to our Addis Ababa sites have kept our finishing and carpentry schedules running smoothly across multiple landmark builds.",
    rating: 5,
    avatar_url: "/images/partners/midroc.jpg",
    project_type: "Commercial & Residential Developments",
    is_active: true,
  },
  {
    id: "test-2",
    client_name: "Production & Joinery Management",
    company: "Mina Furniture",
    role: "Manufacturing Operations",
    content:
      "In fine furniture production, every millimeter of board calibration counts. Whether we are working with 3mm and 6mm Safarian boards for clean cabinet backing or building full carcasses with 12mm and 18mm plywood, bmtradingplc sheets cut cleanly on our saws, hold fasteners firmly, and arrive reliably every time.",
    rating: 5,
    avatar_url: "/images/partners/mina-furniture.jpg",
    project_type: "Series & Custom Furniture Line",
    is_active: true,
  },
  {
    id: "test-3",
    client_name: "Workshop & Design Leadership",
    company: "Classic Furniture",
    role: "Craftsmanship & Finishing Team",
    content:
      "Our clients expect heirloom-grade wardrobes, dining sets, and architectural woodwork that stay perfectly flat for decades. bmtradingplc's 18mm special plywood has become the trusted backbone of our workshop — giving our craftsmen clean edges, smooth surfaces, and peace of mind on every bespoke commission.",
    rating: 5,
    avatar_url: "/images/partners/classic-furniture.jpg",
    project_type: "Bespoke Luxury Cabinetry",
    is_active: true,
  },
];

// Kept empty for legacy interface compatibility where referenced
export const blogPosts: BlogPost[] = [];
export const teamMembers: TeamMember[] = [];
export const galleryItems: GalleryItem[] = [];
export const orders: Order[] = [];

// Seed Customer Accounts (NO billing/spend values)
export const customers: Customer[] = [
  {
    id: "cust-1",
    name: "Procurement Team",
    company: "MIDROC Investment Group",
    email: "procurement@midroc-ethiopia.com",
    phone: "+251 911 247 821",
    status: "returning",
    total_orders: 12,
    total_spend: 0,
    last_order_at: "2026-11-14T10:00:00Z",
    created_at: "2022-06-12T08:00:00Z",
  },
  {
    id: "cust-2",
    name: "Production Desk",
    company: "Mina Furniture",
    email: "orders@minafurniture.et",
    phone: "+251 911 221 261",
    status: "active",
    total_orders: 9,
    total_spend: 0,
    last_order_at: "2026-11-18T14:30:00Z",
    created_at: "2023-03-04T09:15:00Z",
  },
  {
    id: "cust-3",
    name: "Workshop Purchasing",
    company: "Warit Furniture",
    email: "supply@waritfurniture.com",
    phone: "+251 910 953 373",
    status: "active",
    total_orders: 7,
    total_spend: 0,
    last_order_at: "2026-10-29T11:20:00Z",
    created_at: "2023-08-18T12:00:00Z",
  },
  {
    id: "cust-4",
    name: "Design & Joinery Studio",
    company: "Classic Furniture",
    email: "workshop@classicfurniture.et",
    phone: "+251 911 247 821",
    status: "returning",
    total_orders: 10,
    total_spend: 0,
    last_order_at: "2026-11-20T08:45:00Z",
    created_at: "2021-11-19T14:00:00Z",
  },
];

// Seed Inventory Audit Logs
export const inventoryAdjustments: InventoryAdjustment[] = [
  {
    id: "adj-501",
    product_id: "prod-2",
    product_name: "Plywood (18mm — Special Product)",
    previous_stock: 200,
    new_stock: 320,
    delta: 120,
    reason: "Supplier Consignment",
    adjusted_by: "Werabe Factory Dispatch",
    notes: "Fresh 18mm special edition production batch transferred to Addis Ababa supply.",
    created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    id: "adj-502",
    product_id: "prod-1",
    product_name: "Safarian (03mm, 06mm, 08mm, 12mm)",
    previous_stock: 720,
    new_stock: 640,
    delta: -80,
    reason: "Direct Sale",
    adjusted_by: "Ayer Tena Operations Desk",
    notes: "Dispatched Safarian 06mm & 12mm bundle for furniture workshop partner.",
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];
