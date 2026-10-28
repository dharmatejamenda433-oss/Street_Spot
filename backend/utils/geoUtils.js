/**
 * Calculates geodesic distance between two [latitude, longitude] points on Earth using Haversine formula.
 */
export function calculateDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth radius in meters
  const toRad = (angle) => (angle * Math.PI) / 180;

  const phi1 = toRad(lat1);
  const phi2 = toRad(lat2);
  const deltaPhi = toRad(lat2 - lat1);
  const deltaLambda = toRad(lon2 - lon1);

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

/**
 * Formats distance into human readable string (e.g. "350 m" or "1.4 km")
 */
export function formatDistance(meters) {
  if (meters < 1000) {
    return `${meters} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

/**
 * Generates WhatsApp Share URLs
 */
export function generateWhatsAppLinks(vendor, activeOffer, baseUrl = "http://localhost:7000") {
  const stallUrl = `${baseUrl}/api/vendors/${vendor.id}`;
  
  let shareText = `Hey! 😋 Check out *${vendor.businessName}* on StreetSpot!\n📍 Landmark: ${vendor.addressLandmark}\n⭐ Rating: ${vendor.rating} / 5.0`;
  
  if (activeOffer) {
    shareText += `\n🔥 *Special Offer:* ${activeOffer.title} (${activeOffer.discountPercentage}% OFF!)`;
  }
  shareText += `\n👉 View stall menu & live location here: ${stallUrl}`;

  const viralShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  const directChatMessage = `Hello ${vendor.businessName}! I found your stall on StreetSpot. Are you open right now?`;
  const cleanPhone = vendor.whatsappNumber.replace(/[^0-9]/g, "");
  const directChatUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(directChatMessage)}`;

  return {
    viralShareUrl,
    directChatUrl,
    shareText
  };
}

