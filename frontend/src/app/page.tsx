import HomepageTabs from "@/components/customs/homepage-tabs";
import NavBar from "@/components/customs/nav-bar";
import ThemeSwitch from "@/components/customs/theme-switch";
import { Toaster, toast } from "sonner";

export default function Home() {
  return (
    <>
      <Toaster richColors />
      <NavBar />
      <div className="h-screen flex justify-center pt-[200px]">
        <HomepageTabs />
      </div>
    </>
  );
}
