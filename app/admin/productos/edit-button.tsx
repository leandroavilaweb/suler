import Link from "next/link";

export default function EditButton({ id }: { id: number }) {
  return (
    <Link
      href={`/admin/productos/${id}/editar`}
      className="px-3 py-1 text-sm rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
    >
      Editar
    </Link>
  );
}