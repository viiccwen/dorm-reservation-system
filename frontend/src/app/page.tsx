import HomepageTabs from "@/components/customs/homepage-tabs";
import ThemeSwitch from "@/components/customs/theme-switch";
import { Toaster, toast } from "sonner";

export default function Home() {
  return (
    <>
      <Toaster richColors />
      <ThemeSwitch />
      <div className="h-screen flex justify-center items-center">
        <HomepageTabs />
      </div>
    </>
  );
}
