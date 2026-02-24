// App.jsx
import React, { useState } from 'react';

function App() {
  const [scanResult, setScanResult] = useState(null);

  const handleFileUpload = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    const response = await fetch(' https://convallariaceous-unstandardized-dedra.ngrok-free.dev/scan', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    setScanResult(data);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">EquipTrack AI v1.0</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Scan Equipment Tag/Gauge
        </label>
        <input type="file" onChange={handleFileUpload} className="mb-4" />

        {scanResult && (
          <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500">
            <p className="font-bold">Detected Data:</p>
            <p>{scanResult.detected_text.join(', ')}</p>
            <p className="mt-2 text-red-600 font-semibold">
              Next Service: {scanResult.next_maintenance}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
