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
    { id: 'cat-1', name: 'Marine Plywood (BS 1088)', slug: 'marine-plywood-bs-1088', description: 'Certified boiling-water-proof (WBP) Gurjan & Okoume panels engineered for marine, heavy wet infrastructure, and luxury architectural exteriors in Ethiopia.', image_url: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=800&auto=format&fit=crop', order_index: 1, is_active: true },
    { id: 'cat-2', name: 'Film-Faced Shuttering Plywood', slug: 'film-faced-shuttering-plywood', description: 'High-density phenolic overlay panels delivering up to 25+ re-uses for fair-faced concrete formwork in Addis Ababa high-rise construction.', image_url: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=800&auto=format&fit=crop', order_index: 2, is_active: true },
    { id: 'cat-3', name: 'Commercial & Hardwood Plywood', slug: 'commercial-hardwood-plywood', description: 'Evenly calibrated Bintangor, Birch, and Okoume faced interior/exterior grade panels for custom furniture, CNC routing, and architectural joinery.', image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop', order_index: 3, is_active: true },
    { id: 'cat-4', name: 'Hardwood Structural Plywood', slug: 'hardwood-structural-plywood', description: 'Heavy point-load bearing panels with high modulus of elasticity, ideal for mezzanine decks, truck flooring, and load-bearing partitions.', image_url: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800&auto=format&fit=crop', order_index: 4, is_active: true },
    { id: 'cat-5', name: 'Flexible & Bendy Plywood', slug: 'flexible-bendy-plywood', description: 'Cross-grain or long-grain flexible panels capable of tight radiuses without cracking or steaming, engineered for curved reception desks and arches.', image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop', order_index: 5, is_active: true },
    { id: 'cat-6', name: 'Blockboard & Engineered Timber', slug: 'blockboard-engineered-timber', description: 'Kiln-dried solid wood batten core boards sandwiched between hardwood veneers, providing high longitudinal screw-holding and zero warping over long spans.', image_url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=800&auto=format&fit=crop', order_index: 6, is_active: true },
    { id: 'cat-7', name: 'Industrial MDF & Particleboards', slug: 'industrial-mdf-particleboards', description: 'Ultra-dense E1 grade medium-density fiberboards with mirror-smooth surfaces for precision CNC carving, laminating, and spray painting.', image_url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop', order_index: 7, is_active: true }
  ];

  const { error: catErr } = await supabase.from('categories').upsert(categories);
  if (catErr) console.error('Categories error:', catErr);
  else console.log('✅ Seeded ' + categories.length + ' categories');

  // 2. Products
  const products = [
    {
      id: 'prod-1',
      name: 'AquaShield BS 1088 Marine Plywood',
      slug: 'aquashield-bs-1088-marine-plywood',
      short_description: 'Certified boiling-water-proof (WBP) Gurjan core marine grade plywood for high-moisture structural infrastructure in Ethiopia.',
      description: 'AquaShield Marine Plywood by bmtradingplc is manufactured strictly adhering to the British Standard BS 1088:2018 specification. Utilizing 100% selected hardwood Gurjan and Okoume veneers bonded with fortified Phenol Formaldehyde resin, this panel exhibits zero core voids and exceptional resistance to fungal decay and delamination. Tested with 72-hour boiling water immersion tests, it represents the gold standard for high-end hospitality decks, damp infrastructure, and luxury architectural exteriors.',
      category_id: 'cat-1',
      images: [
        'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1000&auto=format&fit=crop'
      ],
      specs: {
        thickness: '6mm, 9mm, 12mm, 16mm, 18mm, 25mm',
        standard_size: '1220 x 2440 mm (4 x 8 ft)',
        grade: "BS 1088:2018 Lloyd's Approved Standard",
        glue_type: 'WBP Phenolic Resin (72-hour boil-proof)',
        core_species: 'Selected Hardwood Gurjan & Keruing',
        face_veneer: 'Natural Red Gurjan (1.2mm nominal)',
        density: '720 - 780 kg/m³',
        moisture_content: '8% - 12% at dispatch'
      },
      applications: [
        'Luxury hospitality outdoor decking and pergolas',
        'Wet-area interior framing (spas, commercial kitchens, bathrooms)',
        'Heavy civil concrete structures requiring ultra-durable face finish',
        'Architectural facade cladding substructures'
      ],
      is_featured: true,
      status: 'published',
      pdf_url: '/specs/aquashield-bs1088-specsheet.pdf'
    },
    {
      id: 'prod-2',
      name: 'ProForm Dynea Film-Faced Shuttering Plywood',
      slug: 'proform-dynea-film-faced-shuttering-plywood',
      short_description: 'Double-sided 120g/m² Dynea phenolic film-coated concrete formwork panel yielding 20-25 pours for high-rise contractors.',
      description: 'Engineered specifically for demanding Ethiopian commercial high-rise projects and civil concrete pours. ProForm utilizes high-density finger-jointed and whole-piece hardwood core plies bonded with 100% melamine WBP adhesive. Both sides are thermo-fused with genuine 120g/m² Dynea dark brown phenolic film, while all four edges are factory-sealed with waterproof acrylic elastomeric paint to prevent moisture ingress.',
      category_id: 'cat-2',
      images: [
        'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop'
      ],
      specs: {
        thickness: '18mm (standard), 21mm (heavy load)',
        standard_size: '1220 x 2440 mm',
        grade: 'First-Class Industrial Shuttering Grade',
        glue_type: 'WBP Phenolic / Melamine Compound',
        core_species: 'Eucalyptus & Combi-Hardwood Core',
        face_veneer: 'Dynea 120g/m² Phenolic Overlay (Double Sided)',
        density: '680 - 720 kg/m³',
        moisture_content: 'Under 10%'
      },
      applications: [
        'High-rise building concrete slabs, beams, and columns',
        'Fair-faced concrete finishes eliminating plastering rework',
        'Bridge abutments and infrastructure retaining walls',
        'Tunnel formwork systems and prefabricated casting molds'
      ],
      is_featured: true,
      status: 'published',
      pdf_url: '/specs/proform-shuttering-specsheet.pdf'
    },
    {
      id: 'prod-3',
      name: 'VeneerCraft Bintangor Commercial Hardwood Plywood',
      slug: 'veneercraft-bintangor-commercial-hardwood-plywood',
      short_description: 'Precision two-times calibrated furniture grade hardwood plywood with reddish Bintangor face veneer for joinery and cabinetry.',
      description: 'VeneerCraft Commercial Plywood represents the benchmark substrate for Ethiopian interior joinery shops, architectural woodwork contractors, and commercial fixture fabricators. Each panel goes through a two-step hydraulic calibrating sander to ensure thickness tolerance within ±0.2mm, eliminating CNC routing deviations.',
      category_id: 'cat-3',
      images: [
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop'
      ],
      specs: {
        thickness: '3mm, 6mm, 9mm, 12mm, 15mm, 18mm',
        standard_size: '1220 x 2440 mm',
        grade: 'BB/CC Commercial Joinery Grade',
        glue_type: 'E1 Low-Formaldehyde MR (Moisture Resistant)',
        core_species: 'Selected Tropical Hardwoods',
        face_veneer: 'Natural Bintangor / Okoume rotary cut',
        density: '620 - 660 kg/m³',
        moisture_content: '8% - 10%'
      },
      applications: [
        'Architectural joinery, custom wardrobes, and kitchen cabinetry',
        'Wall paneling, acoustic timber baffles, and ceilings',
        'Office workstations, executive desks, and retail shelving',
        'CNC 3D routed decorative screens and doors'
      ],
      is_featured: true,
      status: 'published',
      pdf_url: '/specs/veneercraft-commercial-specsheet.pdf'
    },
    {
      id: 'prod-4',
      name: 'TitanDeck Keruing Structural Transport Plywood',
      slug: 'titandeck-keruing-structural-transport-plywood',
      short_description: 'Ultra-heavy load bearing Keruing panel with wiremesh grip surface for lorry beds and warehouse mezzanines in Ethiopia.',
      description: 'TitanDeck is specifically formulated by bmtradingplc to endure severe rolling point loads, abrasion, and heavy forklift wheel traffic. Built using high-density whole-piece tropical Keruing veneers, one side features an aggressive non-slip wiremesh hexagonal pattern hot-pressed with 240g/m² phenolic film. This panel offers superior flexural strength (MOR) and modulus of elasticity (MOE), assuring zero deformation under static machinery storage or cargo container loading.',
      category_id: 'cat-4',
      images: [
        'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1000&auto=format&fit=crop'
      ],
      specs: {
        thickness: '18mm, 21mm, 24mm, 28mm, 30mm',
        standard_size: '1220 x 2440 mm / 1525 x 3050 mm',
        grade: 'F22 / F27 Heavy Structural Rating',
        glue_type: 'Type A Marine Phenolic WBP Bond',
        core_species: 'Keruing & High-Strength Tropical Hardwood',
        face_veneer: '240g/m² Wiremesh Non-Slip Phenolic Surface',
        density: '780 - 850 kg/m³',
        moisture_content: 'Under 10%'
      },
      applications: [
        'Heavy commercial truck and semi-trailer flooring',
        'Industrial warehouse mezzanine decking and ramps',
        'Scaffolding work platforms and spectator staging stands',
        'Cold storage facility slip-resistant flooring'
      ],
      is_featured: false,
      status: 'published'
    },
    {
      id: 'prod-5',
      name: 'FlexForm Bendable Curved Architectural Plywood',
      slug: 'flexform-bendable-curved-architectural-plywood',
      short_description: 'Cross-grain bendable plywood panel capable of curving to a 10cm radius without steaming or cracking.',
      description: 'FlexForm removes the engineering hurdles from architectural curves, column encasements, circular reception desks, and organic wave ceiling baffles. Composed of specialized imported hardwood veneers with rotary grain alignment, FlexForm bends effortlessly by hand without heat, steam, or special kerfing cuts.',
      category_id: 'cat-5',
      images: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop'
      ],
      specs: {
        thickness: '5mm, 8mm, 12mm',
        standard_size: '1220 x 2440 mm (Column grain & Barrel grain)',
        grade: 'Premium Architectural Bending Grade',
        glue_type: 'E1 Flexible Polyurethane / Melamine Glue',
        core_species: 'Ceiba / Fuma lightweight bending hardwood',
        face_veneer: 'Natural Sanded Hardwood',
        density: '480 - 520 kg/m³',
        moisture_content: '8% - 10%'
      },
      applications: [
        'Curved hotel reception counters and bar fronts',
        'Circular concrete structural column encasements',
        'Organic ceiling waves, coves, and sculptural light troughs',
        'Custom curved acoustic wall panels and spiral stair skirts'
      ],
      is_featured: false,
      status: 'published'
    },
    {
      id: 'prod-6',
      name: 'SolidCore Kiln-Dried Hardwood Blockboard',
      slug: 'solidcore-kiln-dried-hardwood-blockboard',
      short_description: 'Dimensionally stable blockboard featuring a solid pine/falcatta batten core for tall wardrobes and doors.',
      description: 'Where standard plywood may bow under longitudinal gravity when spanning heights over 2 meters, SolidCore Blockboard excels. Constructed with a solid wood batten core kiln-dried to exactly 10% moisture content, wrapped with dual cross-banding hardwood veneers. Ideal for full-height master wardrobe doors, library shelving, and office partitions in dry or heated spaces.',
      category_id: 'cat-6',
      images: [
        'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1000&auto=format&fit=crop'
      ],
      specs: {
        thickness: '18mm, 25mm',
        standard_size: '1220 x 2440 mm',
        grade: 'First Grade Solid Core Interior',
        glue_type: 'E1 Grade MR Adhesive',
        core_species: 'Finger-jointed Kiln-Dried Pine / Solid Hardwood Battens',
        face_veneer: 'Double-face Bintangor / Birch Sanded',
        density: '540 - 580 kg/m³',
        moisture_content: '10% ± 2%'
      },
      applications: [
        'Floor-to-ceiling wardrobe and cabinet doors',
        'Heavy library bookshelves spanning 900mm+ without sag',
        'Solid-core interior passage and bathroom door blanks',
        'Modular hotel headboard paneling and acoustic divides'
      ],
      is_featured: false,
      status: 'published'
    },
    {
      id: 'prod-7',
      name: 'UltraDense Green-Core Moisture-Resistant MDF (HMR)',
      slug: 'ultradense-green-core-moisture-resistant-mdf',
      short_description: 'E1 industrial grade high-density moisture-resistant MDF for intricate 3D CNC routing and high-gloss polyurethane lacquering.',
      description: 'Manufactured with high-grade synthetic resin and wax emulsion, UltraDense Green-Core (HMR) MDF offers superior internal bond strength (IB) and ultra-low thickness swelling when subjected to ambient humidity. The homogeneous fiber density ensures knife-sharp detail during deep CNC 3D routing without fuzzy edges or fiber tear-out.',
      category_id: 'cat-7',
      images: [
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1000&auto=format&fit=crop'
      ],
      specs: {
        thickness: '6mm, 9mm, 12mm, 16mm, 18mm, 25mm',
        standard_size: '1220 x 2440 mm / 1830 x 2440 mm',
        grade: 'HMR Grade High Density (EN 622-5 Standard)',
        glue_type: 'Melamine-Urea-Formaldehyde (MUF) Resin',
        core_species: '100% Plantation Wood Fine Virgin Fibers',
        face_veneer: 'Mirror-Smooth 180-Grit Calibrated Sanding',
        density: '740 - 820 kg/m³',
        moisture_content: '5% - 8%'
      },
      applications: [
        'Intricate 3D CNC grooved acoustic and feature wall panels',
        'Bathroom vanities and kitchen profile doors under lacquer finishes',
        'Architectural display stands, exhibition booths, and retail fixtures',
        'Skirting boards, architraves, and decorative wall moldings'
      ],
      is_featured: true,
      status: 'published'
    }
  ];

  const { error: prodErr } = await supabase.from('products').upsert(products);
  if (prodErr) console.error('Products error:', prodErr);
  else console.log('✅ Seeded ' + products.length + ' products');

  // 3. Gallery Items
  const gallery = [
    {
      id: 'gal-1',
      title: 'Commercial Tower Concrete Formwork',
      project_name: 'Bole Commercial Tower (24-Story)',
      category: 'Concrete Formwork',
      image_url: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1000&auto=format&fit=crop',
      description: 'Continuous fair-faced concrete slab and column casting utilizing ProForm 120g Dynea Film-Faced Plywood across 24 elevated floor cycles in Bole.',
      contractor: 'Midroc Construction Ethiopia',
      order_index: 1,
      is_active: true
    },
    {
      id: 'gal-2',
      title: 'Luxury Hotel Pool Deck Substructure',
      project_name: 'Skyline Luxury Hotel & Suites',
      category: 'Marine Infrastructure',
      image_url: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=1000&auto=format&fit=crop',
      description: 'Engineered outdoor water deck and spa facility framing built using AquaShield BS 1088 certified Gurjan marine plywood with zero delamination guarantee.',
      contractor: 'Afro-Tsion Construction',
      order_index: 2,
      is_active: true
    },
    {
      id: 'gal-3',
      title: 'Corporate Headquarters Custom Millwork',
      project_name: 'Commercial Bank of Ethiopia Branch Pavilion',
      category: 'Architectural Joinery',
      image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop',
      description: 'Executive conference credenzas, curved wall paneling, and acoustic fluted screens utilizing VeneerCraft hardwood plywood and UltraDense MDF.',
      contractor: 'Addis Craft Interiors & Millwork',
      order_index: 3,
      is_active: true
    },
    {
      id: 'gal-4',
      title: 'Industrial Warehouse Mezzanine Transport Deck',
      project_name: 'Kality Logistics & Cargo Hub',
      category: 'Structural Transport',
      image_url: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1000&auto=format&fit=crop',
      description: 'High-load forklift circulation mezzanine and container loading ramps utilizing TitanDeck 28mm wiremesh Keruing transport panels.',
      contractor: 'Federal Transport Infrastructure Works',
      order_index: 4,
      is_active: true
    }
  ];

  const { error: galErr } = await supabase.from('gallery_items').upsert(gallery);
  if (galErr) console.error('Gallery error:', galErr);
  else console.log('✅ Seeded ' + gallery.length + ' gallery items');

  // 4. Partners
  const partners = [
    { id: 'part-1', name: 'Midroc Construction Ethiopia', category: 'General Contractor Grade 1', initials: 'MCE', order_index: 1, is_active: true },
    { id: 'part-2', name: 'Afro-Tsion Construction', category: 'Civil & Infrastructure Grade 1', initials: 'ATC', order_index: 2, is_active: true },
    { id: 'part-3', name: 'Flintstone Engineering', category: 'Commercial Development', initials: 'FSE', order_index: 3, is_active: true },
    { id: 'part-4', name: 'Satcon Construction', category: 'Roads & Heavy Civil Works', initials: 'SCC', order_index: 4, is_active: true },
    { id: 'part-5', name: 'Addis Craft Interiors & Millwork', category: 'Architectural Joinery & Fit-Out', initials: 'ACI', order_index: 5, is_active: true }
  ];

  const { error: partErr } = await supabase.from('partners').upsert(partners);
  if (partErr) console.error('Partners error:', partErr);
  else console.log('✅ Seeded ' + partners.length + ' partners');

  // 5. Testimonials
  const testimonials = [
    {
      id: 'test-1',
      client_name: 'Eng. Dawit Haile',
      company: 'Midroc Construction Ethiopia',
      role: 'Project Director',
      content: 'We switched to bmtradingplc ProForm 120g Shuttering Plywood for our commercial high-rise tower in Bole. We consistently achieved 22 to 26 pours per panel with flawless fair-faced concrete results. Their supply reliability and same-day Addis Ababa yard dispatch kept our pouring schedule right on track.',
      rating: 5,
      project_type: 'Commercial High-Rise Concrete Formwork',
      is_active: true
    },
    {
      id: 'test-2',
      client_name: 'Bethlehem Tadesse',
      company: 'Addis Craft Interiors & Millwork',
      role: 'Head of Manufacturing',
      content: 'Calibrated thickness tolerance is everything when running automated CNC machines. bmtradingplc VeneerCraft hardwood plywood delivers absolute gauge precision sheet after sheet. No hollow pockets, no delamination during high-pressure veneer pressing. The finest timber supplier in Ethiopia.',
      rating: 5,
      project_type: 'Luxury Hospitality Custom Millwork',
      is_active: true
    },
    {
      id: 'test-3',
      client_name: 'Eng. Yohannes Bekele',
      company: 'Afro-Tsion Construction',
      role: 'Senior Civil Works Director',
      content: 'True BS 1088 marine plywood is difficult to find with authentic test certificates in the local market. bmtradingplc AquaShield passed all our independent laboratory boil tests. We use their panels exclusively for our heavy civil infrastructure and bridge deck projects.',
      rating: 5,
      project_type: 'Civil Infrastructure & Bridge Slabs',
      is_active: true
    }
  ];

  const { error: testErr } = await supabase.from('testimonials').upsert(testimonials);
  if (testErr) console.error('Testimonials error:', testErr);
  else console.log('✅ Seeded ' + testimonials.length + ' testimonials');

  // 6. Site Settings
  const settings = {
    company_name: 'bmtradingplc',
    legal_name: 'bmtradingplc',
    tagline: 'Architectural Timber & Industrial Plywood Solutions',
    description: "Ethiopia's premier direct importer and wholesale supplier of certified marine plywood, high-cycle film-faced shuttering panels, architectural hardwoods, and engineered timber solutions.",
    contact_email: 'info@bmtradingplc.com',
    sales_email: 'sales@bmtradingplc.com',
    phone: '+251 911 234 567',
    phone_display: '+251 911 234 567',
    landline: '+251 11 667 8900',
    whatsapp: '+251911234567',
    telegram: 'bmtradingplc',
    street_address: 'Bole Sub-City, Woreda 03, Industrial Commercial Corridor',
    city: 'Addis Ababa',
    region: 'Addis Ababa',
    country: 'Ethiopia',
    business_hours: 'Monday – Friday: 08:00 – 17:30 | Saturday: 08:30 – 13:00 (EAT)',
    years_experience: 18,
    metric_tons_delivered: 120,
    major_clients_count: 450,
    quality_compliance: 100
  };

  const { error: setErr } = await supabase.from('site_settings').insert(settings);
  if (setErr) console.error('Site Settings error:', setErr);
  else console.log('✅ Seeded site_settings');

  console.log('🎉 ALL SUPABASE DATA POPULATED SUCCESSFULLY!');
}

runSeed();
