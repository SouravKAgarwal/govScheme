"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ThemesSwitcher from "./ThemesSwitcher";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Verification from "./auth/Verification";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  useLogoutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useLoadUserQuery } from "@/redux/features/api/apiSlices";
import { useTheme } from "next-themes";

const Header = () => {
  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, { refetchOnMountOrArgChange: true });
  const [data, setData] = useState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [verification, setVerification] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: sessionData } = useSession();
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();
  const [userLogout, setUserLogout] = useState(false);
  const {} = useLogoutQuery(undefined, {
    skip: !userLogout ? true : false,
  });

  const user = userData?.user;
  const { theme } = useTheme();

  useEffect(() => {
    if (sessionData) {
      setData(sessionData);
    }
  }, [sessionData]);

  useEffect(() => {
    if (!isLoading && !user && data) {
      socialAuth({
        email: data?.user?.email,
        avatar: data?.user?.image,
        name: data?.user?.name,
      });
    }

    if (data === null && !isLoading) {
      if (user) {
        setUserLogout(false);
      } else {
        setUserLogout(true);
      }
    }
  }, [data, user, isLoading]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful");
      refetch();
    }
  }, [isSuccess]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="flex items-center justify-between p-4 lg:px-8 dark:bg-[#111726] bg-white">
        <div className="flex lg:flex-1 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              width={50}
              height={50}
              className="h-10 w-auto"
              src={`https://cdn.myscheme.in/images/logos/emblem-${
                theme === "light" ? "black" : "white"
              }.svg`}
              alt="logo"
            />
            <div className="flex font-extrabold flex-col">
              <div className="text-2xl dark:text-white">
                gov
                <span className="text-3xl text-green-500">Scheme</span>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden md:flex lg:flex-1 items-center gap-6 justify-end">
          <ThemesSwitcher />
          <div className="hidden md:flex md:justify-end">
            {mounted && user ? (
              <Link href="/profile">
                <Image
                  width={30}
                  height={30}
                  src={user?.avatar ? user?.avatar.url : "/profile.png"}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full"
                />
              </Link>
            ) : (
              <button
                onClick={() => setLogin(true)}
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white cursor-pointer"
              >
                Log in <span>&rarr;</span>
              </button>
            )}
          </div>
        </div>
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto dark:bg-black bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <img className="h-12 w-auto" src="/logo.png" alt="logo" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-100/10">
              <div className="py-6 space-y-4">
                <div className="flex justify-start">
                  <ThemesSwitcher />
                </div>
                {mounted && user ? (
                  <Link
                    href="/profile"
                    className="flex items-center gap-4 font-Josefin text-black dark:text-white"
                  >
                    <Image
                      width={40}
                      height={40}
                      src={user?.avatar ? user?.avatar.url : "/profile.png"}
                      alt={user?.name}
                      className="rounded-full"
                    />
                    {user?.name}
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setLogin(true);
                    }}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50"
                  >
                    Log in
                  </button>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      {login && <div className="fixed inset-0 z-40 bg-black bg-opacity-70" />}
      <Login
        login={login}
        setLogin={setLogin}
        setRegister={setRegister}
        refetch={refetch}
      />
      {register && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-70" />
      )}
      <Register
        setLogin={setLogin}
        setRegister={setRegister}
        registered={register}
        setVerification={setVerification}
      />
      {verification && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-70" />
      )}
      <Verification
        verification={verification}
        setVerification={setVerification}
        setLogin={setLogin}
      />
    </header>
  );
};

export default Header;
