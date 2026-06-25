import { prisma } from "@/lib/prisma";
import { editarProducto } from "../../actions";

export default async function EditarProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const productId = Number(id);

  if (Number.isNaN(productId)) {
    return <p>ID inválido</p>;
  }

  const productoRaw = await prisma.producto.findUnique({
    where: { id: productId },
  });

  if (!productoRaw) {
    return <p>Producto no encontrado</p>;
  }

  const producto = {
    id: productoRaw.id,
    nombre: productoRaw.nombre,
    descripcion: productoRaw.descripcion,
    categoriaId: productoRaw.categoriaId,
    precio: Number(productoRaw.precio),
    stock: productoRaw.stock,
    talla: productoRaw.talla,
    estado: productoRaw.estado,
  };

  const categorias = await prisma.categoria.findMany({
    orderBy: { nombre: "asc" },
  });

  return (
    <div className="p-10 max-w-2xl">
      <h1 className="text-3xl font-bold mb-5">Editar Producto</h1>

      <form action={editarProducto} className="space-y-4">

        <input type="hidden" name="id" value={producto.id} />

        {/* NOMBRE */}
        <div>
          <label className="block mb-1 font-semibold">Nombre</label>
          <input
            type="text"
            name="nombre"
            defaultValue={producto.nombre}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* DESCRIPCIÓN */}
        <div>
          <label className="block mb-1 font-semibold">Descripción</label>
          <textarea
            name="descripcion"
            defaultValue={producto.descripcion || ""}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* CATEGORÍA */}
        <div>
          <label className="block mb-1 font-semibold">Categoría</label>
          <select
            name="categoriaId"
            defaultValue={producto.categoriaId}
            className="w-full border p-3 rounded-lg"
          >
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

{/* PRECIO */}
<div>
  <label className="block mb-1 font-semibold">Precio (CLP)</label>

  <input
    type="number"
    name="precio"
    min="0"
    step="1"
    defaultValue={Number(producto.precio)}
    className="w-full border p-3 rounded-lg"
  />
</div>

        {/* STOCK */}
        <div>
          <label className="block mb-1 font-semibold">Stock</label>
          <input
            type="number"
            name="stock"
            defaultValue={producto.stock}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* TALLA */}
        <div>
          <label className="block mb-1 font-semibold">Talla</label>
          <input
            type="text"
            name="talla"
            defaultValue={producto.talla || ""}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* ESTADO */}
        <div>
          <label className="block mb-1 font-semibold">Estado</label>
          <select
            name="estado"
            defaultValue={producto.estado ?? "Activo"}
            className="w-full border p-3 rounded-lg"
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-black text-white px-5 py-3 rounded-lg"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}