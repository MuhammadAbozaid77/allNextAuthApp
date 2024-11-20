"use client";
// import { useActionState, useRef } from "react";
import { useRef, useState } from "react";
import SubmitForm from "./Submit-Form";
import { createUser } from "@/lib/actions/registerActions";

export default function RegisterForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorInEmail, setErrorInEmail] = useState("");

  // Calling Server Action
  async function submitHandler(event) {
    event.preventDefault();
    const enteredEmail = emailRef.current?.value;
    const enteredPassword = passwordRef.current?.value;

    try {
      const result = await createUser(enteredEmail, enteredPassword);
      console.log(result);

      // if (result?.status === "200") {
      //   console.log("GOOOOOOOOOOOOOOOOOOOOOOOOOOOD");
      // }
      setErrorInEmail("");
    } catch (error) {
      setErrorInEmail(error);
      throw new Error(error || "Cant fetch Data");
    }
  }
  return (
    <>
      <form
        onSubmit={submitHandler}
        className="w-[500px] border p-5 rounded border-gray-500 bg-gray-50"
      >
        <h1 className="text-[20px] font-semibold mb-[20px]"> Register </h1>
        {errorInEmail && (
          <div className="bg-red-700 text-[14px] p-2 mb-2 rounded-md  text-white">
            {errorInEmail?.message}
          </div>
        )}
        <div className="p-2 mb-5 border border-gray-500 flex flex-col rounded">
          <label htmlFor="email">Email</label>
          <input
            className="p-2 border rounded border-blue-200 outline-none"
            id="email"
            name="email"
            placeholder="Email"
            ref={emailRef}
          />
        </div>

        <div className="p-2 mb-5 border border-gray-500 flex flex-col rounded">
          <label htmlFor="password">Password</label>
          <input
            className="p-2 border rounded border-blue-200 outline-none"
            id="password"
            name="password"
            type="password"
            ref={passwordRef}
          />
        </div>
        <SubmitForm />
      </form>
    </>
  );
}
