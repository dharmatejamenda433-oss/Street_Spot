import { offers, vendors } from "../data/mockVendors.js";

export const getActiveOffers = (req, res) => {
  try {
    const now = new Date();
    
    const activeOffers = offers
      .filter((o) => o.isActive && new Date(o.endTime) > now)
      .map((offer) => {
        const vendor = vendors.find((v) => v.id === offer.vendorId);
        return {
          ...offer,
          vendorName: vendor ? vendor.businessName : "Unknown Stall",
          vendorCategory: vendor ? vendor.category : "",
          vendorAddress: vendor ? vendor.addressLandmark : ""
        };
      });

    res.status(200).json({
      success: true,
      count: activeOffers.length,
      offers: activeOffers
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createOffer = (req, res) => {
  try {
    const { vendorId, title, description, discountPercentage, durationHours } = req.body;

    if (!vendorId || !title || !discountPercentage) {
      return res.status(400).json({
        success: false,
        message: "Please provide vendorId, title, and discountPercentage."
      });
    }

    const vendor = vendors.find((v) => v.id === vendorId);
    if (!vendor) {
      return res.status(404).json({ success: false, message: "Vendor not found." });
    }

    const hours = Number(durationHours) || 2;
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + hours * 3600000);

    const newOffer = {
      id: `off_${Date.now().toString().slice(-4)}`,
      vendorId,
      title,
      description: description || `Special ${discountPercentage}% discount for the next ${hours} hours!`,
      discountPercentage: Number(discountPercentage),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      isActive: true
    };

    offers.unshift(newOffer);

    res.status(201).json({
      success: true,
      message: `🎉 Flash offer "${newOffer.title}" launched for ${vendor.businessName}!`,
      offer: newOffer
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteOffer = (req, res) => {
  try {
    const { id } = req.params;
    const index = offers.findIndex((o) => o.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: "Offer not found." });
    }

    offers.splice(index, 1);

    res.status(200).json({
      success: true,
      message: "Offer removed successfully.",
      deletedOfferId: id
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

