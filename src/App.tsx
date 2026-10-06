import React, { useState, useEffect } from 'react';
import { 
  MapPin, Search, ShoppingBag, Heart, Home, Compass, Package, 
  ChevronRight, ChevronLeft, Star, Plus, Minus, X, Check, Sparkles, 
  Moon, Sun, Phone, MessageSquare, Tag, ArrowRight, 
  ShieldCheck, Award, Flame, Gift, CreditCard, ChevronDown, 
  CheckCircle2, Trash2, Leaf, HeartHandshake, PhoneCall,
  Copy, ExternalLink, MessageCircle, CheckCheck, Smartphone, Building2
} from 'lucide-react';

// --- OFFICIAL BUSINESS LOGO (Pekas Fit Oficial) ---
import pekasLogoImg from './assets/images/pekas_fit_logo.jpg';

// --- AUTHENTIC PEKAS FIT LOGO (Fresco, Saludable y Natural - Verde Botánico Vivo) ---
function PekasLogo({ className = "w-11 h-11" }: { className?: string; size?: "small" | "large" }) {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      <div className={`relative flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-white shadow-xs border border-[#1e702e]/30 ${className} select-none`}>
        <img 
          src={pekasLogoImg} 
          alt="Pekas Fit Logo Oficial" 
          className="w-full h-full object-cover rounded-full"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className} select-none`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs">
        {/* Organic Fresh Botanical Green Splash Base */}
        <circle cx="50" cy="50" r="48" fill="#1e702e" />
        <circle cx="50" cy="50" r="43" fill="#2a8b3b" />
        {/* Foliage leaves */}
        <path d="M50 16 C60 10 72 18 68 32 C60 33 54 26 50 16 Z" fill="#145620" />
        <path d="M50 16 C40 10 28 18 32 32 C40 33 46 26 50 16 Z" fill="#42b854" />
        {/* Roasted Nuts */}
        <ellipse cx="50" cy="42" rx="20" ry="10" fill="#4e2c17" />
        <circle cx="50" cy="50" r="7" fill="#ffcc80" />
        <circle cx="62" cy="47" r="5" fill="#ffe082" />
        <circle cx="38" cy="47" r="5" fill="#ffab91" />
        {/* Brand name */}
        <text x="50" y="70" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif">
          Pekas Fit
        </text>
        {/* Ribbon badge */}
        <rect x="8" y="78" width="84" height="13" rx="4" fill="#ffffff" />
        <text x="50" y="87" textAnchor="middle" fill="#23150e" fontSize="5.4" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.3">
          FRESCO, SALUDABLE Y NATURAL
        </text>
      </svg>
    </div>
  );
}

// --- INTERACTIVE PROMOTIONAL SLIDES (DIAPOSITIVAS) ---
const PROMO_SLIDES = [
  {
    id: 1,
    tag: 'Fresco, Saludable y Natural',
    tagIcon: Leaf,
    title: 'Mantequillas 100% Puras',
    subtitle: 'Maní, Almendras y Cashews sin azúcar ni aceites añadidos.',
    btnText: 'Ver Mantequillas',
    category: 'mantequillas',
    image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&q=80&w=400',
    bgLight: 'from-[#f2f8ee] via-[#e5f2de] to-[#d8ebcd]',
    bgDark: 'dark:from-[#132816] dark:via-[#19321c] dark:to-[#122415]'
  },
  {
    id: 2,
    tag: 'Promociones Oficiales',
    tagIcon: Gift,
    title: 'Combos Dúo & Trío Pekas',
    subtitle: 'Combina tus frascos favoritos y ahorra con descuento especial.',
    btnText: 'Ver Promociones',
    category: 'promos',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400',
    bgLight: 'from-[#faf6e8] via-[#f5eed4] to-[#ede3bf]',
    bgDark: 'dark:from-[#242115] dark:via-[#2c2919] dark:to-[#1c1a10]'
  },
  {
    id: 3,
    tag: 'Detalles Gourmet',
    tagIcon: Heart,
    title: 'Fit Boxes Personalizados',
    subtitle: 'Regalos saludables con frutos secos selectos y dedicatoria única.',
    btnText: 'Ver Fit Boxes',
    category: 'boxes',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=400',
    bgLight: 'from-[#fdf1e8] via-[#fae3d5] to-[#f4d4c1]',
    bgDark: 'dark:from-[#2a1c15] dark:via-[#35231a] dark:to-[#211611]'
  }
];

// --- TYPES ---
interface Product {
  id: string;
  name: string;
  category: 'mantequillas' | 'frutos' | 'deshidratadas' | 'promos' | 'boxes';
  description: string;
  ingredients: string;
  benefits: string[];
  rating: number;
  reviewsCount: number;
  deliveryTime: string;
  image: string;
  isFavorite?: boolean;
  isBestSeller?: boolean;
  variants: {
    size: string;
    price: number;
  }[];
}

interface CartItem {
  product: Product;
  selectedVariant: { size: string; price: number };
  quantity: number;
}

interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  district: string;
  reference: string;
  notes?: string;
}

interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: 'yape' | 'bcp';
  customer: CustomerInfo;
  status: 'whatsapp_enviado' | 'pagado' | 'entregado';
}

const LIMA_DISTRICTS = [
  'Miraflores', 'San Isidro', 'Santiago de Surco', 'San Borja', 'Barranco',
  'San Miguel', 'Jesús María', 'Magdalena del Mar', 'Lince', 'Pueblo Libre',
  'La Molina', 'Surquillo', 'Breña', 'Los Olivos', 'Chorrillos', 'San Juan de Miraflores',
  'Bellavista / Callao', 'Ate / Salamanca', 'San Luis', 'Independencia'
];

// --- CATALOG DATA OFICIAL PEKAS FIT ---
const PRODUCTS: Product[] = [
  // 1. Mantequillas Naturales
  {
    id: 'm-1',
    name: 'Mantequilla de Maní 100% Natural',
    category: 'mantequillas',
    description: 'Maní tostado artesanalmente sin aditivos, ideal para deportistas, bebés y dieta keto.',
    ingredients: '100% Maní seleccionado de primera calidad.',
    benefits: ['Libre de azúcar, sal y gluten', 'Sin aceites añadidos ni preservantes', 'Apto para bebés desde 6 meses y veganos'],
    rating: 4.9,
    reviewsCount: 142,
    deliveryTime: '20-30 min',
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&q=80&w=600',
    isBestSeller: true,
    variants: [
      { size: '250 ML', price: 15 },
      { size: '460 ML', price: 23 },
      { size: '720 ML', price: 35 },
      { size: '1 KL', price: 42 }
    ]
  },
  {
    id: 'm-2',
    name: 'Chocomaní Artesanal',
    category: 'mantequillas',
    description: 'Deliciosa combinación de maní tostado con cacao orgánico peruano y toque de stevia natural.',
    ingredients: 'Maní tostado, cacao orgánico peruano, stevia natural.',
    benefits: ['Cacao orgánico rico en antioxidantes', 'Energía limpia sin culpa', 'Línea Choco apta para niños >2 años y deportistas'],
    rating: 4.8,
    reviewsCount: 98,
    deliveryTime: '20-30 min',
    image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&q=80&w=600',
    isBestSeller: true,
    variants: [
      { size: '250 ML', price: 16 },
      { size: '460 ML', price: 24 },
      { size: '720 ML', price: 36 },
      { size: '1 KL', price: 43 }
    ]
  },
  {
    id: 'm-3',
    name: 'Mantequilla de Almendras',
    category: 'mantequillas',
    description: 'Almendras enteras tostadas con textura cremosa y gran aporte de vitamina E y calcio.',
    ingredients: '100% Almendras tostadas puras.',
    benefits: ['Grasas monoinsaturadas cardiosaludables', 'Sin azúcar ni aditivos', 'Ideal para untar en frutas o tostadas'],
    rating: 5.0,
    reviewsCount: 84,
    deliveryTime: '25-35 min',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    isBestSeller: true,
    variants: [
      { size: '250 ML', price: 25 },
      { size: '460 ML', price: 42 },
      { size: '720 ML', price: 58 },
      { size: '1 KL', price: 80 }
    ]
  },
  {
    id: 'm-4',
    name: 'Chocoalmendras',
    category: 'mantequillas',
    description: 'Crema de almendras premium enriquecida con cacao orgánico y stevia.',
    ingredients: 'Almendras tostadas, cacao orgánico peruano, stevia.',
    benefits: ['Poder antioxidante natural', 'Sabor a postre gourmet saludable', 'Sin gluten, sal ni preservantes'],
    rating: 4.9,
    reviewsCount: 65,
    deliveryTime: '25-35 min',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&q=80&w=600',
    variants: [
      { size: '250 ML', price: 26 },
      { size: '460 ML', price: 43 },
      { size: '720 ML', price: 59 },
      { size: '1 KL', price: 82 }
    ]
  },
  {
    id: 'm-5',
    name: 'Mantequilla de Cashews (Anacardos)',
    category: 'mantequillas',
    description: 'Suave y mantecosa pasta de anacardos tostados con dulzor natural.',
    ingredients: '100% Cashews tostados.',
    benefits: ['Rico en magnesio, zinc y hierro', 'Textura naturalmente sedosa', 'Ideal para bowls y batidos'],
    rating: 4.7,
    reviewsCount: 51,
    deliveryTime: '25-35 min',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600',
    variants: [
      { size: '250 ML', price: 28 },
      { size: '460 ML', price: 46 },
      { size: '720 ML', price: 65 },
      { size: '1 KL', price: 90 }
    ]
  },
  {
    id: 'm-6',
    name: 'Chococashews',
    category: 'mantequillas',
    description: 'Cashews selectos fusionados con chocolate orgánico saludable.',
    ingredients: 'Cashews tostados, cacao orgánico, stevia.',
    benefits: ['Combinación gourmet única', 'Energía limpia para entrenamientos', '100% natural'],
    rating: 4.8,
    reviewsCount: 43,
    deliveryTime: '25-35 min',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
    variants: [
      { size: '250 ML', price: 29 },
      { size: '460 ML', price: 47 },
      { size: '720 ML', price: 66 },
      { size: '1 KL', price: 91 }
    ]
  },

  // 2. Promos & Combos Oficiales
  {
    id: 'p-1',
    name: 'Dúo Maní + Chocomaní',
    category: 'promos',
    description: 'El combo favorito de la casa: 1 Maní Natural + 1 Chocomaní para alternar según tu antojo.',
    ingredients: '1 Frasco Maní 100% + 1 Frasco Chocomaní.',
    benefits: ['Ahorro garantizado', 'Duración de 3 meses en ambiente templado', 'Favorito de las familias'],
    rating: 4.9,
    reviewsCount: 210,
    deliveryTime: '15-25 min',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600',
    isBestSeller: true,
    variants: [
      { size: '460 ML c/u', price: 43 },
      { size: '1 KL c/u', price: 80 }
    ]
  },
  {
    id: 'p-2',
    name: 'Dúo Almendra + Chocoalmendras',
    category: 'promos',
    description: 'El pack más distinguido: 1 Frasco de Almendras + 1 Frasco de Chocoalmendras.',
    ingredients: '1 Frasco Almendras + 1 Frasco Chocoalmendras.',
    benefits: ['Máximo aporte de vitamina E', 'Elegante y saludable', 'Descuento especial por pack'],
    rating: 5.0,
    reviewsCount: 115,
    deliveryTime: '20-30 min',
    image: 'https://images.unsplash.com/photo-1599599810694-b5b37242c334?auto=format&fit=crop&q=80&w=600',
    variants: [
      { size: '460 ML c/u', price: 84 },
      { size: '1 KL c/u', price: 155 }
    ]
  },
  {
    id: 'p-3',
    name: 'Trío Maní + Chocomaní + Almendra',
    category: 'promos',
    description: 'Los tres grandes éxitos de Pekas Fit en un solo pack con precio promocional.',
    ingredients: '1 Maní Natural + 1 Chocomaní + 1 Almendras.',
    benefits: ['Variedad completa', 'Excelente para obsequiar o stockear', 'Precio preferencial'],
    rating: 4.9,
    reviewsCount: 178,
    deliveryTime: '20-30 min',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=600',
    isBestSeller: true,
    variants: [
      { size: '460 ML c/u', price: 82 },
      { size: '1 KL c/u', price: 156 }
    ]
  },

  // 3. Frutos Secos & Mixes
  {
    id: 'f-1',
    name: 'Almendra Tostada',
    category: 'frutos',
    description: 'Almendras enteras tostadas a temperatura justa, crocantes y aromáticas.',
    ingredients: '100% Almendras enteras.',
    benefits: ['Cero sal añadida', 'Excelente snack antiestrés', 'Alto en fibra dietaria'],
    rating: 4.8,
    reviewsCount: 89,
    deliveryTime: '20-30 min',
    image: 'https://images.unsplash.com/photo-1508061253366-f7da154b6d46?auto=format&fit=crop&q=80&w=600',
    variants: [
      { size: '250 GR', price: 13 },
      { size: '500 GR', price: 25 },
      { size: '1 KL', price: 49 }
    ]
  },
  {
    id: 'f-2',
    name: 'Avellana Tostada',
    category: 'frutos',
    description: 'Avellanas selectas tostadas con sabor profundo y textura crujiente.',
    ingredients: '100% Avellanas tostadas.',
    benefits: ['Ricas en grasas saludables y biotina', 'Efecto antioxidante', 'Sabor gourmet'],
    rating: 4.9,
    reviewsCount: 52,
    deliveryTime: '20-30 min',
    image: 'https://images.unsplash.com/photo-1579888944895-d609235e1d74?auto=format&fit=crop&q=80&w=600',
    variants: [
      { size: '250 GR', price: 20 },
      { size: '500 GR', price: 40 },
      { size: '1 KL', price: 80 }
    ]
  },
  {
    id: 'f-3',
    name: 'Cashew Tostado',
    category: 'frutos',
    description: 'Castañas de cajú tostadas sin sal, delicadamente mantecosas y crujientes.',
    ingredients: '100% Cashews tostados.',
    benefits: ['Apoyo cardiovascular', 'Aporte de zinc y fósforo', 'Snack saciante'],
    rating: 4.8,
    reviewsCount: 77,
    deliveryTime: '20-30 min',
    image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=600',
    variants: [
      { size: '250 GR', price: 16 },
      { size: '500 GR', price: 30 },
      { size: '1 KL', price: 59 }
    ]
  },
  {
    id: 'f-4',
    name: 'Mix Tradicional de Frutos',
    category: 'frutos',
    description: 'Mezcla energética y clásica: Maníes, pasas morenas, almendras y nueces.',
    ingredients: 'Maníes, pasas morenas, almendras y nueces seleccionadas.',
    benefits: ['Energía natural instantánea', 'Equilibrio perfecto dulce y salado', 'Ideal para trabajo o entrenamiento'],
    rating: 4.7,
    reviewsCount: 134,
    deliveryTime: '15-25 min',
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&q=80&w=600',
    isBestSeller: true,
    variants: [
      { size: '500 GR', price: 20 },
      { size: '1 KL', price: 40 }
    ]
  },
  {
    id: 'f-5',
    name: 'Mix Tropical',
    category: 'frutos',
    description: 'Mezcla exótica con frutos secos y trozos de frutas deshidratadas.',
    ingredients: 'Kiwis, damascos, arándanos, almendras y nueces.',
    benefits: ['Vitaminas C y E', 'Sabor refrescante y frutal', 'Excelente para la digestión'],
    rating: 4.9,
    reviewsCount: 92,
    deliveryTime: '15-25 min',
    image: 'https://images.unsplash.com/photo-1534482492-2643fa3f0372?auto=format&fit=crop&q=80&w=600',
    variants: [
      { size: '500 GR', price: 29 },
      { size: '1 KL', price: 56 }
    ]
  },
  {
    id: 'f-6',
    name: 'Mix Premium de Frutos',
    category: 'frutos',
    description: 'La selección de lujo: Pistachos, pecanas, arándanos, pasas rubias y nueces.',
    ingredients: 'Pistachos, pecanas, arándanos, pasas rubias y nueces.',
    benefits: ['Máxima categoría gourmet', 'Alto en Omega-3', 'Snack distinguido para agasajar'],
    rating: 5.0,
    reviewsCount: 118,
    deliveryTime: '20-30 min',
    image: 'https://images.unsplash.com/photo-1577003837690-9430c3359d9f?auto=format&fit=crop&q=80&w=600',
    variants: [
      { size: '500 GR', price: 32 },
      { size: '1 KL', price: 62 }
    ]
  },

  // 4. Frutas Deshidratadas
  {
    id: 'd-1',
    name: 'Aguaymanto Deshidratado',
    category: 'deshidratadas',
    description: 'Superfruto peruano deshidratado con sabor agridulce intenso y natural.',
    ingredients: '100% Aguaymanto silvestre deshidratado.',
    benefits: ['Muy alto en vitamina C y provitamina A', 'Fortalece el sistema inmune', 'Bajo índice glucémico'],
    rating: 4.9,
    reviewsCount: 88,
    deliveryTime: '20-30 min',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=600',
    variants: [
      { size: '250 GR', price: 16 },
      { size: '500 GR', price: 30 },
      { size: '1 KL', price: 59 }
    ]
  },
  {
    id: 'd-2',
    name: 'Arándano Deshidratado',
    category: 'deshidratadas',
    description: 'Arándanos suaves y jugosos, conservando todas sus propiedades antioxidantes.',
    ingredients: 'Arándanos seleccionados con mínimo toque de aceite de girasol.',
    benefits: ['Poderoso antioxidante cerebral y celular', 'Protección del tracto urinario', 'Delicioso en yogures y avenas'],
    rating: 4.8,
    reviewsCount: 104,
    deliveryTime: '20-30 min',
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&q=80&w=600',
    variants: [
      { size: '250 GR', price: 13 },
      { size: '500 GR', price: 25 },
      { size: '1 KL', price: 50 }
    ]
  },
  {
    id: 'd-3',
    name: 'Mango Deshidratado',
    category: 'deshidratadas',
    description: 'Tiras de mango dulce deshidratado sin azúcares refinados ni colorantes.',
    ingredients: '100% Mango fresco deshidratado.',
    benefits: ['Dulzor tropical natural', 'Aporte de fibra y betacarotenos', 'Snack preferido por niños'],
    rating: 4.9,
    reviewsCount: 95,
    deliveryTime: '20-30 min',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=600',
    variants: [
      { size: '250 GR', price: 17 },
      { size: '500 GR', price: 33 },
      { size: '1 KL', price: 65 }
    ]
  },
  {
    id: 'd-4',
    name: 'Dátiles Naturales Medjool',
    category: 'deshidratadas',
    description: 'Dátiles enteros carnosos, el endulzante saludable por excelencia.',
    ingredients: '100% Dátiles enteros seleccionados.',
    benefits: ['Excelente sustituto de azúcar refinada', 'Energía pre-entrenamiento inmediata', 'Ricos en potasio y fibra'],
    rating: 5.0,
    reviewsCount: 140,
    deliveryTime: '20-30 min',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=600',
    variants: [
      { size: '250 GR', price: 7 },
      { size: '500 GR', price: 14 },
      { size: '1 KL', price: 28 }
    ]
  },

  // 5. Fit Boxes Personalizados
  {
    id: 'b-1',
    name: 'Fit Box San Valentín / Aniversario',
    category: 'boxes',
    description: 'Caja de regalo personalizada con globos, chocolates saludables, frasco de mantequilla y frutos secos.',
    ingredients: 'Frasco de mantequilla a elección + mix frutos secos + chocolates orgánicos + tarjeta dedicatoria + globos decorativos.',
    benefits: ['Personalizado con la dedicatoria que desees', 'Empaque de lujo con lazo de cinta', 'Reserva con 1 día de anticipación'],
    rating: 5.0,
    reviewsCount: 67,
    deliveryTime: 'Programado / 45 min',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600',
    isBestSeller: true,
    variants: [
      { size: 'Edición Estándar', price: 70 }
    ]
  },
  {
    id: 'b-2',
    name: 'Fit Box Día de la Madre / Padre',
    category: 'boxes',
    description: 'Box temático especial con frascos de mantequilla, frutos deshidratados, tarjeta y arreglo floral/decoración.',
    ingredients: 'Frascos Pekas Fit + frutos selectos + dedicatoria especial + finos accesorios decorativos.',
    benefits: ['Salud y cariño en un solo detalle', 'Diseño exclusivo Pekas Fit', 'Tarjeta con mensaje impreso'],
    rating: 4.9,
    reviewsCount: 89,
    deliveryTime: 'Programado / 45 min',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
    isBestSeller: true,
    variants: [
      { size: 'Edición Especial', price: 70 }
    ]
  },
  {
    id: 'b-3',
    name: 'Mini Fit Box para Cualquier Ocasión',
    category: 'boxes',
    description: 'Detalle compacto y elegante para cumpleaños, agradecimientos o sorpresas corporativas.',
    ingredients: 'Snacks saludables, frutos secos y tarjeta personalizada.',
    benefits: ['Económico, práctico y saludable', 'Perfecto para sorpresas', '3 versiones a elección'],
    rating: 4.8,
    reviewsCount: 54,
    deliveryTime: '30-40 min',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600',
    variants: [
      { size: 'Mini Sweet', price: 40 },
      { size: 'Mini Mix', price: 55 },
      { size: 'Mini Premium', price: 60 }
    ]
  }
];

const ADDRESSES = [
  { id: '1', title: 'Casa', address: 'Av. Larco 456, Miraflores', time: '20-30 min' },
  { id: '2', title: 'Oficina', address: 'Calle Las Begonias 785, San Isidro', time: '25-35 min' },
  { id: '3', title: 'Depa Playa', address: 'Malecón Cisneros 120, Miraflores', time: '30-40 min' }
];

// --- PORTADA OFICIAL DE LA APP (Bienvenida, Identidad Pekas Fit y Acceso Flotante al Catálogo) ---
interface AppCoverScreenProps {
  onEnterCatalog: () => void;
  onSelectCategory: (category: string) => void;
  onSelectProduct: (product: Product) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

function AppCoverScreen({
  onEnterCatalog,
  onSelectCategory,
  onSelectProduct,
  darkMode,
  setDarkMode,
}: AppCoverScreenProps) {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#faf8f5] dark:bg-[#0c180e] text-[#23150e] dark:text-[#f3f4f6]">
      {/* Decorative organic background aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[460px] bg-gradient-to-b from-[#1e702e]/15 via-[#2a8b3b]/10 to-transparent dark:from-[#174821]/40 dark:via-[#102d16]/25 dark:to-transparent pointer-events-none rounded-b-[50%] blur-2xl"></div>

      {/* 1. Header Bar de Portada */}
      <header className="relative z-10 px-4 pt-4 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 bg-white/85 dark:bg-[#142617]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#ede5d3] dark:border-[#1e3a22] shadow-xs">
          <MapPin className="w-3.5 h-3.5 text-[#1e702e] dark:text-[#4ade80]" />
          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
            Lima Metropolitana · Delivery
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Dark mode button */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-white/85 dark:bg-[#142617]/85 backdrop-blur-md border border-[#ede5d3] dark:border-[#1e3a22] text-slate-700 dark:text-slate-200 hover:scale-105 transition shadow-xs cursor-pointer"
            title={darkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            aria-label="Cambiar tema de color"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Direct skip to catalog */}
          <button
            onClick={onEnterCatalog}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#1e702e]/10 dark:bg-[#1e702e]/30 hover:bg-[#1e702e]/20 text-[#1e702e] dark:text-[#4ade80] text-xs font-black transition cursor-pointer"
          >
            <span>Catálogo</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 2. Hero Centerpiece: Real Business Logo + Slogan */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-3 text-center max-w-md mx-auto w-full">
        
        {/* Floating Business Logo with soft ambient aura */}
        <div className="relative mb-4 group animate-float-gentle">
          {/* Ambient glow */}
          <div className="absolute -inset-3 bg-gradient-to-tr from-[#1e702e] via-[#42b854] to-[#86efac] rounded-full blur-xl opacity-40 dark:opacity-50 animate-pulse"></div>
          
          {/* Circular badge container */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-b from-white via-[#f0f9ee] to-white dark:from-[#1b3d20] dark:via-[#112a15] dark:to-[#1b3d20] shadow-2xl border-2 border-[#1e702e]/30">
            <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-inner flex items-center justify-center">
              <img 
                src={pekasLogoImg} 
                alt="Pekas Fit Oficial" 
                className="w-full h-full object-cover rounded-full select-none"
              />
            </div>
          </div>

          {/* Floating quality guarantee pill */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#1e702e] text-white px-3.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase shadow-md border border-white/60 dark:border-white/20 whitespace-nowrap flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-amber-300" />
            <span>100% Artesanal</span>
          </div>
        </div>

        {/* Brand Headline */}
        <div className="space-y-1.5 mt-2">
          <p className="text-xs font-black tracking-[0.2em] text-[#1e702e] dark:text-[#4ade80] uppercase">
            Fresco, Saludable y Natural
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
            Pekas Fit
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xs mx-auto font-medium leading-relaxed">
            Mantequillas 100% Puras de Maní, Almendras y Cashews, Frutos Secos Selectos y Fit Boxes Personalizados.
          </p>
        </div>

        {/* Unboxed Brand Highlights (Clean Typography) */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mt-3.5">
          <span className="flex items-center gap-1 text-[#1e702e] dark:text-[#4ade80] font-bold">
            <Leaf className="w-3.5 h-3.5" /> Sin aditivos ni azúcar
          </span>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
          <span className="font-semibold">🛵 Envíos a todo Lima</span>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
          <span className="font-semibold">⭐ 4.9 Valoración</span>
        </div>

        {/* Featured Mini Previews (3 Top Favorites) */}
        <div className="w-full grid grid-cols-3 gap-2 mt-5">
          {PRODUCTS.slice(0, 3).map((prod) => (
            <button
              key={prod.id}
              onClick={() => {
                onSelectProduct(prod);
                onEnterCatalog();
              }}
              className="bg-white/85 dark:bg-[#142617]/85 backdrop-blur-xs p-2 rounded-2xl border border-[#ede5d3] dark:border-[#1d3821] hover:border-[#1e702e]/60 transition text-left shadow-xs hover:shadow-md cursor-pointer group"
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-1.5">
                <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              </div>
              <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 line-clamp-1 leading-tight">
                {prod.name}
              </p>
              <p className="text-[10px] font-black text-[#1e702e] dark:text-[#4ade80] mt-0.5">
                Desde S/ {prod.variants[0].price}
              </p>
            </button>
          ))}
        </div>
      </main>

      {/* 3. NATIVE FLOATING ACTION CARD ("flotante para darle click e ingresar al catálogo") */}
      <footer className="relative z-20 px-4 pb-6 pt-2 max-w-md mx-auto w-full">
        <div className="bg-white/95 dark:bg-[#132415]/95 backdrop-blur-md rounded-3xl p-4 shadow-2xl border border-[#ede5d3] dark:border-[#214326] animate-pulse-glow">
          
          {/* Main Floating Enter Button */}
          <button
            onClick={onEnterCatalog}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#1e702e] to-[#155a23] hover:from-[#238537] hover:to-[#1a6e2b] text-white font-extrabold text-sm tracking-wide flex items-center justify-between shadow-lg shadow-[#1e702e]/30 active:scale-[0.98] transition-all cursor-pointer group relative overflow-hidden"
          >
            {/* Shimmer sweep effect */}
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer pointer-events-none"></div>

            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 shadow-inner">
                <ShoppingBag className="w-5 h-5 text-amber-300" />
              </div>
              <div className="text-left">
                <span className="block text-sm font-black text-white leading-tight">
                  Ingresar al Catálogo
                </span>
                <span className="block text-[11px] font-medium text-[#d1f2d6] leading-tight mt-0.5">
                  Ver productos, promociones y pedir por WhatsApp
                </span>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform relative z-10">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </button>

          {/* Quick Category Access Row */}
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/10">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 shrink-0">
                Categorías:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {[
                  { id: 'mantequillas', label: '🥜 Mantequillas' },
                  { id: 'boxes', label: '🎁 Fit Boxes' },
                  { id: 'promos', label: '✨ Promos' },
                  { id: 'deshidratadas', label: '🍇 Frutas' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-[#1e702e]/15 hover:text-[#1e702e] text-slate-700 dark:text-slate-300 text-[11px] font-bold transition whitespace-nowrap cursor-pointer"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* WhatsApp info line */}
          <div className="mt-2 text-center">
            <a 
              href="https://api.whatsapp.com/send?phone=51970380415&text=Hola%20Pekas%20Fit,%20quisiera%20hacer%20un%20pedido%20o%20consultar%20su%20catálogo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#1e702e] dark:text-[#4ade80] hover:underline cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Pedidos directos por WhatsApp: +51 970 380 415</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  // Navigation & View States
  const [showCoverScreen, setShowCoverScreen] = useState(true);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pekas_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pekas_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pekas_theme', 'light');
    }
  }, [darkMode]);

  const [activeTab, setActiveTab] = useState<'inicio' | 'explorar' | 'pedidos' | 'favoritos'>('inicio');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentAddress, setCurrentAddress] = useState(ADDRESSES[0]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  
  // Product Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [productQuantity, setProductQuantity] = useState(1);

  // Cart & Checkout State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [tipAmount, setTipAmount] = useState<number>(3);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  // Favorites State
  const [favorites, setFavorites] = useState<string[]>(['m-1', 'm-3', 'p-1']);

  // Diapositivas / Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [isSlideInteracting, setIsSlideInteracting] = useState(false);
  const [mouseStartX, setMouseStartX] = useState<number | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % PROMO_SLIDES.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + PROMO_SLIDES.length) % PROMO_SLIDES.length);

  // Auto-play diapositivas cada 4.2 segundos (se pausa al tocar o interactuar)
  useEffect(() => {
    if (isSlideInteracting) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % PROMO_SLIDES.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [isSlideInteracting]);

  // Soporte táctil móvil (Swipe gestures con el dedo en celular)
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsSlideInteracting(true);
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsSlideInteracting(false);
    if (touchStartX !== null && touchEndX !== null) {
      const distance = touchStartX - touchEndX;
      if (distance > 35) {
        nextSlide();
      } else if (distance < -35) {
        prevSlide();
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Soporte de arrastre con mouse para escritorio
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
    setIsSlideInteracting(true);
    setMouseStartX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isMouseDown && mouseStartX !== null) {
      const distance = mouseStartX - e.clientX;
      if (distance > 35) {
        nextSlide();
      } else if (distance < -35) {
        prevSlide();
      }
    }
    setIsMouseDown(false);
    setIsSlideInteracting(false);
    setMouseStartX(null);
  };

  // Checkout & Customer Data States (Datos de envío + Métodos de pago Yape/BCP + WhatsApp)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'yape' | 'bcp'>('yape');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [customerName, setCustomerName] = useState('Luis García');
  const [customerPhone, setCustomerPhone] = useState('970380415');
  const [customerAddress, setCustomerAddress] = useState(currentAddress.address);
  const [customerDistrict, setCustomerDistrict] = useState('Miraflores');
  const [customerReference, setCustomerReference] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  // Selected Order for viewing payment info in Pedidos tab
  const [selectedOrderForPayment, setSelectedOrderForPayment] = useState<Order | null>(null);
  const [orderSuccessModal, setOrderSuccessModal] = useState<{ order: Order; whatsappUrl: string } | null>(null);

  const [ordersHistory, setOrdersHistory] = useState<Order[]>([
    {
      id: 'PEK-9842',
      date: 'Ayer, 14:30 hrs',
      items: [{ product: PRODUCTS[0], selectedVariant: { size: '460 ML', price: 23 }, quantity: 2 }],
      subtotal: 46,
      deliveryFee: 5,
      discount: 0,
      total: 51,
      paymentMethod: 'yape',
      customer: {
        name: 'Luis García',
        phone: '970380415',
        address: 'Av. Larco 456',
        district: 'Miraflores',
        reference: 'Frente al parque'
      },
      status: 'whatsapp_enviado'
    }
  ]);

  // Copy to clipboard helper with instant feedback
  const copyToClipboard = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(label);
      showToast(`¡${label === 'yape_num' ? 'Número Yape' : label === 'bcp_cta' ? 'N° Cuenta BCP' : 'Código CCI'} copiado al portapapeles!`);
      setTimeout(() => setCopiedField(null), 3000);
    }
  };

  // Toast notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  // Toggle favorite
  const toggleFavorite = (productId: string) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  // Add to cart with full multi-product ordering support
  const addToCart = (product: Product, variant = product.variants[0], qty = 1, openCart = false) => {
    const existingIndex = cart.findIndex(
      item => item.product.id === product.id && item.selectedVariant.size === variant.size
    );
    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += qty;
      setCart(newCart);
    } else {
      setCart([...cart, { product, selectedVariant: variant, quantity: qty }]);
    }
    
    if (openCart) {
      setIsCartOpen(true);
    } else {
      showToast(`¡${qty > 1 ? `${qty}x ` : ''}${product.name} agregado al pedido!`);
    }
  };

  const updateCartQty = (index: number, delta: number) => {
    const newCart = [...cart];
    newCart[index].quantity += delta;
    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  // Multi-product helpers for quick ordering on cards
  const getProductCartQuantity = (productId: string) => {
    return cart
      .filter(item => item.product.id === productId)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleIncrementProduct = (product: Product) => {
    const existingIndex = cart.findIndex(item => item.product.id === product.id);
    if (existingIndex > -1) {
      updateCartQty(existingIndex, 1);
    } else {
      addToCart(product, product.variants[0], 1, false);
    }
  };

  const handleDecrementProduct = (product: Product) => {
    const existingIndex = cart.findIndex(item => item.product.id === product.id);
    if (existingIndex > -1) {
      updateCartQty(existingIndex, -1);
    }
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Apply Coupon
  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'PEKAS10' || code === 'FIT10') {
      setDiscountPercent(10);
      setCouponApplied(true);
      showToast('¡Cupón PEKAS10 aplicado con éxito (-10%)!');
    } else if (code === 'DELIVERYFREE') {
      setDiscountPercent(5);
      setCouponApplied(true);
      showToast('¡Cupón DELIVERYFREE aplicado (-5%)!');
    } else {
      showToast('Cupón no válido. Prueba con: PEKAS10 o FIT10');
    }
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.selectedVariant.price * item.quantity, 0);
  const deliveryFee = subtotal > 80 ? 0 : 5;
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = Math.max(0, subtotal + deliveryFee + tipAmount - discountAmount);

  // Robust redirection helper to WhatsApp (+51 970 380 415)
  const redirectToWhatsApp = (message: string) => {
    const phone = '51970380415';
    const encoded = encodeURIComponent(message);
    const targetUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`;
    try {
      const link = document.createElement('a');
      link.href = targetUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      window.location.href = targetUrl;
    }
    return targetUrl;
  };

  // Send Order via WhatsApp with complete product list, payment details & delivery data
  const handleSendWhatsAppOrder = () => {
    if (!customerName.trim()) {
      showToast('Por favor, ingresa tu Nombre y Apellido para la entrega.');
      return;
    }
    if (!customerPhone.trim()) {
      showToast('Por favor, ingresa tu número de WhatsApp o Teléfono.');
      return;
    }
    if (!customerAddress.trim()) {
      showToast('Por favor, ingresa la dirección exacta de entrega.');
      return;
    }

    const orderId = 'PEK-' + Math.floor(1000 + Math.random() * 9000);
    
    // Lista completa de productos para WhatsApp
    const itemsText = cart.map((item, idx) => 
      `${idx + 1}. *${item.quantity}x ${item.product.name}* (${item.selectedVariant.size}) - S/ ${(item.selectedVariant.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const paymentLabel = paymentMethod === 'yape' 
      ? '📱 *YAPE* (+51 970 380 415 - Titular: Pekas Fit SAC)' 
      : '🏛️ *BCP* (Cuenta Corriente Soles: 193-98234120-0-45)';

    const msg = `🌿 *¡HOLA PEKAS FIT! Deseo confirmar mi pedido (#${orderId}):*

🛍️ *DETALLE DEL PEDIDO:*
${itemsText}

💰 *RESUMEN DE PAGO:*
• Subtotal: S/ ${subtotal.toFixed(2)}
• Envío (${customerDistrict}): ${deliveryFee === 0 ? '¡Gratis!' : `S/ ${deliveryFee.toFixed(2)}`}
${tipAmount > 0 ? `• Propina repartidor: S/ ${tipAmount.toFixed(2)}\n` : ''}${discountAmount > 0 ? `• Descuento cupón: -S/ ${discountAmount.toFixed(2)}\n` : ''}👉 *TOTAL A PAGAR: S/ ${total.toFixed(2)}*

💳 *MÉTODO DE PAGO ELEGIDO:*
${paymentLabel}
_(Adjunto a continuación mi constancia de pago)_

📍 *DATOS DE ENVÍO:*
• *Cliente:* ${customerName}
• *Teléfono:* ${customerPhone}
• *Dirección:* ${customerAddress}
• *Distrito:* ${customerDistrict}
${customerReference.trim() ? `• *Referencia:* ${customerReference.trim()}\n` : ''}${customerNotes.trim() ? `• *Notas:* ${customerNotes.trim()}\n` : ''}
¡Muchas gracias! Quedo a la espera de su confirmación 🙌`;

    const whatsappUrl = redirectToWhatsApp(msg);

    const newOrder: Order = {
      id: orderId,
      date: 'Hoy, hace un momento',
      items: [...cart],
      subtotal,
      deliveryFee,
      discount: discountAmount,
      total,
      paymentMethod,
      customer: {
        name: customerName,
        phone: customerPhone,
        address: customerAddress,
        district: customerDistrict,
        reference: customerReference,
        notes: customerNotes
      },
      status: 'whatsapp_enviado'
    };

    setOrdersHistory([newOrder, ...ordersHistory]);
    setCart([]);
    setShowCheckoutModal(false);
    setIsCartOpen(false);
    setActiveTab('pedidos');
    setOrderSuccessModal({ order: newOrder, whatsappUrl });
    showToast('¡Pedido listo! Redireccionando a WhatsApp (+51 970 380 415)...');
  };

  const handleResendWhatsAppOrder = (order: Order) => {
    const itemsText = order.items.map((item, idx) => 
      `${idx + 1}. *${item.quantity}x ${item.product.name}* (${item.selectedVariant.size}) - S/ ${(item.selectedVariant.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const paymentLabel = order.paymentMethod === 'yape' 
      ? '📱 *YAPE* (+51 970 380 415 - Pekas Fit SAC)' 
      : '🏛️ *BCP* (193-98234120-0-45)';

    const msg = `🌿 *HOLA PEKAS FIT - Consulta de Pedido (#${order.id}):*

🛍️ *Productos:*
${itemsText}

💰 *Total:* S/ ${order.total.toFixed(2)}
💳 *Pago:* ${paymentLabel}
📍 *Entrega:* ${order.customer.address}, ${order.customer.district} (${order.customer.name})
¡Hola! Deseo consultar el estado de este pedido registrado.`;

    const whatsappUrl = redirectToWhatsApp(msg);
    setOrderSuccessModal({ order, whatsappUrl });
    showToast('¡Redireccionando a WhatsApp (+51 970 380 415)...');
  };

  // Filter products
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory === 'todos' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.ingredients.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen w-full transition-colors duration-300 font-sans flex justify-center bg-[#faf8f5] dark:bg-[#0f140f] text-[#2b1f17] dark:text-[#f3f4f6] selection:bg-[#1e702e] selection:text-white">
      
      {/* NATIVE APP CONTAINER (Responsive: mobile full-width, centered on tablet/desktop) */}
      <div className="w-full max-w-lg md:max-w-xl min-h-screen bg-[#faf8f5] dark:bg-[#121812] flex flex-col relative shadow-sm md:shadow-2xl md:border-x md:border-[#ede5d3] md:dark:border-[#1d261c]">
        {showCoverScreen ? (
          <AppCoverScreen
            onEnterCatalog={() => setShowCoverScreen(false)}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setShowCoverScreen(false);
              setActiveTab('inicio');
            }}
            onSelectProduct={(prod) => {
              setSelectedProduct(prod);
              setShowCoverScreen(false);
            }}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        ) : (
          <>
            {/* NATIVE APP HEADER (Pekas Fit Official Brand Palette - Verde Botánico Fresco y Equilibrado) */}
            <header className="sticky top-0 z-30 bg-[#1e702e] dark:bg-[#102d16] text-white shadow-md transition-colors border-b border-[#175b25] dark:border-[#184620]">
              
              {/* Top Brand Bar */}
              <div className="px-4 pt-3 pb-2.5 flex items-center justify-between">
                {/* Logo and Business Name */}
                <div className="flex items-center gap-2.5">
                  <PekasLogo className="w-10 h-10" />
                  <div>
                    <h1 className="text-base font-black tracking-tight leading-none text-white drop-shadow-xs">
                      Pekas Fit
                    </h1>
                    <p className="text-[10px] font-bold text-[#c7edca] dark:text-[#aee2b2] tracking-wider uppercase mt-1">
                      Fresco, Saludable y Natural
                    </p>
                  </div>
                </div>

                {/* Clean Actions: Portada, Dark Mode & Cart */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* WhatsApp Direct Header Link */}
                  <a 
                    href="https://api.whatsapp.com/send?phone=51970380415&text=Hola%20Pekas%20Fit,%20quisiera%20hacer%20un%20pedido%20o%20consultar%20su%20catálogo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] transition text-white text-[11px] font-bold border border-white/25 shadow-xs cursor-pointer"
                    title="WhatsApp Oficial: +51 970 380 415"
                    aria-label="Contactar a WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white text-[#25D366]" />
                    <span className="hidden sm:inline">+51 970 380 415</span>
                    <span className="sm:hidden">WSP</span>
                  </a>

                  {/* Return to Portada Cover */}
                  <button 
                    onClick={() => setShowCoverScreen(true)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/20 dark:bg-[#193a20] hover:bg-white/30 dark:hover:bg-[#214c2a] transition text-white text-[11px] font-bold border border-white/25 shadow-xs cursor-pointer"
                    title="Ver Portada de Pekas Fit"
                    aria-label="Ver Portada"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Portada</span>
                  </button>

                  {/* Dark/Light mode button */}
                  <button 
                    onClick={() => setDarkMode(!darkMode)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/20 dark:bg-[#193a20] hover:bg-white/30 dark:hover:bg-[#214c2a] transition text-white text-[11px] font-bold border border-white/25 shadow-xs cursor-pointer"
                    title={darkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
                    aria-label="Cambiar tema de color"
                  >
                    {darkMode ? (
                      <>
                        <Sun className="w-3.5 h-3.5 text-amber-300" />
                        <span className="hidden sm:inline">Claro</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-3.5 h-3.5 text-slate-100" />
                        <span className="hidden sm:inline">Oscuro</span>
                      </>
                    )}
                  </button>

                  {/* Shopping Cart button */}
                  <button 
                    onClick={() => setIsCartOpen(true)}
                    className="relative p-2 rounded-full bg-[#351e16] dark:bg-[#22130e] hover:bg-[#4a2b20] transition text-white shadow-xs border border-amber-900/40 cursor-pointer"
                    title="Carrito de compras"
                    aria-label="Carrito"
                  >
                <ShoppingBag className="w-4 h-4 text-[#fff9d6]" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#f59e0b] text-[#3e2723] font-black text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md animate-scale">
                    {totalCartItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search bar styled with fresh botanical green */}
          <div className="px-4 pb-3">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-[#b2e2b9] dark:text-[#8ebf95]" />
              </span>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Busca mantequillas, frutos secos, mix, fit boxes..."
                className="w-full pl-9 pr-8 py-2 bg-[#144f21] dark:bg-[#14351a] placeholder-[#bfe8c5]/75 dark:placeholder-slate-400 text-white text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fcd34d] border border-[#1b6329] dark:border-[#1d4625] transition shadow-inner"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#b2e2b9] hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </header>

        {/* FLOATING TOAST NOTIFICATION */}
        {toastMessage && (
          <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 bg-[#1e702e] text-white text-xs font-bold px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 border border-white/20 animate-in fade-in slide-in-from-top duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
            <span className="truncate max-w-[280px]">{toastMessage}</span>
          </div>
        )}

        {/* NATIVE SCROLLABLE BODY CONTENT */}
        <main className="flex-1 overflow-y-auto pb-24 scroll-smooth">
          
          {/* TAB 1: INICIO */}
          {activeTab === 'inicio' && (
            <div className="p-4 space-y-6">
              
              {/* Carrusel de Diapositivas Táctil e Interactivo (Deslizable horizontal con gestos táctiles y automático) */}
              <div className="relative select-none">
                <div 
                  className="relative overflow-hidden rounded-3xl border border-[#ebe4d5] dark:border-[#223020] shadow-sm bg-white dark:bg-[#151c14]"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseEnter={() => setIsSlideInteracting(true)}
                  onMouseLeave={() => { setIsSlideInteracting(false); setIsMouseDown(false); }}
                >
                  {/* Pista deslizable con animación suave y transform */}
                  <div 
                    className="flex transition-transform duration-500 ease-out cursor-grab active:cursor-grabbing"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {PROMO_SLIDES.map((slide) => {
                      const TagIcon = slide.tagIcon;
                      return (
                        <div 
                          key={slide.id}
                          className={`w-full shrink-0 bg-gradient-to-br ${slide.bgLight} ${slide.bgDark} p-4 sm:p-5 flex items-center justify-between gap-3`}
                        >
                          <div className="relative z-10 flex-1 min-w-0 pr-1 pl-2">
                            <div className="inline-flex items-center gap-1 bg-[#1e702e] text-white font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs mb-1.5">
                              <TagIcon className="w-3 h-3" />
                              <span>{slide.tag}</span>
                            </div>
                            <h2 className="text-base sm:text-lg font-black leading-tight text-[#23150e] dark:text-white">
                              {slide.title}
                            </h2>
                            <p className="text-[11px] sm:text-xs text-[#52372e] dark:text-[#c7d5c5] mt-1 leading-snug line-clamp-2">
                              {slide.subtitle}
                            </p>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCategory(slide.category);
                                setActiveTab('explorar');
                              }}
                              className="mt-3 bg-[#1e702e] hover:bg-[#165723] text-white text-xs font-black px-3.5 py-2 rounded-xl shadow-sm transition inline-flex items-center gap-1.5 cursor-pointer"
                            >
                              <span>{slide.btnText}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Foto de Producto en la diapositiva */}
                          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-[#ebe4d5] dark:border-[#223020] bg-white/50 mr-2">
                            <img 
                              src={slide.image} 
                              alt={slide.title}
                              className="w-full h-full object-cover pointer-events-none" 
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Botones de navegación flechas con z-index alto */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/90 dark:bg-black/75 text-[#1e702e] dark:text-white shadow-md hover:scale-110 active:scale-95 transition cursor-pointer"
                    title="Diapositiva anterior"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/90 dark:bg-black/75 text-[#1e702e] dark:text-white shadow-md hover:scale-110 active:scale-95 transition cursor-pointer"
                    title="Diapositiva siguiente"
                    aria-label="Siguiente"
                  >
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

                {/* Puntos Indicadores */}
                <div className="flex justify-center items-center gap-1.5 mt-2.5">
                  {PROMO_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        currentSlide === idx 
                          ? 'w-6 bg-[#1e702e] dark:bg-[#48b359]' 
                          : 'w-2 bg-[#dcd4c0] dark:bg-[#283827] hover:bg-[#b8ac95]'
                      }`}
                      aria-label={`Ir a diapositiva ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Horizontal Category Chips */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <h3 className="font-bold text-sm tracking-tight text-[#23150e] dark:text-slate-100 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-500" />
                    Categorías Populares
                  </h3>
                  <button 
                    onClick={() => setActiveTab('explorar')}
                    className="text-xs font-bold text-[#1e702e] dark:text-[#48b359] hover:underline cursor-pointer"
                  >
                    Ver todas
                  </button>
                </div>
                
                <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-none">
                  {[
                    { id: 'todos', label: 'Todo', icon: Sparkles },
                    { id: 'promos', label: 'Promos & Combos', icon: Gift },
                    { id: 'mantequillas', label: 'Mantequillas', icon: Package },
                    { id: 'frutos', label: 'Frutos Secos', icon: Award },
                    { id: 'deshidratadas', label: 'Deshidratadas', icon: ShieldCheck },
                    { id: 'boxes', label: 'Fit Boxes', icon: Heart }
                  ].map(cat => {
                    const Icon = cat.icon;
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setActiveTab('explorar');
                        }}
                        className={`flex flex-col items-center justify-center min-w-[74px] p-2.5 rounded-2xl border transition-all shrink-0 cursor-pointer ${
                          isSelected 
                            ? 'bg-[#1e702e] text-white border-[#1e702e] shadow-md shadow-[#1e702e]/30 font-black' 
                            : 'bg-white dark:bg-[#1a2319] text-[#23150e] dark:text-[#d3ddd0] border-[#ede5d4] dark:border-[#2a3828] hover:border-[#1e702e]'
                        }`}
                      >
                        <Icon className={`w-5 h-5 mb-1 ${isSelected ? 'text-white' : 'text-[#1e702e] dark:text-[#48b359]'}`} />
                        <span className="text-[11px] font-bold text-center leading-tight whitespace-nowrap">
                          {cat.label.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Official Promos & Combos Section */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <div>
                    <h3 className="font-bold text-sm tracking-tight text-[#23150e] dark:text-slate-100 flex items-center gap-1.5">
                      <Gift className="w-4 h-4 text-[#1e702e] dark:text-[#48b359]" />
                      Combos y Promociones Oficiales
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Ahorra más combinando tus mantequillas favoritas
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {PRODUCTS.filter(p => p.category === 'promos').map(product => {
                    const isFav = favorites.includes(product.id);
                    const qtyInCart = getProductCartQuantity(product.id);
                    return (
                      <div 
                        key={product.id}
                        onClick={() => {
                          setSelectedProduct(product);
                          setSelectedVariantIndex(0);
                          setProductQuantity(1);
                        }}
                        className="bg-white dark:bg-[#1a2319] rounded-2xl p-3 border border-[#ede5d4] dark:border-[#2a3828] shadow-xs hover:shadow-md transition flex gap-3 relative group cursor-pointer"
                      >
                        <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-[#f7f3e8] dark:bg-slate-900">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(product.id);
                            }}
                            className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs text-rose-500 hover:scale-110 transition"
                          >
                            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500' : ''}`} />
                          </button>
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-1 text-[10px] text-[#1e702e] dark:text-[#48b359] font-bold uppercase tracking-wider">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span>{product.rating} ({product.reviewsCount} reseñas)</span>
                            </div>
                            <h4 className="font-bold text-sm text-[#23150e] dark:text-slate-100 mt-0.5 line-clamp-1">
                              {product.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                              {product.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <div>
                              <span className="text-[10px] text-slate-400 block leading-none">Desde</span>
                              <span className="text-sm font-black text-[#1e702e] dark:text-[#48b359]">
                                S/ {product.variants[0].price}.00
                              </span>
                            </div>

                            {/* Multi-product quick add or quantity selector */}
                            {qtyInCart === 0 ? (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleIncrementProduct(product);
                                }}
                                className="bg-[#1e702e] hover:bg-[#165723] text-white text-xs font-bold px-3 py-1.5 rounded-xl transition shadow-xs flex items-center gap-1 cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Agregar</span>
                              </button>
                            ) : (
                              <div 
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1.5 bg-[#eaf4ea] dark:bg-[#17331b] border border-[#1e702e] text-[#1e702e] dark:text-[#48b359] rounded-xl px-2 py-1 font-bold text-xs shadow-xs"
                              >
                                <button 
                                  onClick={() => handleDecrementProduct(product)}
                                  className="p-0.5 hover:bg-[#1e702e]/20 rounded-md transition text-[#1e702e] dark:text-[#48b359] cursor-pointer"
                                  title="Restar 1"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-4 text-center font-black text-xs">{qtyInCart}</span>
                                <button 
                                  onClick={() => handleIncrementProduct(product)}
                                  className="p-0.5 hover:bg-[#1e702e]/20 rounded-md transition text-[#1e702e] dark:text-[#48b359] cursor-pointer"
                                  title="Sumar 1"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Best Sellers Mantequillas Grid */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <h3 className="font-bold text-sm tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-500" />
                    Mantequillas Artesanales
                  </h3>
                  <button 
                    onClick={() => {
                      setSelectedCategory('mantequillas');
                      setActiveTab('explorar');
                    }}
                    className="text-xs font-bold text-[#1e702e] dark:text-[#48b359] hover:underline cursor-pointer"
                  >
                    Ver todas
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {PRODUCTS.filter(p => p.category === 'mantequillas').slice(0, 4).map(product => {
                    const isFav = favorites.includes(product.id);
                    const qtyInCart = getProductCartQuantity(product.id);
                    return (
                      <div 
                        key={product.id}
                        onClick={() => {
                          setSelectedProduct(product);
                          setSelectedVariantIndex(0);
                          setProductQuantity(1);
                        }}
                        className="bg-white dark:bg-[#1a2319] rounded-2xl p-2.5 border border-[#ede5d4] dark:border-[#2a3828] shadow-xs hover:shadow-md transition flex flex-col justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="relative w-full h-32 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 mb-2">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(product.id);
                              }}
                              className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs text-rose-500 hover:scale-110 transition"
                            >
                              <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500' : ''}`} />
                            </button>
                            <span className="absolute bottom-1.5 left-1.5 bg-slate-950/70 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                              ⭐ {product.rating}
                            </span>
                          </div>

                          <h4 className="font-bold text-xs text-[#23150e] dark:text-slate-100 line-clamp-1">
                            {product.name}
                          </h4>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                            {product.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                          <div>
                            <span className="text-[9px] text-slate-400 block leading-none">Desde</span>
                            <span className="text-xs font-black text-[#1e702e] dark:text-[#48b359]">
                              S/ {product.variants[0].price}.00
                            </span>
                          </div>

                          {/* Multi-product quick add or counter on 2-col card */}
                          {qtyInCart === 0 ? (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleIncrementProduct(product);
                              }}
                              className="bg-[#1e702e] hover:bg-[#165723] text-white p-1.5 rounded-xl transition shadow-xs cursor-pointer"
                              title="Agregar al pedido"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          ) : (
                            <div 
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1 bg-[#eaf4ea] dark:bg-[#17331b] border border-[#1e702e] text-[#1e702e] dark:text-[#48b359] rounded-xl px-1.5 py-0.5 font-bold text-xs"
                            >
                              <button 
                                onClick={() => handleDecrementProduct(product)}
                                className="p-0.5 hover:bg-[#1e702e]/20 rounded transition text-[#1e702e] dark:text-[#48b359] cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-3.5 text-center font-black text-[11px]">{qtyInCart}</span>
                              <button 
                                onClick={() => handleIncrementProduct(product)}
                                className="p-0.5 hover:bg-[#1e702e]/20 rounded transition text-[#1e702e] dark:text-[#48b359] cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Fit Boxes Destacados */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <h3 className="font-bold text-sm tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                    <HeartHandshake className="w-4 h-4 text-rose-500" />
                    Fit Boxes Personalizados
                  </h3>
                  <button 
                    onClick={() => {
                      setSelectedCategory('boxes');
                      setActiveTab('explorar');
                    }}
                    className="text-xs font-bold text-[#1e702e] dark:text-[#48b359] hover:underline"
                  >
                    Ver detalles
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {PRODUCTS.filter(p => p.category === 'boxes').slice(0, 2).map(box => (
                    <div 
                      key={box.id}
                      onClick={() => {
                        setSelectedProduct(box);
                        setSelectedVariantIndex(0);
                        setProductQuantity(1);
                      }}
                      className="bg-gradient-to-r from-rose-50 to-amber-50 dark:from-slate-800 dark:to-slate-800/80 p-3 rounded-2xl border border-rose-200/60 dark:border-slate-700 flex gap-3 cursor-pointer"
                    >
                      <img src={box.image} alt={box.name} className="w-20 h-20 rounded-xl object-cover shrink-0 shadow-sm" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 line-clamp-1">{box.name}</h4>
                          <p className="text-[10px] text-slate-600 dark:text-slate-400 line-clamp-2 mt-0.5">{box.description}</p>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs font-black text-rose-600 dark:text-rose-400">S/ {box.variants[0].price}.00</span>
                          <span className="text-[10px] text-[#1e702e] dark:text-[#48b359] font-bold">Personalizado con dedicatoria</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: EXPLORAR (CATÁLOGO COMPLETO) */}
          {activeTab === 'explorar' && (
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-base text-slate-800 dark:text-slate-100">
                    Catálogo Pekas Fit
                  </h3>
                  <p className="text-xs text-slate-500">Mantequillas, frutos secos y frutas deshidratadas</p>
                </div>
                <span className="text-xs font-bold text-[#1e702e] bg-[#eef5e9] dark:bg-[#152817] dark:text-[#48b359] px-2.5 py-1 rounded-full">
                  {filteredProducts.length} items
                </span>
              </div>

              {/* Category Filter Pills */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'todos', label: 'Todos' },
                  { id: 'promos', label: 'Promos & Combos' },
                  { id: 'mantequillas', label: 'Mantequillas' },
                  { id: 'frutos', label: 'Frutos Secos & Mix' },
                  { id: 'deshidratadas', label: 'Deshidratadas' },
                  { id: 'boxes', label: 'Fit Boxes' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#1e702e] text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-[#1a2319] text-[#23150e] dark:text-[#d3ddd0] hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Product List */}
              <div className="grid grid-cols-1 gap-3">
                {filteredProducts.map(product => {
                  const isFav = favorites.includes(product.id);
                  const qtyInCart = getProductCartQuantity(product.id);
                  return (
                    <div 
                      key={product.id}
                      onClick={() => {
                        setSelectedProduct(product);
                        setSelectedVariantIndex(0);
                        setProductQuantity(1);
                      }}
                      className="bg-white dark:bg-[#1a2319] rounded-2xl p-3 border border-[#ede5d4] dark:border-[#2a3828] shadow-xs hover:shadow-md transition flex gap-3 cursor-pointer group"
                    >
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-[#f7f3e8] dark:bg-slate-900">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(product.id);
                          }}
                          className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs text-rose-500 hover:scale-110 transition"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500' : ''}`} />
                        </button>
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1 text-[10px] text-[#1e702e] dark:text-[#48b359] font-bold uppercase tracking-wider">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>{product.rating}</span>
                          </div>
                          <h4 className="font-bold text-sm text-[#23150e] dark:text-slate-100 mt-0.5 line-clamp-1">
                            {product.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                            {product.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <span className="text-[10px] text-slate-400 block leading-none">Desde</span>
                            <span className="text-sm font-black text-[#1e702e] dark:text-[#48b359]">
                              S/ {product.variants[0].price}.00
                            </span>
                          </div>

                          {/* Multi-product quick add or quantity selector */}
                          {qtyInCart === 0 ? (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleIncrementProduct(product);
                              }}
                              className="bg-[#1e702e] hover:bg-[#165723] text-white text-xs font-bold px-3 py-1.5 rounded-xl transition shadow-xs flex items-center gap-1 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Agregar</span>
                            </button>
                          ) : (
                            <div 
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1.5 bg-[#eaf4ea] dark:bg-[#17331b] border border-[#1e702e] text-[#1e702e] dark:text-[#48b359] rounded-xl px-2 py-1 font-bold text-xs shadow-xs"
                            >
                              <button 
                                onClick={() => handleDecrementProduct(product)}
                                className="p-0.5 hover:bg-[#1e702e]/20 rounded-md transition text-[#1e702e] dark:text-[#48b359] cursor-pointer"
                                title="Restar 1"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-4 text-center font-black text-xs">{qtyInCart}</span>
                              <button 
                                onClick={() => handleIncrementProduct(product)}
                                className="p-0.5 hover:bg-[#1e702e]/20 rounded-md transition text-[#1e702e] dark:text-[#48b359] cursor-pointer"
                                title="Sumar 1"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {filteredProducts.length === 0 && (
                  <div className="py-16 text-center">
                    <Package className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm">No encontramos resultados</h4>
                    <p className="text-xs text-slate-500 mt-1">Prueba con otra palabra como maní, almendras o box.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PEDIDOS (Historial con datos de entrega, Yape/BCP y WhatsApp) */}
          {activeTab === 'pedidos' && (
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-base text-slate-800 dark:text-slate-100">
                    Mis Pedidos
                  </h3>
                  <p className="text-xs text-slate-500">Historial y comprobantes de compras en Pekas Fit</p>
                </div>
                <span className="text-xs font-bold bg-[#eaf4ea] dark:bg-[#17331b] text-[#1e702e] dark:text-[#48b359] px-2.5 py-1 rounded-full">
                  {ordersHistory.length} {ordersHistory.length === 1 ? 'pedido' : 'pedidos'}
                </span>
              </div>

              {ordersHistory.length === 0 ? (
                <div className="py-16 text-center bg-white dark:bg-[#1a2319] rounded-2xl border border-[#ede5d4] dark:border-[#2a3828] p-6">
                  <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Aún no tienes pedidos registrados</h4>
                  <p className="text-xs text-slate-500 mt-1 mb-4">Elige tus mantequillas y frutos secos para armar tu primer pedido.</p>
                  <button
                    onClick={() => setActiveTab('inicio')}
                    className="bg-[#1e702e] hover:bg-[#165723] text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
                  >
                    Ver Catálogo
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {ordersHistory.map(order => (
                    <div 
                      key={order.id} 
                      className="bg-white dark:bg-[#1a2319] rounded-2xl p-4 border border-[#ede5d4] dark:border-[#2a3828] shadow-xs space-y-3"
                    >
                      {/* Order Header */}
                      <div className="flex justify-between items-center pb-2.5 border-b border-slate-100 dark:border-slate-800">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-sm text-[#23150e] dark:text-slate-100">
                              Pedido #{order.id}
                            </span>
                            <span className="bg-[#eaf4ea] dark:bg-[#18311c] text-[#1e702e] dark:text-[#48b359] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#1e702e]/30">
                              📲 Enviado por WhatsApp
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 block mt-0.5">{order.date}</span>
                        </div>
                        <span className="text-base font-black text-[#1e702e] dark:text-[#48b359]">
                          S/ {order.total.toFixed(2)}
                        </span>
                      </div>

                      {/* Items Ordered List */}
                      <div className="space-y-1.5 bg-[#faf8f5] dark:bg-[#121812] p-2.5 rounded-xl border border-[#ede5d4] dark:border-[#233121] text-xs">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Productos Solicitados ({order.items.reduce((s, i) => s + i.quantity, 0)} unid.):
                        </span>
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                            <span className="font-medium">
                              <strong className="text-[#1e702e] dark:text-[#48b359]">{item.quantity}x</strong> {item.product.name} <span className="text-[10px] text-slate-400">({item.selectedVariant.size})</span>
                            </span>
                            <span className="font-bold text-slate-900 dark:text-slate-100">
                              S/ {(item.selectedVariant.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Delivery & Payment Info */}
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl">
                          <span className="text-[10px] font-bold text-slate-400 block">ENTREGA</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200 block truncate">{order.customer.address}</span>
                          <span className="text-slate-500 block truncate">{order.customer.district}</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl">
                          <span className="text-[10px] font-bold text-slate-400 block">PAGO ELEGIDO</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200 block uppercase">
                            {order.paymentMethod === 'yape' ? '📱 Yape (970 380 415)' : '🏛️ BCP (193-98234120)'}
                          </span>
                          <span className="text-emerald-600 font-bold block text-[10px]">Por confirmar voucher</span>
                        </div>
                      </div>

                      {/* Actions Buttons */}
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => setSelectedOrderForPayment(order)}
                          className="flex-1 bg-[#faf8f5] dark:bg-[#1a2319] hover:bg-[#eef5e9] dark:hover:bg-[#203623] border border-[#1e702e] text-[#1e702e] dark:text-[#48b359] text-xs font-bold py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Ver Datos Yape/BCP</span>
                        </button>
                        <button
                          onClick={() => handleResendWhatsAppOrder(order)}
                          className="flex-1 bg-[#25D366] hover:bg-[#1ea952] text-white text-xs font-bold py-2 px-3 rounded-xl transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Reenviar a WhatsApp (+51 970 380 415)</span>
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: FAVORITOS */}
          {activeTab === 'favoritos' && (
            <div className="p-4 space-y-4">
              <h3 className="font-black text-base text-slate-800 dark:text-slate-100">
                Mis Favoritos ({favorites.length})
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {PRODUCTS.filter(p => favorites.includes(p.id)).map(product => (
                  <div 
                    key={product.id}
                    onClick={() => {
                      setSelectedProduct(product);
                      setSelectedVariantIndex(0);
                      setProductQuantity(1);
                    }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 shadow-xs flex gap-3 cursor-pointer group"
                  >
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-900">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(product.id);
                        }}
                        className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 text-rose-500"
                      >
                        <Heart className="w-3.5 h-3.5 fill-rose-500" />
                      </button>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 line-clamp-1">{product.name}</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">{product.description}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-black text-emerald-700 dark:text-emerald-400">S/ {product.variants[0].price}.00</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(product);
                            setSelectedVariantIndex(0);
                            setProductQuantity(1);
                          }}
                          className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs"
                        >
                          Ver Opciones
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {favorites.length === 0 && (
                  <div className="py-20 text-center">
                    <Heart className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm">No tienes favoritos aún</h4>
                    <p className="text-xs text-slate-500 mt-1">Presiona el corazón en cualquier producto para guardarlo aquí.</p>
                  </div>
                )}
              </div>
            </div>
          )}

        </main>

        {/* NATIVE FLOATING CART BAR (Instant multi-product order trigger) */}
        {totalCartItems > 0 && !isCartOpen && !showCheckoutModal && (
          <aside className="fixed bottom-14 left-0 right-0 z-35 px-4 pb-2 max-w-lg md:max-w-xl mx-auto pointer-events-none">
            <button
              onClick={() => setIsCartOpen(true)}
              className="pointer-events-auto w-full bg-[#1e702e] hover:bg-[#165723] text-white py-3 px-4 rounded-2xl shadow-xl flex items-center justify-between transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border border-[#309743]/30 animate-in fade-in slide-in-from-bottom-2 duration-200"
            >
              <div className="flex items-center gap-2.5">
                <div className="relative bg-white/20 p-2 rounded-xl">
                  <ShoppingBag className="w-5 h-5 text-white" />
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-slate-950 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                    {totalCartItems}
                  </span>
                </div>
                <div className="text-left">
                  <span className="text-xs font-black block leading-tight">
                    {totalCartItems} {totalCartItems === 1 ? 'producto seleccionado' : 'productos seleccionados'}
                  </span>
                  <span className="text-[11px] text-[#c9eccd] leading-tight block">
                    Toca para revisar y confirmar pedido
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 font-black text-sm bg-black/15 px-3 py-1.5 rounded-xl">
                <span>S/ {total.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </aside>
        )}

        {/* NATIVE FLOATING WHATSAPP BUTTON (+51 970 380 415) */}
        {!isCartOpen && totalCartItems === 0 && !showCheckoutModal && (
          <aside className="fixed bottom-18 right-4 z-35">
            <a
              href="https://api.whatsapp.com/send?phone=51970380415&text=Hola%20Pekas%20Fit,%20quisiera%20hacer%20un%20pedido%20o%20consultar%20su%20catálogo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white py-2.5 px-3.5 rounded-full shadow-2xl shadow-[#25D366]/40 transition-all border-2 border-white/80 dark:border-[#142617] cursor-pointer"
              title="Chat oficial por WhatsApp: +51 970 380 415"
              aria-label="Contactar a WhatsApp +51 970 380 415"
            >
              <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
              <div className="flex flex-col text-left leading-none">
                <span className="text-[10px] font-bold text-[#e4faea]">WhatsApp</span>
                <span className="text-xs font-black tracking-tight">+51 970 380 415</span>
              </div>
            </a>
          </aside>
        )}

        {/* NATIVE BOTTOM NAVIGATION BAR (Fixed at bottom with safe area support) */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#121812]/95 backdrop-blur-md border-t border-[#ede5d4] dark:border-[#1d261c] shadow-lg">
          <div className="max-w-lg md:max-w-xl mx-auto flex justify-around items-center py-2 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
            {[
              { id: 'inicio', label: 'Inicio', icon: Home },
              { id: 'explorar', label: 'Explorar', icon: Compass },
              { id: 'pedidos', label: 'Pedidos', icon: Package },
              { id: 'favoritos', label: 'Favoritos', icon: Heart }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex flex-col items-center py-1 px-3 rounded-xl transition cursor-pointer ${
                    isActive ? 'text-[#1e702e] dark:text-[#48b359] font-black' : 'text-slate-400 hover:text-[#23150e] dark:hover:text-slate-200 font-medium'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
                  <span className="text-[10px]">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </>
    )}

    {/* ================= NATIVE MOBILE BOTTOM-SHEET MODALS ================= */}

        {/* 1. PRODUCT DETAIL BOTTOM SHEET */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-lg sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col animate-in slide-in-from-bottom duration-300">
              
              {/* Drag Handle Indicator */}
              <div className="w-10 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto my-2.5 sm:hidden shrink-0"></div>

              {/* Header image & close */}
              <div className="relative h-56 bg-slate-100 dark:bg-slate-800 shrink-0">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-xs transition"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 left-3 bg-[#1e702e]/90 backdrop-blur-xs text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{selectedProduct.rating} ({selectedProduct.reviewsCount} reseñas)</span>
                </div>
              </div>

              {/* Scrollable details */}
              <div className="p-5 overflow-y-auto space-y-4 flex-1">
                <div>
                  <h3 className="font-black text-xl text-slate-900 dark:text-slate-100">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Natural Ingredients & Benefits */}
                <div className="bg-[#f0f6ee] dark:bg-[#152317] p-3 rounded-2xl border border-[#d2e2cf] dark:border-[#1d3520] space-y-2">
                  <div className="text-xs font-bold text-[#1e702e] dark:text-[#48b359] flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-[#1e702e] dark:text-[#48b359]" />
                    <span>Ingredientes 100% Naturales:</span>
                  </div>
                  <p className="text-xs text-[#23150e] dark:text-[#d3ddd0] italic">
                    {selectedProduct.ingredients}
                  </p>
                  <div className="pt-2 border-t border-[#d2e2cf] dark:border-[#1d3520] space-y-1">
                    {selectedProduct.benefits.map((ben, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-[#1e702e] dark:text-[#48b359] shrink-0" />
                        <span>{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Variant / Size Selector */}
                <div>
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Elige presentación o tamaño:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProduct.variants.map((variant, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedVariantIndex(idx)}
                        className={`p-3 rounded-xl border text-left transition flex justify-between items-center ${
                          selectedVariantIndex === idx
                            ? 'border-[#1e702e] bg-[#f0f6ee] dark:bg-[#152317] text-[#1e702e] dark:text-[#48b359] font-black shadow-xs'
                            : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#1e702e]'
                        }`}
                      >
                        <span className="text-xs">{variant.size}</span>
                        <span className="text-xs font-black text-[#1e702e] dark:text-[#48b359]">S/ {variant.price}.00</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Cantidad:</span>
                  <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
                    <button 
                      onClick={() => setProductQuantity(Math.max(1, productQuantity - 1))}
                      className="text-slate-600 dark:text-slate-300 hover:text-[#1e702e] font-bold p-1 cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-black text-sm text-slate-900 dark:text-slate-100 w-6 text-center">{productQuantity}</span>
                    <button 
                      onClick={() => setProductQuantity(productQuantity + 1)}
                      className="text-slate-600 dark:text-slate-300 hover:text-[#1e702e] font-bold p-1 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Add Action */}
              <div className="p-4 bg-white dark:bg-[#152317] border-t border-[#ede5d4] dark:border-[#2b3a29] flex items-center gap-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <div>
                  <span className="text-[10px] text-slate-400 block leading-none">Total</span>
                  <span className="text-lg font-black text-[#1e702e] dark:text-[#48b359]">
                    S/ {selectedProduct.variants[selectedVariantIndex].price * productQuantity}.00
                  </span>
                </div>
                <button
                  onClick={() => {
                    addToCart(selectedProduct, selectedProduct.variants[selectedVariantIndex], productQuantity);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 bg-[#1e702e] hover:bg-[#165723] text-white font-black py-3.5 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Agregar al Carrito</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* 2. SLIDING SHOPPING CART DRAWER */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex justify-end">
            <div className="bg-white dark:bg-[#121812] w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
              
              {/* Header */}
              <div className="bg-[#1e702e] dark:bg-[#102d16] text-white p-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-300" />
                  <div>
                    <h3 className="font-black text-base">Tu Carrito Pekas Fit</h3>
                    <p className="text-[10px] text-[#c9eccd] dark:text-[#9fcfa4]">Productos frescos de taller</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/20 transition text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="p-4 flex-1 overflow-y-auto space-y-3">
                {cart.length > 0 ? (
                  cart.map((item, index) => (
                    <div key={index} className="bg-white dark:bg-[#1a2319] p-3 rounded-2xl border border-[#ede5d4] dark:border-[#2b3a29] flex justify-between items-center gap-3 shadow-xs">
                      <img src={item.product.image} alt={item.product.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-[#23150e] dark:text-slate-100 truncate">{item.product.name}</h4>
                        <span className="text-[11px] text-[#1e702e] dark:text-[#48b359] font-bold">{item.selectedVariant.size}</span>
                        <div className="text-xs font-black text-[#23150e] dark:text-slate-100 mt-0.5">
                          S/ {item.selectedVariant.price * item.quantity}.00
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-[#faf8f5] dark:bg-[#121812] px-2 py-1 rounded-xl border border-[#ede5d4] dark:border-[#2b3a29]">
                        <button onClick={() => updateCartQty(index, -1)} className="text-slate-500 hover:text-[#1e702e] p-1 cursor-pointer">
                          {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5 text-rose-500" /> : <Minus className="w-3.5 h-3.5" />}
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateCartQty(index, 1)} className="text-slate-500 hover:text-[#1e702e] p-1 cursor-pointer">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center">
                    <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-3" />
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm">Tu carrito está vacío</h4>
                    <p className="text-xs text-slate-500 mt-1">Elige tus mantequillas o frutos secos favoritos.</p>
                  </div>
                )}

                {cart.length > 0 && (
                  <>
                    {/* Delivery summary */}
                    <div className="bg-[#f0f6ee] dark:bg-[#1a2319] p-3 rounded-2xl border border-[#d2e2cf] dark:border-[#2a3a27] text-xs flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-[#1e702e] dark:text-[#48b359] font-bold uppercase tracking-wider block">Dirección de entrega</span>
                        <span className="font-bold text-[#23150e] dark:text-slate-200">{currentAddress.address}</span>
                      </div>
                      <button onClick={() => setShowAddressModal(true)} className="text-[#1e702e] dark:text-[#48b359] font-bold hover:underline cursor-pointer">
                        Cambiar
                      </button>
                    </div>

                    {/* Tip selector */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[#23150e] dark:text-slate-300 uppercase tracking-wider">
                        Propina para el repartidor:
                      </span>
                      <div className="grid grid-cols-4 gap-2">
                        {[0, 2, 3, 5].map(amt => (
                          <button
                            key={amt}
                            onClick={() => setTipAmount(amt)}
                            className={`py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                              tipAmount === amt 
                                ? 'bg-[#1e702e] text-white border-[#1e702e]' 
                                : 'bg-[#faf8f5] dark:bg-[#1a2319] text-[#23150e] dark:text-slate-300 border-[#ede5d4] dark:border-[#2b3a29]'
                            }`}
                          >
                            {amt === 0 ? 'Sin propina' : `S/ ${amt}`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Discount Coupon */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[#23150e] dark:text-slate-300 uppercase tracking-wider">
                        Cupón de Descuento:
                      </span>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                          <input 
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Ej. PEKAS10"
                            className="w-full pl-9 pr-3 py-2 bg-[#faf8f5] dark:bg-[#1a2319] text-xs rounded-xl border border-[#ede5d4] dark:border-[#2b3a29] focus:outline-none focus:ring-2 focus:ring-[#1e702e] uppercase font-black"
                          />
                        </div>
                        <button 
                          onClick={applyCoupon}
                          className="bg-[#23150e] dark:bg-[#1f2e1f] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#3d2519] transition cursor-pointer"
                        >
                          Aplicar
                        </button>
                      </div>
                      {couponApplied && (
                        <p className="text-[11px] text-[#1e702e] dark:text-[#48b359] font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> ¡Cupón aplicado exitosamente (-{discountPercent}%)!
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Checkout Footer */}
              {cart.length > 0 && (
                <div className="p-4 bg-white dark:bg-[#121812] border-t border-[#ede5d4] dark:border-[#2b3a29] space-y-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Subtotal</span>
                      <span>S/ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Envío ({subtotal > 80 ? 'Gratis' : 'Estándar'})</span>
                      <span>{deliveryFee === 0 ? '¡Gratis!' : `S/ ${deliveryFee}.00`}</span>
                    </div>
                    {tipAmount > 0 && (
                      <div className="flex justify-between text-slate-500">
                        <span>Propina repartidor</span>
                        <span>S/ {tipAmount}.00</span>
                      </div>
                    )}
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-[#1e702e] dark:text-[#48b359] font-bold">
                        <span>Descuento cupón</span>
                        <span>- S/ {discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-black text-[#23150e] dark:text-slate-100 pt-2 border-t border-[#ede5d4] dark:border-[#2b3a29]">
                      <span>Total a Pagar</span>
                      <span className="text-[#1e702e] dark:text-[#48b359] text-base">S/ {total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Proceed to Delivery & Payment Data */}
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setShowCheckoutModal(true);
                    }}
                    className="w-full bg-[#1e702e] hover:bg-[#165723] text-white font-black py-3.5 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    <span>Continuar con Datos de Envío y Pago</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

        {/* 3. MODAL DE DATOS DE ENVÍO Y MÉTODOS DE PAGO (YAPE / BCP) CON REDIRECCIÓN A WHATSAPP */}
        {showCheckoutModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-white dark:bg-[#121812] w-full max-w-lg sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh] animate-in slide-in-from-bottom duration-300">
              
              {/* Mobile Drag Indicator */}
              <div className="w-10 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto my-2 sm:hidden shrink-0"></div>

              {/* Modal Header */}
              <div className="bg-[#1e702e] dark:bg-[#102d16] text-white p-4 flex justify-between items-center shadow-sm shrink-0">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white/20">
                    <Smartphone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm">Datos de Envío y Pago</h3>
                    <p className="text-[10px] text-[#c9eccd] dark:text-[#9fcfa4]">Pekas Fit • Pago Yape/BCP y confirmación WhatsApp</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowCheckoutModal(false)}
                  className="p-1.5 rounded-full hover:bg-white/20 text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Content */}
              <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                
                {/* A. Resumen rápido de productos seleccionados */}
                <div className="bg-[#faf8f5] dark:bg-[#192419] p-3 rounded-2xl border border-[#ede5d4] dark:border-[#273827]">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[11px] font-black uppercase text-[#1e702e] dark:text-[#48b359] flex items-center gap-1">
                      <ShoppingBag className="w-3.5 h-3.5" /> Tu Pedido ({totalCartItems} productos):
                    </span>
                    <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                      Total: S/ {total.toFixed(2)}
                    </span>
                  </div>
                  <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 max-h-28 overflow-y-auto pr-1">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-[11px]">
                        <span>
                          <strong className="text-[#1e702e] dark:text-[#48b359]">{item.quantity}x</strong> {item.product.name} ({item.selectedVariant.size})
                        </span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          S/ {(item.selectedVariant.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* B. Formulario de Datos de Envío */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#1e702e] dark:text-[#48b359]" />
                    1. Datos de Envío
                  </h4>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Nombre Completo *</label>
                      <input 
                        type="text" 
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Ej. Luis García"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#1a2319] border border-[#ede5d4] dark:border-[#2a3828] focus:ring-2 focus:ring-[#1e702e] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">WhatsApp / Celular *</label>
                      <input 
                        type="tel" 
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="Ej. 970380415"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#1a2319] border border-[#ede5d4] dark:border-[#2a3828] focus:ring-2 focus:ring-[#1e702e] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Dirección Exacta (Calle, N°, Dpto) *</label>
                      <input 
                        type="text" 
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        placeholder="Ej. Av. Larco 456, Dpto 302"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#1a2319] border border-[#ede5d4] dark:border-[#2a3828] focus:ring-2 focus:ring-[#1e702e] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Distrito (Lima) *</label>
                        <select
                          value={customerDistrict}
                          onChange={(e) => setCustomerDistrict(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#1a2319] border border-[#ede5d4] dark:border-[#2a3828] focus:ring-2 focus:ring-[#1e702e] focus:outline-none font-bold"
                        >
                          {LIMA_DISTRICTS.map(dist => (
                            <option key={dist} value={dist}>{dist}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Referencia (Opcional)</label>
                        <input 
                          type="text" 
                          value={customerReference}
                          onChange={(e) => setCustomerReference(e.target.value)}
                          placeholder="Ej. Frente al parque"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#1a2319] border border-[#ede5d4] dark:border-[#2a3828] focus:ring-2 focus:ring-[#1e702e] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Notas o Dedicatoria para el Taller</label>
                      <input 
                        type="text" 
                        value={customerNotes}
                        onChange={(e) => setCustomerNotes(e.target.value)}
                        placeholder="Ej. Dejar en recepción / Escribir dedicatoria para cumpleaños"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#1a2319] border border-[#ede5d4] dark:border-[#2a3828] focus:ring-2 focus:ring-[#1e702e] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* C. Métodos de Pago: Yape y BCP */}
                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-[#1e702e] dark:text-[#48b359]" />
                      2. Elige tu Método de Pago
                    </h4>
                    <span className="text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-black px-2 py-0.5 rounded-full">
                      Paga y envía constancia
                    </span>
                  </div>

                  {/* Selector Tabs Yape / BCP */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('yape')}
                      className={`p-3 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer ${
                        paymentMethod === 'yape'
                          ? 'bg-[#742284]/10 dark:bg-[#742284]/20 border-[#742284] text-[#742284] dark:text-[#d377e8] shadow-sm font-black'
                          : 'bg-white dark:bg-[#1a2319] border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#742284] text-white flex items-center justify-center font-black text-xs">
                          Y
                        </div>
                        <div>
                          <span className="text-xs font-black block">Yape</span>
                          <span className="text-[10px] text-slate-400 block">Transferencia instantánea</span>
                        </div>
                      </div>
                      {paymentMethod === 'yape' && <CheckCircle2 className="w-4 h-4 text-[#742284] dark:text-[#d377e8]" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bcp')}
                      className={`p-3 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer ${
                        paymentMethod === 'bcp'
                          ? 'bg-[#002a61]/10 dark:bg-[#002a61]/30 border-[#002a61] text-[#002a61] dark:text-[#6fa8f7] shadow-sm font-black'
                          : 'bg-white dark:bg-[#1a2319] border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#002a61] text-white flex items-center justify-center font-black text-xs">
                          B
                        </div>
                        <div>
                          <span className="text-xs font-black block">BCP</span>
                          <span className="text-[10px] text-slate-400 block">Cuenta o Interbancario</span>
                        </div>
                      </div>
                      {paymentMethod === 'bcp' && <CheckCircle2 className="w-4 h-4 text-[#002a61] dark:text-[#6fa8f7]" />}
                    </button>
                  </div>

                  {/* Detalle interactivo YAPE */}
                  {paymentMethod === 'yape' && (
                    <div className="p-3.5 bg-gradient-to-br from-[#faf0fc] to-[#f4e2f7] dark:from-[#211124] dark:to-[#2e1533] border-2 border-[#742284] rounded-2xl space-y-2.5 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-[#742284] dark:text-[#d377e8]" />
                          <span className="text-xs font-black text-[#742284] dark:text-[#d377e8]">Datos de Yape Pekas Fit:</span>
                        </div>
                        <span className="text-xs font-black text-slate-900 dark:text-slate-100">
                          Monto a Yapear: <strong className="text-[#742284] dark:text-[#d377e8]">S/ {total.toFixed(2)}</strong>
                        </span>
                      </div>

                      <div className="bg-white dark:bg-black/40 p-2.5 rounded-xl border border-[#742284]/20 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block">NÚMERO DE TELÉFONO YAPE</span>
                          <span className="text-sm font-black tracking-wider text-slate-900 dark:text-white font-mono">
                            970 380 415
                          </span>
                          <span className="text-[10px] text-slate-500 block">Titular: <strong>Pekas Fit SAC</strong></span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('970380415', 'yape_num')}
                          className="bg-[#742284] hover:bg-[#5b1a68] text-white text-xs font-black px-3 py-1.5 rounded-xl transition flex items-center gap-1 shadow-xs cursor-pointer"
                        >
                          {copiedField === 'yape_num' ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>¡Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                        💡 Realiza el pago en tu app de Yape por <strong>S/ {total.toFixed(2)}</strong>. Al pulsar el botón verde abajo, se abrirá WhatsApp con el pedido listo para enviar; solo adjuntas la captura de tu Yape.
                      </p>
                    </div>
                  )}

                  {/* Detalle interactivo BCP */}
                  {paymentMethod === 'bcp' && (
                    <div className="p-3.5 bg-gradient-to-br from-[#eaf2fc] to-[#deebfa] dark:from-[#0d1d33] dark:to-[#122845] border-2 border-[#002a61] rounded-2xl space-y-2.5 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-[#002a61] dark:text-[#6fa8f7]" />
                          <span className="text-xs font-black text-[#002a61] dark:text-[#6fa8f7]">Cuentas Bancarias BCP:</span>
                        </div>
                        <span className="text-xs font-black text-slate-900 dark:text-slate-100">
                          Total: <strong className="text-[#002a61] dark:text-[#6fa8f7]">S/ {total.toFixed(2)}</strong>
                        </span>
                      </div>

                      {/* Cuenta Corriente BCP */}
                      <div className="bg-white dark:bg-black/40 p-2.5 rounded-xl border border-[#002a61]/20 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block">N° CUENTA CORRIENTE BCP (SOLES)</span>
                          <span className="text-xs font-black tracking-wider text-slate-900 dark:text-white font-mono">
                            193-98234120-0-45
                          </span>
                          <span className="text-[10px] text-slate-500 block">Titular: <strong>Pekas Fit SAC</strong></span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('19398234120045', 'bcp_cta')}
                          className="bg-[#002a61] hover:bg-[#001d45] text-white text-xs font-black px-3 py-1.5 rounded-xl transition flex items-center gap-1 shadow-xs cursor-pointer"
                        >
                          {copiedField === 'bcp_cta' ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>¡Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* CCI BCP */}
                      <div className="bg-white dark:bg-black/40 p-2.5 rounded-xl border border-[#002a61]/20 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block">CÓDIGO INTERBANCARIO (CCI)</span>
                          <span className="text-xs font-black tracking-wider text-slate-900 dark:text-white font-mono">
                            00219300982341200045
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('00219300982341200045', 'bcp_cci')}
                          className="bg-[#002a61] hover:bg-[#001d45] text-white text-xs font-black px-3 py-1.5 rounded-xl transition flex items-center gap-1 shadow-xs cursor-pointer"
                        >
                          {copiedField === 'bcp_cci' ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>¡Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                        💡 Realiza la transferencia por <strong>S/ {total.toFixed(2)}</strong> y adjunta la captura o constancia de la transferencia en el chat de WhatsApp.
                      </p>
                    </div>
                  )}
                </div>

              </div>

              {/* Botón Principal WhatsApp Footer */}
              <div className="p-4 bg-white dark:bg-[#121812] border-t border-[#ede5d4] dark:border-[#2b3a29] pb-[max(1rem,env(safe-area-inset-bottom))] space-y-2 shrink-0">
                <button
                  type="button"
                  onClick={handleSendWhatsAppOrder}
                  className="w-full bg-[#25D366] hover:bg-[#1da851] active:scale-[0.98] text-white font-black py-4 px-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2.5 text-sm cursor-pointer border border-[#20ba59]"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                  <span>Enviar a WhatsApp (+51 970 380 415) • S/ {total.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-[10px] text-slate-500 dark:text-slate-400">
                  Se abrirá automáticamente el chat de WhatsApp con el número +51 970 380 415.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* 4. MODAL VER DATOS DE PAGO YAPE/BCP PARA PEDIDOS ANTERIORES */}
        {selectedOrderForPayment && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1a2319] w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 border border-[#ede5d4] dark:border-[#2a3828]">
              
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="font-black text-sm text-slate-900 dark:text-slate-100">
                    Datos de Pago - Pedido #{selectedOrderForPayment.id}
                  </h3>
                  <p className="text-[11px] text-slate-500">Monto total a pagar: S/ {selectedOrderForPayment.total.toFixed(2)}</p>
                </div>
                <button onClick={() => setSelectedOrderForPayment(null)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Yape Info */}
              <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-[#742284] dark:text-purple-300 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5" /> YAPE (970 380 415)
                  </span>
                  <button
                    onClick={() => copyToClipboard('970380415', 'yape_num')}
                    className="bg-[#742284] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    {copiedField === 'yape_num' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedField === 'yape_num' ? '¡Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Titular: Pekas Fit SAC</p>
              </div>

              {/* BCP Info */}
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800 space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs font-black text-[#002a61] dark:text-blue-300 block">BCP Cuenta Corriente</span>
                    <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">193-98234120-0-45</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('19398234120045', 'bcp_cta')}
                    className="bg-[#002a61] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    {copiedField === 'bcp_cta' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedField === 'bcp_cta' ? '¡Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
                <div className="pt-2 border-t border-blue-200 dark:border-blue-800/60 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block">CCI INTERBANCARIO</span>
                    <span className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300">00219300982341200045</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('00219300982341200045', 'bcp_cci')}
                    className="bg-[#002a61] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    {copiedField === 'bcp_cci' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedField === 'bcp_cci' ? '¡Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleResendWhatsAppOrder(selectedOrderForPayment)}
                className="w-full bg-[#25D366] hover:bg-[#1ea952] text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Reenviar comprobante por WhatsApp</span>
              </button>

            </div>
          </div>
        )}

        {/* 5. ADDRESS PICKER MODAL */}
        {showAddressModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-md sm:rounded-3xl rounded-t-3xl p-5 shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-300">
              <div className="w-10 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto my-1 sm:hidden"></div>

              <div className="flex justify-between items-center">
                <h3 className="font-black text-base text-slate-900 dark:text-slate-100">Dirección de Entrega</h3>
                <button onClick={() => setShowAddressModal(false)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="space-y-2">
                {ADDRESSES.map(addr => (
                  <div
                    key={addr.id}
                    onClick={() => {
                      setCurrentAddress(addr);
                      setShowAddressModal(false);
                    }}
                    className={`p-3 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                      currentAddress.id === addr.id
                        ? 'border-[#1e702e] bg-[#f0f6ee] dark:bg-[#152317] text-[#1e702e] dark:text-[#48b359] font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#1e702e]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin className={`w-5 h-5 ${currentAddress.id === addr.id ? 'text-[#1e702e] dark:text-[#48b359]' : 'text-slate-400'}`} />
                      <div>
                        <span className="text-xs font-bold block">{addr.title}</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">{addr.address}</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded-lg text-slate-600 dark:text-slate-300 font-bold">
                      {addr.time}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => {
                  const newTitle = prompt('Nombre de la dirección (ej. Casa, Trabajo):', 'Oficina Nueva');
                  if (newTitle) {
                    const newAddr = prompt('Dirección exacta (Calle, Número, Distrito):', 'Av. Pardo 450, Miraflores');
                    if (newAddr) {
                      const created = { id: Date.now().toString(), title: newTitle, address: newAddr, time: '20-30 min' };
                      ADDRESSES.push(created);
                      setCurrentAddress(created);
                      setShowAddressModal(false);
                    }
                  }
                }}
                className="w-full border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-[#1e702e] text-slate-600 dark:text-slate-300 font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar nueva dirección</span>
              </button>
            </div>
          </div>
        )}

        {/* 6. MODAL DE CONFIRMACIÓN Y REDIRECCIÓN A WHATSAPP (+51 970 380 415) */}
        {orderSuccessModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#152317] w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 border border-[#ede5d4] dark:border-[#214326] animate-in zoom-in-95 duration-200 text-center">
              
              {/* Icon & Title */}
              <div className="w-16 h-16 rounded-full bg-[#e8f8ec] dark:bg-[#1a3821] text-[#25D366] flex items-center justify-center mx-auto shadow-inner">
                <MessageCircle className="w-9 h-9 fill-[#25D366] text-white" />
              </div>

              <div>
                <h3 className="font-black text-xl text-slate-900 dark:text-slate-100">
                  ¡Pedido Listo para Enviar!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Código: <strong className="text-[#1e702e] dark:text-[#4ade80]">{orderSuccessModal.order.id}</strong> · Total: <strong>S/ {orderSuccessModal.order.total.toFixed(2)}</strong>
                </p>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl p-3.5 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 text-left">
                <div className="flex items-center gap-2 text-[#1e702e] dark:text-[#4ade80] font-black">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>WhatsApp Oficial: +51 970 380 415</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                  Tu pedido ha sido registrado. Presiona el botón verde a continuación para abrir el chat de WhatsApp con el detalle de tu compra:
                </p>
              </div>

              {/* Main Direct WhatsApp Link Button */}
              <a
                href={orderSuccessModal.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white font-black text-sm shadow-xl shadow-[#25D366]/30 flex items-center justify-center gap-2.5 transition-all block cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                <span>Abrir Chat de WhatsApp (+51 970 380 415)</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Actions: Copy or Close */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    copyToClipboard('970380415', 'yape_num');
                    showToast('¡Número +51 970 380 415 copiado!');
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Número</span>
                </button>

                <button
                  onClick={() => setOrderSuccessModal(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-800 dark:text-slate-200 text-xs font-black transition cursor-pointer"
                >
                  Ver en Mis Pedidos
                </button>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
