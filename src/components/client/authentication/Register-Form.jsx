"use client";
// import { useActionState, useRef } from "react";
import { useRef } from "react";
import SubmitForm from "./Submit-Form";
import { createUser, getData, sendData } from "@/lib/actions/registerActions";

export default function RegisterForm() {
  const emailRef = useRef();
  const passwordRef = useRef();

  // Calling Server Action
  async function submitHandler(event) {
    event.preventDefault();
    const enteredEmail = emailRef.current?.value;
    const enteredPassword = passwordRef.current?.value;

    try {
      const result = await createUser(enteredEmail, enteredPassword);
      console.log(result);
    } catch (error) {
      // throw new Error("cant fetch Data");
      console.log(error);
    }
  }
  return (
    <>
      <form
        onSubmit={submitHandler}
        className="w-[500px] border p-5 rounded border-gray-500 bg-gray-50"
      >
        <h1 className="text-[20px] font-semibold mb-[20px]"> Register </h1>
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
