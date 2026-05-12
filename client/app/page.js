'use client';
import { useState, useEffect } from 'react';
import { Package, AlertCircle, Calendar, Trash2, LayoutDashboard } from 'lucide-react';
import { getInventory, clearInventory } from '../services/api';
import FileUpload from '../components/FileUpload';
import InventoryTable from '../components/InventoryTable';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getInventory();
      setInventory(data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    if (confirm('Are you sure you want to clear all inventory?')) {
      try {
        await clearInventory();
        setInventory([]);
      } catch (error) {
        console.error('Error clearing inventory:', error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = {
    total: inventory.length,
    lowStock: inventory.filter(i => i.status === 'Low Stock').length,
    expiring: inventory.filter(i => i.status === 'Expiring Soon' || i.status === 'Expired').length,
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
              <LayoutDashboard className="w-8 h-8 text-white" />
            </div>
            Food Inventory Alert System
          </h1>
          <p className="mt-2 text-gray-500 font-medium ml-1">Manage your stock, reduce waste, stay alerted.</p>
        </div>
        
        <button
          onClick={handleClear}
          className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-bold transition-all active:scale-95"
        >
          <Trash2 className="w-5 h-5" />
          Clear Database
        </button>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 card-hover">
          <div className="p-3 bg-blue-50 w-fit rounded-2xl mb-4">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Total Items</p>
          <p className="text-3xl font-black text-gray-800 mt-1">{stats.total}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 card-hover">
          <div className="p-3 bg-orange-50 w-fit rounded-2xl mb-4">
            <AlertCircle className="w-6 h-6 text-orange-600" />
          </div>
          <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Low Stock</p>
          <p className="text-3xl font-black text-orange-600 mt-1">{stats.lowStock}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 card-hover">
          <div className="p-3 bg-red-50 w-fit rounded-2xl mb-4">
            <Calendar className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Expiring/Expired</p>
          <p className="text-3xl font-black text-red-600 mt-1">{stats.expiring}</p>
        </div>
      </div>

      <FileUpload onUploadSuccess={fetchData} />

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Inventory Dashboard</h2>
        <span className="text-sm font-medium text-gray-400">Last updated: {new Date().toLocaleTimeString()}</span>
      </div>

      <InventoryTable inventory={inventory} />

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-400 text-sm font-medium">
        &copy; {new Date().getFullYear()} Food Inventory Alert System. Built with Next.js & Express.
      </footer>
    </main>
  );
}
