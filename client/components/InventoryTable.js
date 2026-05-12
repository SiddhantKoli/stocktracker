'use client';
import { Package, Calendar, AlertTriangle, ShieldCheck, Skull } from 'lucide-react';

export default function InventoryTable({ inventory }) {
  const getStatusStyles = (status) => {
    switch (status) {
      case 'Expired':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Expiring Soon':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Expired': return <Skull className="w-3 h-3" />;
      case 'Expiring Soon': return <AlertTriangle className="w-3 h-3" />;
      case 'Low Stock': return <Package className="w-3 h-3" />;
      default: return <ShieldCheck className="w-3 h-3" />;
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
            <th className="px-6 py-4 border-b">Item Name</th>
            <th className="px-6 py-4 border-b">Quantity</th>
            <th className="px-6 py-4 border-b">Expiry Date</th>
            <th className="px-6 py-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {inventory.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-6 py-12 text-center text-gray-400">
                No inventory items found. Upload an Excel sheet to get started.
              </td>
            </tr>
          ) : (
            inventory.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4 font-medium text-gray-800">{item.name}</td>
                <td className="px-6 py-4 text-gray-600">{item.quantity}</td>
                <td className="px-6 py-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(item.expiry_date).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyles(item.status)}`}>
                    {getStatusIcon(item.status)}
                    {item.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
