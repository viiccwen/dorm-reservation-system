import HomepageTabs from "@/components/customs/homepage-tabs";
import ThemeSwitch from "@/components/customs/theme-switch";

export default function Home() {
  return (
    <>
      <ThemeSwitch />
      <div className="h-screen flex justify-center items-center">
        <HomepageTabs />
      </div>
    </>
  );
}
