import NavBar from "@/components/NavBar";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <main className="text-2xl">
      <NavBar />
      {children}
    </main>
  );
}