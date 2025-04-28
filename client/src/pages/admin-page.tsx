
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

const VALID_USERNAME = "Manoj Kumar";
const VALID_PASSWORD = "amankumar";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

const AdminPage = () => {
  const [, setLocation] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [saveMessage, setSaveMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    image: "",
    inStock: true,
    category: "cement" // Default category
  });

  useEffect(() => {
    const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
      loadProducts();
    }
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/products');
      const data = await response.json();
      setProducts(data.products);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading products:', error);
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      sessionStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      setLoginError('');
      loadProducts();
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      
      try {
        const response = await fetch('/api/admin/upload-image', {
          method: 'POST',
          body: formData,
        });
        
        if (response.ok) {
          const { imageUrl } = await response.json();
          setNewProduct({ ...newProduct, image: imageUrl });
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: VALID_USERNAME,
          password: VALID_PASSWORD,
          product: newProduct
        })
      });

      if (response.ok) {
        loadProducts();
        setNewProduct({ name: "", price: 0, image: "", inStock: true });
        setSaveMessage('Product added successfully!');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setSaveMessage('Error adding product');
    }
  };

  const handlePriceChange = (id: number, newPrice: string) => {
    const price = parseFloat(newPrice);
    if (isNaN(price) || price < 0) return;
    
    setProducts(products.map(product => 
      product.id === id ? { ...product, price } : product
    ));
  };

  const handleStockToggle = (id: number) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, inStock: !product.inStock } : product
    ));
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      const response = await fetch('/api/admin/delete-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: VALID_USERNAME,
          password: VALID_PASSWORD,
          productId
        })
      });
      
      if (response.ok) {
        loadProducts();
        setSaveMessage('Product deleted successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      setSaveMessage('Error deleting product');
    }
  };

  const handleSaveChanges = async () => {
    setSaveMessage('Saving changes...');
    try {
      const response = await fetch('/api/admin/update-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: VALID_USERNAME,
          password: VALID_PASSWORD,
          products
        })
      });
      
      if (response.ok) {
        setSaveMessage('Changes saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error saving changes:', error);
      setSaveMessage('Error saving changes');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => setLocation("/")}
          className="mb-8 flex items-center text-primary hover:underline"
        >
          ← Back to Homepage
        </button>

        {!isLoggedIn ? (
          <div className="bg-card rounded-lg p-8 shadow-lg max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-foreground mb-2 text-center">Shiv Cement Store</h1>
            <h2 className="text-xl font-semibold text-foreground mb-6 text-center">Admin Login</h2>
            
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-foreground font-medium mb-2">Username</label>
                <input 
                  type="text" 
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border border-border rounded bg-input text-foreground"
                  placeholder="Enter username"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-foreground font-medium mb-2">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-border rounded bg-input text-foreground"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>
              
              {loginError && (
                <p className="text-destructive mb-4">{loginError}</p>
              )}
              
              <button 
                type="submit"
                className="w-full bg-primary text-primary-foreground py-2 px-4 rounded font-medium hover:bg-primary/90 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-card rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-foreground mb-6 text-center">Product Management</h1>
            
            <div className="mb-8 p-6 border border-border rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full p-2 border border-border rounded"
                    required
                  >
                    <option value="cement">Cement</option>
                    <option value="steel">Steel</option>
                    <option value="material">Other Materials</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full p-2 border border-border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                    className="w-full p-2 border border-border rounded"
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image</label>
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="w-full p-2 border border-border rounded"
                    accept="image/*"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-2 rounded"
                >
                  Add Product
                </button>
              </form>
            </div>

            {isLoading ? (
              <div className="text-center text-muted-foreground py-8">Loading products...</div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full mb-6">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-4">Image</th>
                        <th className="text-left py-2 px-4">Product</th>
                        <th className="text-left py-2 px-4">Price (₹)</th>
                        <th className="text-left py-2 px-4">Stock Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-border">
                          <td className="py-3 px-4">
                            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                          </td>
                          <td className="py-3 px-4">{product.name}</td>
                          <td className="py-3 px-4">
                            <input
                              type="number"
                              value={product.price}
                              onChange={(e) => handlePriceChange(product.id, e.target.value)}
                              className="w-24 p-1 border border-border rounded"
                              min="0"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleStockToggle(product.id)}
                                className={`py-1 px-3 rounded ${
                                  product.inStock
                                    ? 'bg-green-500 text-white'
                                    : 'bg-red-500 text-white'
                                }`}
                              >
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="bg-red-500 text-white py-1 px-3 rounded"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <button
                    onClick={handleSaveChanges}
                    className="w-full sm:w-auto bg-primary text-primary-foreground py-2 px-6 rounded font-medium hover:bg-primary/90 transition-colors"
                  >
                    Save Changes
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full sm:w-auto bg-muted text-muted-foreground py-2 px-6 rounded font-medium hover:bg-muted/80 transition-colors"
                  >
                    Logout
                  </button>
                </div>
                
                {saveMessage && (
                  <p className={`mt-4 text-center ${saveMessage.includes('successfully') ? 'text-green-500' : 'text-destructive'}`}>
                    {saveMessage}
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
