import { crearCategoria } from "../actions";

import SubmitButton from "./submit-button";

export default function NuevaCategoriaPage() {
  return (
    <div className="p-10 max-w-xl">
      <h1 className="text-3xl font-bold mb-5">
        Nueva Categoría
      </h1>

      <form action={crearCategoria} className="space-y-4">
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

       <SubmitButton />
      </form>
    </div>
  );
}