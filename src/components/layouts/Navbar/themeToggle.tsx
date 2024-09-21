"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

export default function ThemeToggle() {
  const { resolvedTheme: themes, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const ICONSIZE = 32;

  const CLASSNAMEFORICON =
    "p-2 rounded-xl bg-neutral-200 dark:bg-neutral-800 border hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors duration-300";

  useEffect(() => setMounted(true), []);

  const handleToggle = () => {
    setTheme(themes === "light" ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <button onClick={handleToggle}>
      {themes === "light" ? (
        <BiMoon size={ICONSIZE} className={CLASSNAMEFORICON} />
      ) : (
        <BiSun size={ICONSIZE} className={CLASSNAMEFORICON} />
      )}
    </button>
  );
}
