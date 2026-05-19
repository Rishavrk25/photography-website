import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export default function Packages() {
  const { authToken } = useAuth();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/admin/packages", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        const data = await res.json();
        setPackages(data.data || []);
      } catch (err) {
        console.error("Failed to load packages", err);
      }
    };
    if (authToken) fetchPackages();
  }, [authToken]);

  const download = async (id, name) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/admin/packages/${id}/download`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        },
      );
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name || `package_${id}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Download failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Received Packages</h2>
      {packages.length === 0 ? (
        <p className="text-sm text-gray-500">No packages yet.</p>
      ) : (
        <ul className="space-y-4">
          {packages.map((p) => (
            <li
              key={p.id}
              className="glass p-4 rounded-md flex items-center justify-between"
            >
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-gray-500">
                  Sent: {new Date(p.created_at).toLocaleString()}
                </div>
              </div>
              <div>
                <button
                  onClick={() => download(p.id, p.name + ".zip")}
                  className="bg-gold text-[#111] px-4 py-2 rounded-md font-semibold"
                >
                  Download ZIP
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
