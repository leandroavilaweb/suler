import { prisma } from "@/lib/prisma";
import { crearProducto } from "../actions";
import SubmitButton from "./submit-button";
export default async function NuevoProductoPage() {
  const categorias = await prisma.categoria.findMany({
    orderBy: {
      nombre: "asc",
    },
  });

  return (
    <div className="p-10 max-w-2xl">
      <h1 className="text-3xl font-bold mb-5">
        Nuevo Producto
      </h1>

      <form action={crearProducto} className="space-y-4">
        <div>
          <label className="block mb-2">
            Nombre
          </label>

          <input
            type="text"
            name="nombre"
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2">
            Descripción
          </label>

          <textarea
            name="descripcion"
            rows={4}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2">
            Categoría
          </label>

          <select
            name="categoriaId"
            required
            className="w-full border rounded-lg p-3"
          >
            <option value="">
              Seleccione una categoría
            </option>

            {categorias.map((categoria) => (
              <option
                key={categoria.id}
                value={categoria.id}
              >
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">
            Precio
          </label>

          <input
            type="number"
            step="0.01"
            name="precio"
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2">
            Stock
          </label>

          <input
            type="number"
            name="stock"
            defaultValue="0"
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2">
            Talla
          </label>

          <input
            type="text"
            name="talla"
            placeholder="S, M, L, XL"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2">
            Estado
          </label>

          <select
            name="estado"
            className="w-full border rounded-lg p-3"
          >
            <option value="Activo">
              Activo
            </option>

            <option value="Inactivo">
              Inactivo
            </option>
          </select>
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}