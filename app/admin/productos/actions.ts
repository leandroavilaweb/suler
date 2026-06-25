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

export async function crearProducto(formData: FormData) {
  const nombre = formData.get("nombre")?.toString() || "";
  const descripcion = formData.get("descripcion")?.toString() || "";
  const precio = formData.get("precio")?.toString() || "0";
  const stock = formData.get("stock")?.toString() || "0";
  const talla = formData.get("talla")?.toString() || "";
  const estado = formData.get("estado")?.toString() || "Activo";
  const categoriaId = Number(formData.get("categoriaId"));

  await prisma.producto.create({
    data: {
      nombre,
      slug: slugify(nombre),
      descripcion,
      precio,
      stock: Number(stock),
      talla,
      estado,
      categoriaId,
    },
  });

  redirect("/admin/productos?success=1");
}
export async function eliminarProducto(id: number) {
  await prisma.producto.delete({
    where: {
      id,
    },
  });

  redirect("/admin/productos?deleted=1");
}
export async function editarProducto(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!id || Number.isNaN(id)) {
    throw new Error("ID inválido");
  }

  const nombre = formData.get("nombre")?.toString() || "";
  const descripcion = formData.get("descripcion")?.toString() || "";

  // 🔴 FIX CHILE / NUMEROS SEGUROS
  const precio = Number(formData.get("precio") || 0);
  const stock = Math.floor(Number(formData.get("stock") || 0));
  const categoriaId = Number(formData.get("categoriaId") || 0);

  const talla = formData.get("talla")?.toString() || "";
  const estado = formData.get("estado")?.toString() || "Activo";

  await prisma.producto.update({
    where: { id },
    data: {
      nombre,
      descripcion,
      precio,
      stock,
      talla,
      estado,
      categoriaId,
    },
  });

  redirect("/admin/productos?updated=1");
}