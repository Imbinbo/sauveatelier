export type Project = {
  slug: string
  title: string
  location: string
  year: string
  type: 'Residential' | 'Hospitality' | 'Retreat'
  image: string
  area: string
  summary: string
  palette: string[]
  materials: string[]
}

export const projects: Project[] = [
  {
    slug: 'casa-oliva',
    title: 'Casa Oliva',
    location: 'Mykonos, Greece',
    year: '2025',
    type: 'Retreat',
    image: '/images/project-mykonos.png',
    area: '640 m²',
    summary:
      'A whitewashed hillside retreat where hand-troweled lime walls and sculpted built-ins frame the Aegean like a living painting.',
    palette: ['#EDE6DA', '#C9B79C', '#8C7A64', '#3E3A35'],
    materials: ['Lime plaster', 'Bleached oak', 'Tinos marble', 'Raw linen'],
  },
  {
    slug: 'palazzo-nero',
    title: 'Palazzo Nero',
    location: 'Milan, Italy',
    year: '2025',
    type: 'Residential',
    image: '/images/project-milan.png',
    area: '420 m²',
    summary:
      'A nineteenth-century piano nobile reimagined in smoked oak, Nero Marquina and bronze — dark, quiet and deeply tactile.',
    palette: ['#2A2622', '#5B4B3D', '#9A7B55', '#D8CBB8'],
    materials: ['Smoked oak', 'Nero Marquina', 'Patinated bronze', 'Mohair velvet'],
  },
  {
    slug: 'kumo-house',
    title: 'Kumo House',
    location: 'Kyoto, Japan',
    year: '2024',
    type: 'Residential',
    image: '/images/project-kyoto.png',
    area: '310 m²',
    summary:
      'Cedar, washi and silence. A machiya townhouse restored around a moss garden with furniture made by our Kyoto joiners.',
    palette: ['#E4DCCB', '#A88F6C', '#6B5A44', '#2F2A24'],
    materials: ['Hinoki cypress', 'Washi paper', 'Sumi-dyed linen', 'River stone'],
  },
  {
    slug: 'chalet-lumen',
    title: 'Chalet Lumen',
    location: 'Gstaad, Switzerland',
    year: '2024',
    type: 'Retreat',
    image: '/images/project-gstaad.png',
    area: '880 m²',
    summary:
      'An alpine refuge of reclaimed larch, sheepskin and a monolithic stone hearth — warmth engineered for the long winter light.',
    palette: ['#EADFCF', '#B48A5E', '#6E4E34', '#28211B'],
    materials: ['Reclaimed larch', 'Valser quartzite', 'Shearling', 'Hand-forged iron'],
  },
  {
    slug: 'mercer-loft',
    title: 'Mercer Loft',
    location: 'Tribeca, New York',
    year: '2023',
    type: 'Residential',
    image: '/images/project-tribeca.png',
    area: '520 m²',
    summary:
      'Cast-iron columns and original brick meet a gallery-grade collection of furniture, art and soft architectural lighting.',
    palette: ['#E7DED2', '#B0623E', '#5A3F30', '#1E1B18'],
    materials: ['Original brick', 'Walnut', 'Cognac leather', 'Blackened steel'],
  },
  {
    slug: 'hotel-alma',
    title: 'Hotel Alma',
    location: 'Lisbon, Portugal',
    year: '2023',
    type: 'Hospitality',
    image: '/images/project-lisbon.png',
    area: '3,200 m²',
    summary:
      'A forty-key boutique hotel where azulejo heritage, terracotta and sun-bleached textiles slow every guest down to Lisbon time.',
    palette: ['#F0E6D8', '#C77A4F', '#7E8A7A', '#2E2A26'],
    materials: ['Terracotta', 'Portuguese cork', 'Estremoz marble', 'Cotton bouclé'],
  },
]

export type Product = {
  slug: string
  name: string
  category: 'Seating' | 'Tables' | 'Lighting' | 'Storage'
  price: number
  image: string
  designer: string
  material: string
  dimensions: string
  description: string
  leadTime: string
}

