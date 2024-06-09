import NavBar from "@/components/customs/nav-bar";
import SearchpageTabs from "@/components/customs/searchpage-tabs";
import { Toaster } from "sonner";

export default function SearchPage() {

  return (
    <>
      <Toaster richColors />
      <NavBar />
      <div className="h-screen flex justify-center pt-[200px]">
        <SearchpageTabs />
      </div>
    </>
  );
}
