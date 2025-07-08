import { useState } from 'react';

export default function SettingsModal() {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button className="btn" onClick={() => setOpen(true)}>
        Settings
      </button>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-4 rounded text-black min-w-[300px]">
        <h3 className="font-semibold mb-4">Settings</h3>
        {/* Add settings form here */}
        <button className="btn" onClick={() => setOpen(false)}>
          Close
        </button>
      </div>
    </div>
  );
} 