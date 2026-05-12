'use client';
import { useState } from 'react';
import { Upload, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { uploadInventory } from '../services/api';

export default function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setStatus(null);

    try {
      await uploadInventory(file);
      setStatus('success');
      setFile(null);
      if (onUploadSuccess) onUploadSuccess();
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <Upload className="w-5 h-5 text-blue-600" />
        Upload Inventory
      </h2>
      
      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100 transition-all cursor-pointer"
        />
        
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all
            ${!file || loading 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg active:scale-95'}`}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Process File'}
        </button>
      </div>

      {status === 'success' && (
        <p className="mt-4 text-green-600 flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4" /> Inventory uploaded successfully!
        </p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-red-600 flex items-center gap-2">
          <XCircle className="w-4 h-4" /> Failed to upload inventory. Please check the file format.
        </p>
      )}
    </div>
  );
}
