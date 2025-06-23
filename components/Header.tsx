"use client";

import React from "react";
import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import useBasketStore from "@/store/store";

function Header() {
  const { user } = useUser();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (err) {
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };
  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
      {/* Top Row */}
      <div className="flex w-full flex-wrap justiufy-between items-center">
        <Link
          href="/"
          className=" justify-center text-2xl font-bold text-orange-400 hover:opacity-50 cursor-pointer mx-auto sm:mx-0"
        >
          Shopr
        </Link>

        <Form
          action="/search"
          className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt- sm:mt-0 "
        >
          <input
            type="text"
            name="query"
            placeholder="Search for Products"
            className="bg-gray-100 text-gray-800 px-4 py-2 w-full max-w-4xl rounded border focus:outline-none focus:ring-2"
          />
        </Form>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1">
          <Link
            href="/basket"
            className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
          >
            <TrolleyIcon className="w-6 h-6" />

            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {itemCount}
            </span>
            <span>My Basket</span>
          </Link>

          {/* User Area */}
          {/* Waiting for Clerk to fully load before initializing */}
          <ClerkLoaded>
            <SignedIn>
              <Link
                href="/orders"
                className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
              >
                <PackageIcon />
                <span>My Orders</span>
              </Link>
            </SignedIn>
          </ClerkLoaded>

          {user ? (
            <div className="flex items-center space-x-2">
              <UserButton />

              <div className="hidden sm:block text-xs">
                <p className="text-gray-400">Welcome Back!</p>
                <p className="font-bold">{user.fullName}</p>
              </div>
            </div>
          ) : (
            <SignInButton mode="modal" />
          )}

          {user?.passkeys.length === 0 && (
            <button
              onClick={createClerkPasskey}
              className="border border-orange-200 rounded py-2 px-4 text-orange-200"
            >
              Create Passkey
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
