'use client';
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes"


/* HOTFIX: switch doesn't display correct */
const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme();

    const handleThemeChange = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

  return (
    <>
      <Switch value={theme === "dark" ? "on" : "off"} onCheckedChange={handleThemeChange} />
    </>
  );
};

export default ThemeSwitch;
