import { vendors, products, offers } from "../data/mockVendors.js";
import { calculateDistanceMeters, formatDistance, generateWhatsAppLinks } from "../utils/geoUtils.js";

export const getNearbyVendors = (req, res) => {
  try {
    const lat = parseFloat(req.query.lat) || 12.9716;
    const lng = parseFloat(req.query.lng) || 77.5946;
    const radiusMeters = parseInt(req.query.radius, 10) || 5000;
    const category = req.query.category;

    let results = vendors.map((vendor) => {
      const [vendorLng, vendorLat] = vendor.location.coordinates;
      const distanceMeters = calculateDistanceMeters(lat, lng, vendorLat, vendorLng);
      
      const activeOffer = offers.find(
        (o) => o.vendorId === vendor.id && o.isActive && new Date(o.endTime) > new Date()
      );

      return {
        ...vendor,
        distanceMeters,
        distanceText: formatDistance(distanceMeters),
        activeOffer: activeOffer ? {
          title: activeOffer.title,
          discountPercentage: activeOffer.discountPercentage,
          endTime: activeOffer.endTime
        } : null
      };
    });

    results = results.filter((v) => v.distanceMeters <= radiusMeters);

    if (category && category !== "all") {
      results = results.filter((v) => v.category.toLowerCase() === category.toLowerCase());
    }

    results.sort((a, b) => a.distanceMeters - b.distanceMeters);

    res.status(200).json({
      success: true,
      count: results.length,
      customerCoordinates: { latitude: lat, longitude: lng },
      radiusMeters,
      vendors: results
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllVendors = (req, res) => {
  res.status(200).json({
    success: true,
    count: vendors.length,
    vendors
  });
};

export const getVendorById = (req, res) => {
  try {
    const { id } = req.params;
    const vendor = vendors.find((v) => v.id === id);

    if (!vendor) {
      return res.status(404).json({ success: false, message: `Stall with ID ${id} not found.` });
    }

    const stallMenu = products.filter((p) => p.vendorId === id);
    const stallOffers = offers.filter(
      (o) => o.vendorId === id && o.isActive && new Date(o.endTime) > new Date()
    );
    const whatsapp = generateWhatsAppLinks(vendor, stallOffers[0] || null);

    res.status(200).json({
      success: true,
      vendor,
      menu: stallMenu,
      offers: stallOffers,
      whatsapp
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createVendor = (req, res) => {
  try {
    const {
      businessName,
      category,
      tagline,
      description,
      contactPhone,
      whatsappNumber,
      addressLandmark,
      latitude,
      longitude,
      operatingHours
    } = req.body;

    if (!businessName || !category || !contactPhone || !addressLandmark) {
      return res.status(400).json({
        success: false,
        message: "Please provide businessName, category, contactPhone, and addressLandmark."
      });
    }

    const newVendor = {
      id: `vend_${Date.now().toString().slice(-4)}`,
      businessName,
      category,
      tagline: tagline || "Authentic Local Delicacies",
      description: description || "",
      bannerImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      contactPhone,
      whatsappNumber: whatsappNumber || contactPhone,
      addressLandmark,
      location: {
        type: "Point",
        coordinates: [
          parseFloat(longitude) || 77.5946,
          parseFloat(latitude) || 12.9716
        ]
      },
      isOpen: true,
      operatingHours: operatingHours || "4:00 PM - 10:00 PM",
      rating: 5.0,
      reviewCount: 1,
      createdAt: new Date().toISOString()
    };

    vendors.push(newVendor);

    res.status(201).json({
      success: true,
      message: "New vendor stall registered successfully!",
      vendor: newVendor
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateVendorLocation = (req, res) => {
  try {
    const { id } = req.params;
    const { latitude, longitude, addressLandmark } = req.body;

    const vendor = vendors.find((v) => v.id === id);
    if (!vendor) {
      return res.status(404).json({ success: false, message: "Vendor not found." });
    }

    if (latitude !== undefined && longitude !== undefined) {
      vendor.location.coordinates = [parseFloat(longitude), parseFloat(latitude)];
    }

    if (addressLandmark) {
      vendor.addressLandmark = addressLandmark;
    }

    res.status(200).json({
      success: true,
      message: `📍 Live stall location updated for ${vendor.businessName}!`,
      updatedLocation: vendor.location,
      addressLandmark: vendor.addressLandmark
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleVendorStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { isOpen } = req.body;

    const vendor = vendors.find((v) => v.id === id);
    if (!vendor) {
      return res.status(404).json({ success: false, message: "Vendor not found." });
    }

    vendor.isOpen = isOpen !== undefined ? Boolean(isOpen) : !vendor.isOpen;

    res.status(200).json({
      success: true,
      message: `Stall status updated: ${vendor.isOpen ? "🟢 OPEN NOW" : "🔴 CLOSED"}`,
      vendorId: vendor.id,
      isOpen: vendor.isOpen
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getWhatsAppShare = (req, res) => {
  try {
    const { id } = req.params;
    const vendor = vendors.find((v) => v.id === id);

    if (!vendor) {
      return res.status(404).json({ success: false, message: "Vendor not found." });
    }

    const activeOffer = offers.find(
      (o) => o.vendorId === id && o.isActive && new Date(o.endTime) > new Date()
    );

    const shareData = generateWhatsAppLinks(vendor, activeOffer);

    res.status(200).json({
      success: true,
      businessName: vendor.businessName,
      ...shareData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

