import { products, vendors } from "../data/mockVendors.js";

export const getProductsByVendor = (req, res) => {
  try {
    const { vendorId } = req.params;
    const stallProducts = products.filter((p) => p.vendorId === vendorId);

    res.status(200).json({
      success: true,
      count: stallProducts.length,
      vendorId,
      products: stallProducts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addProduct = (req, res) => {
  try {
    const { vendorId, name, price, description, category, image, isVegetarian } = req.body;

    if (!vendorId || !name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide vendorId, product name, and price."
      });
    }

    const vendorExists = vendors.some((v) => v.id === vendorId);
    if (!vendorExists) {
      return res.status(404).json({ success: false, message: `Vendor with ID ${vendorId} does not exist.` });
    }

    const newProduct = {
      id: `prod_${Date.now().toString().slice(-4)}`,
      vendorId,
      name,
      description: description || "",
      price: Number(price),
      category: category || "General",
      image: image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
      isAvailable: true,
      isVegetarian: isVegetarian !== undefined ? Boolean(isVegetarian) : true
    };

    products.push(newProduct);

    res.status(201).json({
      success: true,
      message: `"${newProduct.name}" added to menu successfully!`,
      product: newProduct
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = (req, res) => {
  try {
    const { id } = req.params;
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    const removedProduct = products.splice(index, 1)[0];

    res.status(200).json({
      success: true,
      message: `Product "${removedProduct.name}" deleted from menu.`,
      deletedProductId: id
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