export const products: Product[] = [
  {
    slug: 'dune-sofa',
    name: 'Dune Sofa',
    category: 'Seating',
    price: 12400,
    image: '/images/product-dune-sofa.png',
    designer: 'Elena Sauvé',
    material: 'Ivory bouclé, kiln-dried beech frame',
    dimensions: 'W 280 × D 105 × H 72 cm',
    description:
      'A sweeping, sculptural silhouette inspired by wind-carved sand. Hand-upholstered in our Normandy workshop with eight-way hand-tied springs.',
    leadTime: '10–12 weeks',
  },
  {
    slug: 'halo-chair',
    name: 'Halo Lounge Chair',
    category: 'Seating',
    price: 4800,
    image: '/images/product-halo-chair.png',
    designer: 'Studio Sauvé',
    material: 'Solid walnut, cognac saddle leather',
    dimensions: 'W 78 × D 82 × H 74 cm',
    description:
      'A continuous bentwood arc that cradles the body. Each frame is steam-bent from a single walnut lamination and oiled by hand.',
    leadTime: '8–10 weeks',
  },
  {
    slug: 'monolith-table',
    name: 'Monolith Dining Table',
    category: 'Tables',
    price: 18900,
    image: '/images/product-monolith-table.png',
    designer: 'Elena Sauvé',
    material: 'Honed Roman travertine',
    dimensions: 'W 300 × D 110 × H 75 cm',
    description:
      'Carved from a single travertine block with a pedestal base that appears to grow from the floor. Sealed for everyday living.',
    leadTime: '14–16 weeks',
  },
  {
    slug: 'arc-lamp',
    name: 'Arc Floor Lamp',
    category: 'Lighting',
    price: 3200,
    image: '/images/product-arc-lamp.png',
    designer: 'Marius Okafor',
    material: 'Brushed brass, hand-pleated paper shade',
    dimensions: 'H 185 × Ø 48 cm',
    description:
      'A slender brass arc that lifts a softly glowing paper shade overhead — the warmth of candlelight, engineered for modern rooms.',
    leadTime: '6–8 weeks',
  },
  {
    slug: 'ridge-table',
    name: 'Ridge Coffee Table',
    category: 'Tables',
    price: 5600,
    image: '/images/product-ridge-table.png',
    designer: 'Studio Sauvé',
    material: 'Fluted solid oak, smoked finish',
    dimensions: 'Ø 110 × H 34 cm',
    description:
      'Hand-routed flutes catch the light as it moves through the day. A quiet centrepiece with the presence of architecture.',
    leadTime: '8–10 weeks',
  },
  {
    slug: 'ember-sideboard',
    name: 'Ember Sideboard',
    category: 'Storage',
    price: 9800,
    image: '/images/product-ember-sideboard.png',
    designer: 'Marius Okafor',
    material: 'Burl walnut veneer, bronze pulls',
    dimensions: 'W 220 × D 50 × H 78 cm',
    description:
      'Book-matched burl walnut doors open onto cedar-lined interiors. Bronze pulls are lost-wax cast and develop a patina over time.',
    leadTime: '12–14 weeks',
  },
  {
    slug: 'cove-armchair',
    name: 'Cove Armchair',
    category: 'Seating',
    price: 4200,
    image: '/images/product-cove-armchair.png',
    designer: 'Elena Sauvé',
    material: 'Terracotta wool velvet, oak plinth',
    dimensions: 'W 86 × D 84 × H 70 cm',
    description:
      'A generous, enveloping shell upholstered in rich terracotta velvet — an invitation to slow down and stay a while.',
    leadTime: '8–10 weeks',
  },
  {
    slug: 'pebble-table',
    name: 'Pebble Side Table',
    category: 'Tables',
    price: 1900,
    image: '/images/product-pebble-table.png',
    designer: 'Studio Sauvé',
    material: 'Cast stone, mineral finish',
    dimensions: 'Ø 45 × H 48 cm',
    description:
      'Soft, river-worn proportions cast in mineral stone. Equally at home beside a sofa, a bath or a bed.',
    leadTime: '4–6 weeks',
  },
]

export const services = [
  {
    no: '01',
    title: 'Interior Architecture',
    body: 'Spatial planning, joinery and the bones of a home — we reshape volume and light before a single object is placed.',
  },
  {
    no: '02',
    title: 'Full-Service Interiors',
    body: 'From concept to the final cushion. We source, commission, install and style every room down to the books on the shelf.',
  },
  {
    no: '03',
    title: 'Bespoke Furniture',
    body: 'One-of-a-kind pieces designed for your space and made by hand in our atelier using timber, stone and metal of record.',
  },
  {
    no: '04',
    title: 'Hospitality & Retail',
    body: 'Boutique hotels, restaurants and flagship stores with a sense of place — designed for guests to remember and return.',
  },
]

export const formatPrice = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
