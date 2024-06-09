"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import ThemeSwitch from "./theme-switch";
import { usePathname } from "next/navigation";
import { getToken, getUser, removeToken, removeUser } from "@/lib/auth";
import { useEffect, useState } from "react";

const NavBar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const HandleLogout = () => {
    removeUser();
    removeToken();
    window.location.reload();
  }

  useEffect(() => {
    setUser(getUser());
    setToken(getToken());
  }, [])

  return (
    <>
      <div className="fixed z-10">
        <div className="grid grid-cols-12 w-screen bg-blue-900">
          <div className="text-white text-3xl col-start-5 col-span-4 flex justify-center items-center h-full">
            第二宿舍退宿預約查詢系統
          </div>
          <div className="col-start-10 col-span-2 flex my-[30px] justify-center gap-2">
            <Button>
              {pathname === "/" ? (
                <Link href="/search">查詢預約</Link>
              ) : (
                <Link href="/">預約表單</Link>
              )}
            </Button>
            {user && token ? (
              <Button onClick={HandleLogout}>登出</Button>
            ) : (
              <Button>
                <Link href="/login">管理員登入</Link>
              </Button>
            )}
          </div>
          <div className="m-[30px] flex items-center justify-center">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
