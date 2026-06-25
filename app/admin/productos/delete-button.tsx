"use client";

import { useState } from "react";

export default function DeleteButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-red-600 text-white px-3 py-2 rounded-lg"
      >
        Eliminar
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-2">
              Eliminar producto
            </h2>

            <p className="text-gray-600 mb-6">
              ¿Estás seguro de eliminar este producto?
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}