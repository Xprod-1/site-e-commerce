import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import '../styles/Dashboard.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  });

  const [activeSection, setActiveSection] = useState("products");
  const [showModal, setShowModal] = useState(false); // Control modal visibility

  const [salesData] = useState({
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales ($)",
        data: [3000, 4000, 3500, 5000, 4500, 6000],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  const [userData] = useState({
    labels: ["User A", "User B", "User C", "User D", "User E"],
    datasets: [
      {
        label: "Active Users",
        data: [50, 40, 65, 80, 55],
        backgroundColor: "rgba(255, 159, 64, 0.5)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  });

  const [adminUsers] = useState([
    { id: 1, name: "Admin A", role: "Administrator", email: "adminA@example.com" },
    { id: 2, name: "Admin B", role: "Administrator", email: "adminB@example.com" },
  ]);

  const [regularUsers] = useState([
    { id: 1, name: "User A", email: "userA@example.com" },
    { id: 2, name: "User B", email: "userB@example.com" },
    { id: 3, name: "User C", email: "userC@example.com" },
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleMenuClick = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const updatedProducts = [
      ...products,
      { id: products.length + 1, ...newProduct },
    ];
    setProducts(updatedProducts);
    setNewProduct({
      title: "",
      price: "",
      category: "",
      image: "",
    });
    setShowModal(false); // Close modal after adding
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const handleEditProduct = (e) => {
    e.preventDefault();
    const updatedProducts = products.map((product) =>
      product.id === editingProduct.id ? editingProduct : product
    );
    setProducts(updatedProducts);
    setEditingProduct(null);
  };

  const openModal = (product) => {
    setEditingProduct(product);
    setShowModal(true); // Open modal for editing
  };

  const openAddProductModal = () => {
    setEditingProduct(null); // Clear any editing product
    setNewProduct({
      title: "",
      price: "",
      category: "",
      image: "",
    });
    setShowModal(true); // Open modal for adding
  };

  const closeModal = () => {
    setEditingProduct(null);
    setShowModal(false); // Close modal
  };

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <h1>Loading Dashboard...</h1>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <div className="list-group shadow">
            <h4 className="list-group-item bg-dark text-white text-center">Admin Menu</h4>
            <button
              onClick={() => handleMenuClick("products")}
              className={`list-group-item list-group-item-action ${activeSection === "products" ? "active" : ""}`}
            >
              <i className="fa fa-list me-2"></i> Products
            </button>
            <button
              onClick={() => handleMenuClick("sales-report")}
              className={`list-group-item list-group-item-action ${activeSection === "sales-report" ? "active" : ""}`}
            >
              <i className="fa fa-line-chart me-2"></i> Sales Report
            </button>
            <button
              onClick={() => handleMenuClick("users")}
              className={`list-group-item list-group-item-action ${activeSection === "users" ? "active" : ""}`}
            >
              <i className="fa fa-users me-2"></i> Admin Users
            </button>
            <button
              onClick={() => handleMenuClick("graphs")}
              className={`list-group-item list-group-item-action ${activeSection === "graphs" ? "active" : ""}`}
            >
              <i className="fa fa-chart-bar me-2"></i> Graphs
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <div className="mb-4">
            <h1 className="text-center">Admin Dashboard</h1>
            <p className="text-center text-muted">Manage and track your store's performance.</p>
          </div>

          {/* Product Management Section */}
          <div id="products" className="mt-5">
            <h3>Product Management</h3>
            <div className="mb-4">
              <button onClick={openAddProductModal} className="btn btn-primary">
                Add Product
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Price ($)</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.title}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      <td>
                        <img
                          src={product.image}
                          alt={product.title}
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => openModal(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sales Report Section */}
          <div id="sales-report" className="mt-5">
            <h3>Sales Report</h3>
            <p className="text-muted">Monthly Sales Data</p>
            <Bar
              data={salesData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: "Sales Performance Over the Months" },
                },
              }}
            />
          </div>

          {/* Admin Users Section */}
          <div id="users" className="mt-5">
            <h3>Admin Users</h3>
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {adminUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.role}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Regular Users Section */}
          <div id="graphs" className="mt-5">
            <h3>Graphs</h3>
            <p className="text-muted">Performance Graphs</p>
            <Bar
              data={userData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: "Active Users Overview" },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Modal for adding or editing product */}
      {showModal && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingProduct ? "Edit Product" : "Add Product"}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={editingProduct ? handleEditProduct : handleAddProduct}>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingProduct ? editingProduct.title : newProduct.title}
                      onChange={(e) =>
                        editingProduct
                          ? setEditingProduct({ ...editingProduct, title: e.target.value })
                          : setNewProduct({ ...newProduct, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      value={editingProduct ? editingProduct.price : newProduct.price}
                      onChange={(e) =>
                        editingProduct
                          ? setEditingProduct({ ...editingProduct, price: e.target.value })
                          : setNewProduct({ ...newProduct, price: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingProduct ? editingProduct.category : newProduct.category}
                      onChange={(e) =>
                        editingProduct
                          ? setEditingProduct({ ...editingProduct, category: e.target.value })
                          : setNewProduct({ ...newProduct, category: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingProduct ? editingProduct.image : newProduct.image}
                      onChange={(e) =>
                        editingProduct
                          ? setEditingProduct({ ...editingProduct, image: e.target.value })
                          : setNewProduct({ ...newProduct, image: e.target.value })
                      }
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-success">
                    {editingProduct ? "Save Changes" : "Add Product"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;