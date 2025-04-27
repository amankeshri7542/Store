import { useEffect, useState } from "react";
import { useLocation } from "wouter";

// Credentials
const VALID_USERNAME = "Manoj Kumar";
const VALID_PASSWORD = "amankumar";

// Define product type
interface Product {
  id: number;
  name: string;
  price: number;
}

const AdminPage = () => {
  const [, setLocation] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [saveMessage, setSaveMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already logged in (from session storage)
  useEffect(() => {
    const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
      loadProducts();
    }
  }, []);

  // Load products from JSON file
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

  // Handle login
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

  // Handle price change
  const handlePriceChange = (id: number, newPrice: string) => {
    const price = parseInt(newPrice);
    if (isNaN(price)) return;
    
    setProducts(products.map(product => 
      product.id === id ? { ...product, price } : product
    ));
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    setSaveMessage('Saving changes...');
    
    try {
      const response = await fetch('/api/admin/update-prices', {
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
      
      const result = await response.json();
      
      if (response.ok) {
        setSaveMessage('Prices updated successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage(result.error || 'Failed to update prices.');
      }
    } catch (error) {
      console.error('Error saving prices:', error);
      setSaveMessage('Error connecting to server. Please try again.');
    }
  };

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const goToHomePage = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={goToHomePage}
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
                <input 
                  type="password" 
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-border rounded bg-input text-foreground"
                  placeholder="Enter password"
                  required
                />
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
          <div className="bg-card rounded-lg p-8 shadow-lg max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-foreground mb-6 text-center">Price Management</h1>
            
            {isLoading ? (
              <div className="text-center text-muted-foreground py-8">Loading products...</div>
            ) : (
              <>
                {products.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">No products found</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full mb-6">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 px-4 text-foreground">Product</th>
                          <th className="text-left py-2 px-4 text-foreground">Price (₹)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id} className="border-b border-border">
                            <td className="py-3 px-4 text-foreground">{product.name}</td>
                            <td className="py-3 px-4">
                              <input
                                type="number"
                                value={product.price}
                                onChange={(e) => handlePriceChange(product.id, e.target.value)}
                                className="w-24 p-1 border border-border rounded bg-input text-foreground"
                                min="0"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                
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