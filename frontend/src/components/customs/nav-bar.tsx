import Link from "next/link";
import { Button } from "../ui/button";
import ThemeSwitch from "./theme-switch";

const NavBar = () => {
  return (
    <>
      <div className="fixed">
        <div className="grid grid-cols-12 w-screen bg-blue-900">
          <div className="text-white text-3xl col-start-5 col-span-4 flex justify-center items-center h-full">
            第二宿舍退宿預約查詢系統
          </div>
          <div className="col-start-10 col-span-2 flex my-[30px] justify-center gap-2">
            <Button>
              <Link href="/search">查詢預約</Link>
            </Button>
            <Button><Link href="/admin-login">管理員登入</Link></Button>
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
