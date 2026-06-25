import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "./delete-button";
import { eliminarProducto } from "./actions";
import EditButton from "./edit-button";

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<{
    success?: string;
    deleted?: string;
    updated?: string;
  }>;
}) {
  const params = await searchParams;

  const productos = await prisma.producto.findMany({
    include: {
      categoria: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return (
    <div className="p-10">
      {/* MENSAJES */}
      {params.success && (
        <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-800 border border-green-300">
          ✅ Producto guardado con éxito
        </div>
      )}

      {params.deleted && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-800 border border-red-300">
          🗑️ Producto eliminado correctamente
        </div>
      )}

      {params.updated && (
        <div className="mb-4 p-3 rounded-lg bg-blue-100 text-blue-800 border border-blue-300">
          ✏️ Producto actualizado correctamente
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">
          Productos
        </h1>

        <Link
          href="/admin/productos/nuevo"
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Nuevo Producto
        </Link>
      </div>

      {/* LISTA */}
      {productos.length === 0 ? (
        <p>No hay productos</p>
      ) : (
        <div className="space-y-3">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              {/* INFO */}
              <div>
                <p className="font-semibold">
                  {producto.nombre}
                </p>

                <p className="text-sm text-gray-500">
                  Categoría: {producto.categoria.nombre}
                </p>

                <p>
                  Precio: ${Number(producto.precio)}
                </p>

                <p>
                  Stock: {producto.stock}
                </p>
              </div>

              {/* BOTONES */}
              <div className="flex items-center gap-4">
                {/* EDITAR */}
                <EditButton id={producto.id} />
                {/* ELIMINAR */}
                <form
                  action={async () => {
                    "use server";
                    await eliminarProducto(producto.id);
                  }}
                >
                  <DeleteButton />
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}