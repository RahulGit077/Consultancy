import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/AddModules.css";

const AddModules = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [productData, setProductData] = useState({
    product_id: "",
    name: "",
    type: "",
    price: "",
    quantity: "",
  });

  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [addedQuantity, setAddedQuantity] = useState("");

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleModal = () => setShowModal(!showModal);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) throw new Error("Failed to add product");

      setProductData({
        product_id: "",
        name: "",
        type: "",
        price: "",
        quantity: "",
      });

      setSuccessMessage("✅ Product added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      setShowModal(false);
      fetchProducts(); // Refresh product list
    } catch (err) {
      console.error("Error adding product:", err);
      setSuccessMessage("❌ Failed to add product.");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const openEditModal = (product) => {
    setEditProduct(product); // Set the selected product to edit
    setAddedQuantity(""); // Clear the quantity input field
  };

  const handleUpdateQuantity = async (e) => {
    e.preventDefault();

    // Validate the quantity input
    const newQuantity = parseInt(addedQuantity);
    if (!newQuantity || newQuantity <= 0) {
      setSuccessMessage("❌ Please enter a valid quantity.");
      setTimeout(() => setSuccessMessage(""), 3000);
      return;
    }

    const updatedProduct = {
      ...editProduct,
      quantity: editProduct.quantity + newQuantity, // Add to the existing quantity
    };

    try {
      const res = await fetch(`http://localhost:5000/api/products/update/${editProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      

      if (!res.ok) throw new Error("Failed to update quantity");

      setSuccessMessage("✅ Quantity updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      setEditProduct(null); // Close modal after update
      fetchProducts(); // Refresh product list
    } catch (err) {
      console.error("Error updating quantity:", err);
      setSuccessMessage("❌ Failed to update quantity.");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  return (
    <div className="module-body">
      <div className="AddModules d-flex flex-column flex-grow-1">
        <div className="header d-flex justify-content-between align-items-center">
          <button className="add-button" onClick={toggleModal}>
            Add Product
          </button>
          <span>Add Products</span>
        </div>

        {successMessage && <div className="success-message">{successMessage}</div>}

        {/* Product Table */}
        <div className="product-table-container">
          <h3>Product List</h3>
          <table className="product-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr
                    key={index}
                    onClick={() => openEditModal(product)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{product.product_id}</td>
                    <td>{product.name}</td>
                    <td>{product.type}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No products available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal for Adding Product */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={toggleModal}>&times;</span>
              <h3>Add Product</h3>
              <form onSubmit={handleSubmit}>
                <div className="modal-field">
                  <label>Product ID</label>
                  <input
                    type="text"
                    name="product_id"
                    value={productData.product_id}
                    onChange={handleInputChange}
                    placeholder="Enter Product ID"
                    required
                  />
                </div>
                <div className="modal-field">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    placeholder="Enter Product Name"
                    required
                  />
                </div>
                <div className="modal-field">
                  <label>Product Type</label>
                  <input
                    type="text"
                    name="type"
                    value={productData.type}
                    onChange={handleInputChange}
                    placeholder="Enter Product Type"
                    required
                  />
                </div>
                <div className="modal-field">
                  <label>Price</label>
                  <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                    placeholder="Enter Product Price"
                    required
                  />
                </div>
                <div className="modal-field">
                  <label>Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={productData.quantity}
                    onChange={handleInputChange}
                    placeholder="Enter Product Quantity"
                    required
                  />
                </div>
                <button type="submit">Add Product</button>
              </form>
            </div>
          </div>
        )}

        {/* Modal for Updating Quantity */}
        {editProduct && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setEditProduct(null)}>&times;</span>
              <h3>Update Quantity</h3>
              <p><strong>{editProduct.name}</strong> currently has <strong>{editProduct.quantity}</strong> units.</p>
              <form onSubmit={handleUpdateQuantity}>
                <div className="modal-field">
                  <label>Additional Quantity</label>
                  <input
                    type="number"
                    value={addedQuantity}
                    onChange={(e) => setAddedQuantity(e.target.value)}
                    placeholder="Enter quantity to add"
                    required
                  />
                </div>
                <button type="submit">Update Quantity</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddModules;
