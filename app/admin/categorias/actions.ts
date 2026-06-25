"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export async function crearCategoria(formData: FormData) {
  const nombre = formData.get("nombre")?.toString();

  if (!nombre) {
    return;
  }

  await prisma.categoria.create({
    data: {
      nombre,
      slug: slugify(nombre),
    },
  });

 redirect("/admin/categorias?success=1");
}
export async function eliminarCategoria(id: number) {
  await prisma.categoria.delete({
    where: {
      id,
    },
  });

  redirect("/admin/categorias?deleted=1");
}