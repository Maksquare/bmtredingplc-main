/* eslint-disable @typescript-eslint/no-require-imports */
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '..', '.env.local');
const dotenv = fs.readFileSync(envPath, 'utf8');
const env = Object.fromEntries(
  dotenv.split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#'))
    .map(l => l.split('='))
    .map(([k, ...v]) => [k.trim(), v.join('=').trim()])
);

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function runSeed() {
  console.log('--- Seeding Supabase Database for bmtradingplc ---');

  // 1. Categories
  const categories = [
    {
      id: 'cat-1',
      name: 'Safarian',
      slug: 'safarian',
      description: 'Versatile precision wood panels manufactured at our Werabe facility in 4 calibrated thicknesses (03mm, 06mm, 08mm, and 12mm).',
      image_url: '/images/products/safarian-main.jpg',
      order_index: 1,
      is_active: true,
    },
    {
      id: 'cat-2',
      name: 'Plywood',
      slug: 'plywood',
      description: 'Heavy-duty structural and furniture plywood crafted in 16mm and our signature 18mm Special Product thickness.',
      image_url: '/images/products/plywood-18mm-special.jpg',
      order_index: 2,
      is_active: true,
    },
  ];

  const { error: catErr } = await supabase.from('categories').upsert(categories);
  if (catErr) console.error('Categories error:', catErr);
  else console.log('✅ Seeded ' + categories.length + ' categories');

  // 2. Products
  const products = [
    {
      id: 'prod-1',
      name: 'Safarian',
      slug: 'safarian',
      short_description: 'Precision commercial board engineered in four calibrated thicknesses — 03mm, 06mm, 08mm, and 12mm.',
      description: 'Manufactured at our facility in Central Ethiopia, Silte Zone/ስልጤ ዞን, Werabe City, bmtradingplc Safarian sheets provide uniform flatness and clean cutting across 03mm, 06mm, 08mm, and 12mm thicknesses.',
      category_id: 'cat-1',
      images: [
        '/images/products/safarian-main.jpg',
        '/images/products/safarian-detail.jpg',
      ],
      specs: {
        thickness: '03mm, 06mm, 08mm, 12mm',
        standard_size: '1220 x 2440 mm (4ft x 8ft)',
        grade: 'Commercial & Furniture Joinery Grade',
        glue_type: 'Moisture-Resistant Interior & Structural Bond',
        core_species: 'Selected Seasoned Plantation Hardwood',
        surface_finish: 'Smooth Factory-Sanded Face',
        origin: 'Central Ethiopia, Silte Zone/ስልጤ ዞን, Werabe City',
      },
      applications: [
        '03mm & 06mm: Wardrobe backs, drawer bottoms, and lightweight linings',
        '08mm: Cabinet shelving frames and interior partition substrates',
        '12mm: Modular furniture carcasses and cabinetry builds',
      ],
      is_featured: true,
      status: 'published',
      pdf_url: '/specs/safarian-specsheet.pdf',
    },
    {
      id: 'prod-2',
      name: 'Plywood',
      slug: 'plywood',
      short_description: 'Heavy-duty structural and furniture plywood in 16mm and our flagship 18mm Special Product thickness.',
      description: 'Engineered for heavy structural load capacity and superior screw retention, bmtradingplc Plywood is produced in 16mm and our flagship 18mm Special Product editions at our Werabe factory.',
      category_id: 'cat-2',
      images: [
        '/images/products/plywood-18mm-special.jpg',
        '/images/products/plywood-16mm-stack.jpg',
      ],
      specs: {
        thickness: '16mm, 18mm (Special Product)',
        standard_size: '1220 x 2440 mm (4ft x 8ft)',
        grade: 'Heavy Structural & Signature Furniture Grade',
        glue_type: 'High-Bond Structural Adhesive',
        core_species: 'Cross-Laminated Dense Hardwood Veneers',
        surface_finish: 'Calibrated Smooth Face (18mm Special Edition)',
        origin: 'Central Ethiopia, Silte Zone/ስልጤ ዞን, Werabe City',
      },
      applications: [
        '18mm Special Product: Heavy wardrobe doors, executive desks & structural framing',
        '16mm: Solid cabinet carcasses and heavy carpentry works',
        'Commercial interior construction and luxury furniture workshops',
      ],
      is_featured: true,
      status: 'published',
      pdf_url: '/specs/plywood-18mm-special.pdf',
    },
  ];

  const { error: prodErr } = await supabase.from('products').upsert(products);
  if (prodErr) console.error('Products error:', prodErr);
  else console.log('✅ Seeded ' + products.length + ' products');

  // 3. Partners
  const partners = [
    { id: 'part-1', name: 'MIDROC Investment Group', category: 'Commercial & Civil Development', initials: 'MIG', logo_url: '/images/partners/midroc.jpg', website_url: 'https://www.midrocinvestmentgroup.com', order_index: 1, is_active: true },
    { id: 'part-2', name: 'Mina Furniture', category: 'Commercial & Home Furniture', initials: 'MF', logo_url: '/images/partners/mina-furniture.jpg', website_url: 'https://minafurnitureet.com', order_index: 2, is_active: true },
    { id: 'part-3', name: 'Warit Furniture', category: 'Fine Joinery & Interiors', initials: 'WF', logo_url: '/images/partners/warit-furniture.png', website_url: 'https://www.warytwoodworks.com', order_index: 3, is_active: true },
    { id: 'part-4', name: 'Classic Furniture', category: 'Bespoke Cabinetry & Furnishings', initials: 'CF', logo_url: '/images/partners/classic-furniture.jpg', website_url: 'https://www.instagram.com/classic_furniture_ethio/', order_index: 4, is_active: true },
  ];

  const { error: partErr } = await supabase.from('partners').upsert(partners);
  if (partErr) console.error('Partners error:', partErr);
  else console.log('✅ Seeded ' + partners.length + ' partners');

  // 4. Testimonials
  const testimonials = [
    {
      id: 'test-1',
      client_name: 'Procurement & Construction Directorate',
      company: 'MIDROC Investment Group',
      role: 'Major Developments Division',
      content: "Large-scale developments demand timber supply partners who deliver uniform thickness and structural strength without fail. bmtradingplc's 18mm special plywood and consistent dispatch from Werabe to our Addis Ababa sites have kept our finishing and carpentry schedules running smoothly.",
      rating: 5,
      avatar_url: '/images/partners/midroc.jpg',
      project_type: 'Commercial & Residential Developments',
      is_active: true,
    },
    {
      id: 'test-2',
      client_name: 'Production & Joinery Management',
      company: 'Mina Furniture',
      role: 'Manufacturing Operations',
      content: "In fine furniture production, every millimeter of board calibration counts. Whether we are working with 3mm and 6mm Safarian boards for clean cabinet backing or building full carcasses with 12mm and 18mm plywood, bmtradingplc sheets cut cleanly and arrive reliably.",
      rating: 5,
      avatar_url: '/images/partners/mina-furniture.jpg',
      project_type: 'Series & Custom Furniture Line',
      is_active: true,
    },
    {
      id: 'test-3',
      client_name: 'Workshop & Design Leadership',
      company: 'Classic Furniture',
      role: 'Craftsmanship & Finishing Team',
      content: "Our clients expect heirloom-grade wardrobes, dining sets, and architectural woodwork that stay flat for decades. bmtradingplc's 18mm special plywood has become the trusted backbone of our workshop.",
      rating: 5,
      avatar_url: '/images/partners/classic-furniture.jpg',
      project_type: 'Bespoke Luxury Cabinetry',
      is_active: true,
    },
  ];

  const { error: testErr } = await supabase.from('testimonials').upsert(testimonials);
  if (testErr) console.error('Testimonials error:', testErr);
  else console.log('✅ Seeded ' + testimonials.length + ' testimonials');

  // 5. Site Settings
  const settings = {
    company_name: 'bmtradingplc',
    legal_name: 'bmtradingplc',
    tagline: 'Safarian Boards & Structural Plywood Solutions',
    description: 'Over 10 years supplying Safarian boards (03mm, 06mm, 08mm, 12mm) and precision Plywood (16mm and 18mm special product) from our Werabe factory and Addis Ababa office.',
    contact_email: 'info@bmtradingplc.com',
    sales_email: 'sales@bmtradingplc.com',
    phone: '+251911247821',
    phone_display: '0911 247 821',
    whatsapp: '+251911247821',
    telegram: '+251911247821',
    street_address: 'Addis Ababa, Ayer Tena, Shamo Tower, 3rd Floor',
    city: 'Addis Ababa',
    region: 'Addis Ababa',
    country: 'Ethiopia',
    business_hours: 'Monday – Saturday: 08:30 – 17:30 (EAT)',
    years_experience: 10,
    major_clients_count: 200,
  };

  const { error: setErr } = await supabase.from('site_settings').insert(settings);
  if (setErr) console.error('Site Settings error:', setErr);
  else console.log('✅ Seeded site_settings');

  console.log('🎉 ALL SUPABASE DATA POPULATED SUCCESSFULLY!');
}

runSeed();
