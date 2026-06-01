import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string | null;
}

interface NewProduct {
  name: string;
  description: string;
  price: string;
  stock: string;
  imageUrl: string;
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const queryClient = useQueryClient();
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [newProduct, setNewProduct] = useState<NewProduct>({ name: '', description: '', price: '', stock: '', imageUrl: '' });

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', debouncedSearch],
    queryFn: async () => {
      const res = await api.get(`/products?search=${debouncedSearch}`);
      return res.data.data as Product[];
    }
  });

  const createMutation = useMutation({
    mutationFn: (newProd: NewProduct) => api.post('/products', newProd),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setShowAddModal(false);
      setNewProduct({ name: '', description: '', price: '', stock: '', imageUrl: '' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });

  if (isLoading) return <div className="center-flex">Loading...</div>;

  return (
    <div>
      <nav className="navbar">
        <div className="brand">AssignmentDashboard</div>
        <div className="navbar-actions">
          <span className="navbar-meta">{user?.email} ({user?.role})</span>
          <button onClick={logout} className="btn btn-nav">Logout</button>
        </div>
      </nav>

      <div className="container">
        <div className="dashboard-header">
          <h1>Products</h1>
          {user?.role === 'ADMIN' && (
            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
              + Add Product
            </button>
          )}
        </div>

        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search products by name or description..." 
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="center-flex" style={{ minHeight: '50vh' }}>Loading...</div>
        ) : (
          <div className="product-grid">
            {products?.map((product) => (
              <div key={product.id} className="glass product-card">
                <div className="product-image-container">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="product-image" />
                  ) : (
                    <span style={{ color: 'var(--text-muted)' }}>No Image</span>
                  )}
                </div>
                <div className="product-content">
                  <div className="product-title">{product.name}</div>
                  <div className="product-desc">{product.description}</div>
                  <div className="product-footer">
                    <div className="product-price">${product.price}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Stock: {product.stock}</div>
                  </div>
                  {user?.role === 'ADMIN' && (
                    <div className="admin-actions">
                      <button onClick={() => deleteMutation.mutate(product.id)} className="btn btn-danger" style={{ flex: 1, padding: '0.5rem' }}>Delete</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {products?.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                No products found matching "{search}"
              </div>
            )}
          </div>
        )}

        {/* Basic Add Modal */}
        {showAddModal && (
          <div className="modal-backdrop">
            <div className="glass modal-card">
              <h2>Add Product</h2>
              <form onSubmit={(e) => { e.preventDefault(); createMutation.mutate(newProduct); }}>
                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label>Name</label>
                  <input className="input" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input className="input" required value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                </div>
                <div className="form-group" style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label>Price</label>
                    <input className="input" type="number" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label>Stock</label>
                    <input className="input" type="number" required value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Image URL (Optional)</label>
                  <input className="input" type="url" placeholder="https://images.unsplash.com/..." value={newProduct.imageUrl} onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} />
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
