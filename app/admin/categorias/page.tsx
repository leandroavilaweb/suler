import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "./delete-button";
import { eliminarCategoria } from "./actions";

export default async function CategoriasPage({
  searchParams,
}: {
  searchParams: Promise<{
    success?: string;
    deleted?: string;
  }>;
}) {
  const params = await searchParams;

  const categorias = await prisma.categoria.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <div className="p-10">
      {params.success && (
        <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-800 border border-green-300">
          ✅ Categoría guardada con éxito
        </div>
      )}

      {params.deleted && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-800 border border-red-300">
          🗑️ Categoría eliminada correctamente
        </div>
      )}

      <h1 className="text-3xl font-bold mb-5">
        Categorías
      </h1>

      <Link
        href="/admin/categorias/nueva"
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        Nueva Categoría
      </Link>

      <div className="mt-5">
        {categorias.length === 0 ? (
          <p>No hay categorías</p>
        ) : (
          <div className="space-y-3">
            {categorias.map((categoria) => (
              <div
                key={categoria.id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    {categoria.nombre}
                  </p>

                  <p className="text-sm text-gray-500">
                    {categoria.slug}
                  </p>
                </div>

                <form
                  action={async () => {
                    "use server";
                    await eliminarCategoria(categoria.id);
                  }}
                >
                  <DeleteButton />
                </form>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}