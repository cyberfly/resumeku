import { cookies } from "next/headers";
import { clearFlash } from "@/lib/actions";

export default async function FlashMessage() {
  const flashCookie = cookies().get("flash");
  let flash = null;

  if (flashCookie) {
    flash = JSON.parse(flashCookie.value);
  }

  if (!flash) return null;

  return (
    <form action={clearFlash}>
      <div
        className={`p-4 rounded-md mb-4 border ${
          flash.type === "error"
            ? "bg-red-100 text-red-700 border-red-200"
            : "bg-green-100 text-green-700 border-green-200"
        }`}
      >
        {flash.message}
      </div>
    </form>
  );
}
