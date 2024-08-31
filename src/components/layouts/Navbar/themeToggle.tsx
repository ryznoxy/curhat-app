"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

export default function ThemeToggle() {
  const { resolvedTheme: themes, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const ICONSIZE = 20;

  useEffect(() => setMounted(true), []);

  const handleToggle = () => {
    setTheme(themes === "light" ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <button onClick={handleToggle}>
      {themes === "light" ? (
        <BiMoon size={ICONSIZE} />
      ) : (
        <BiSun size={ICONSIZE} />
      )}
    </button>
  );
}
