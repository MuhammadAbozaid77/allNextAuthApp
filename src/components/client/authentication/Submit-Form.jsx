"use client";
import { useFormStatus } from "react-dom";

export default function SubmitForm() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="w-[100%] bg-blue-400 p-2 rounded-md font-semibold"
    >
      Register
    </button>
  );
}
