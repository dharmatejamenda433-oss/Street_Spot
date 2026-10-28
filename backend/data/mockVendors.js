// Realistic Initial Seed Data for StreetSpot
export let vendors = [
  {
    id: "vend_01",
    businessName: "Ravi's Pani Puri & Chaat",
    category: "street-food",
    tagline: "Crispy puris with authentic mineral-water spiced mint pani",
    description: "Famous for hygenic sev puri, dahi puri, and Kolkata-style puchka. Operating for 8 years.",
    bannerImage: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    contactPhone: "+919876543210",
    whatsappNumber: "919876543210",
    addressLandmark: "Opposite Metro Gate 2, 100ft Road",
    location: {
      type: "Point",
      coordinates: [77.5948, 12.9719] // [longitude, latitude]
    },
    isOpen: true,
    operatingHours: "4:00 PM - 10:00 PM",
    rating: 4.8,
    reviewCount: 142,
    createdAt: new Date().toISOString()
  },
  {
    id: "vend_02",
    businessName: "Fresh Fruit Cart (Ramesh)",
    category: "fruits-veg",
    tagline: "Farm fresh seasonal fruits & fresh cut fruit bowls",
    description: "Direct farm sourced seasonal mangoes, pomegranates, apples, and customized fruit salad bowls.",
    bannerImage: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80",
    contactPhone: "+919812345678",
    whatsappNumber: "919812345678",
    addressLandmark: "Corner of 5th Cross, Near City Park Entrance",
    location: {
      type: "Point",
      coordinates: [77.5970, 12.9730]
    },
    isOpen: true,
    operatingHours: "8:00 AM - 8:00 PM",
    rating: 4.6,
    reviewCount: 88,
    createdAt: new Date().toISOString()
  },
  {
    id: "vend_03",
    businessName: "Lakshmi Flower Stall",
    category: "flowers",
    tagline: "Fresh jasmine garlands, marigold flowers & daily pooja sets",
    description: "Daily fresh fragrant jasmine strings (gajra), lotus flowers, and pooja flower baskets.",
    bannerImage: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    contactPhone: "+919823456789",
    whatsappNumber: "919823456789",
    addressLandmark: "Temple Road, Next to Ganesha Temple",
    location: {
      type: "Point",
      coordinates: [77.5920, 12.9705]
    },
    isOpen: true,
    operatingHours: "6:00 AM - 1:00 PM, 5:00 PM - 9:00 PM",
    rating: 4.9,
    reviewCount: 110,
    createdAt: new Date().toISOString()
  },
  {
    id: "vend_04",
    businessName: "Anna Chai & Bun Maska",
    category: "tea-juice",
    tagline: "Kadak Irani chai, filter coffee, and fresh bun maska",
    description: "Hot ginger tea, lemon tea, fresh mosambi juice, and maska pav made fresh on order.",
    bannerImage: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
    contactPhone: "+919845678901",
    whatsappNumber: "919845678901",
    addressLandmark: "Behind Commercial Complex, Bus Stand Alley",
    location: {
      type: "Point",
      coordinates: [77.5960, 12.9690]
    },
    isOpen: false,
    operatingHours: "6:30 AM - 9:30 PM",
    rating: 4.5,
    reviewCount: 65,
    createdAt: new Date().toISOString()
  }
];

export let products = [
  {
    id: "prod_01",
    vendorId: "vend_01",
    name: "Classic Spiced Pani Puri (6 Pcs)",
    description: "Crispy puris filled with spicy potato-chickpea masala and chilled mint water.",
    price: 30,
    category: "Chaat",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80",
    isAvailable: true,
    isVegetarian: true
  },
  {
    id: "prod_02",
    vendorId: "vend_01",
    name: "Special Dahi Sev Puri (6 Pcs)",
    description: "Loaded with thick sweetened curd, tamarind chutney, crunchy sev, and pomegranate seeds.",
    price: 50,
    category: "Chaat",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=400&q=80",
    isAvailable: true,
    isVegetarian: true
  },
  {
    id: "prod_03",
    vendorId: "vend_01",
    name: "Sukha Puri (2 Pcs complimentary with 2 plates)",
    description: "Crisp dry puri seasoned with roasted cumin and spicy masala.",
    price: 15,
    category: "Chaat",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=400&q=80",
    isAvailable: true,
    isVegetarian: true
  },
  {
    id: "prod_04",
    vendorId: "vend_02",
    name: "Fresh Mixed Fruit Bowl (300g)",
    description: "Freshly sliced pineapple, papaya, watermelon, and apple sprinkled with chaat masala.",
    price: 50,
    category: "Cut Fruits",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
    isAvailable: true,
    isVegetarian: true
  },
  {
    id: "prod_05",
    vendorId: "vend_02",
    name: "Alphonso Mango Box (1 Kg)",
    description: "Naturally ripened sweet ratnagiri alphonso mangoes.",
    price: 180,
    category: "Seasonal",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80",
    isAvailable: true,
    isVegetarian: true
  },
  {
    id: "prod_06",
    vendorId: "vend_03",
    name: "Madurai Malli Jasmine Garland (1 Metre)",
    description: "Fragrant handwoven fresh white jasmine garland for hair and puja.",
    price: 40,
    category: "Garlands",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80",
    isAvailable: true,
    isVegetarian: true
  },
  {
    id: "prod_07",
    vendorId: "vend_03",
    name: "Daily Pooja Flower Basket",
    description: "Mix of marigold, hibiscus, rose petals, and tulsi leaves.",
    price: 30,
    category: "Pooja",
    image: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=400&q=80",
    isAvailable: true,
    isVegetarian: true
  }
];

export let offers = [
  {
    id: "off_01",
    vendorId: "vend_01",
    title: "⚡ Happy Hour Rush: 10% OFF!",
    description: "Get 10% off on all Chaat items between 4:00 PM and 6:00 PM today!",
    discountPercentage: 10,
    startTime: new Date(Date.now() - 3600000).toISOString(),
    endTime: new Date(Date.now() + 7200000).toISOString(),
    isActive: true
  },
  {
    id: "off_02",
    vendorId: "vend_02",
    title: "🍎 Evening Clearance Deal: Fruit Bowl @ ₹40",
    description: "Flat ₹10 discount on 300g mixed fruit bowls till 8:00 PM.",
    discountPercentage: 20,
    startTime: new Date(Date.now() - 1800000).toISOString(),
    endTime: new Date(Date.now() + 5400000).toISOString(),
    isActive: true
  }
];

