import Helper from "@/lib/helper";
import { useRouter } from "next/router";
import Button from "./button";

export default function Header({ children }) {
  const router = new useRouter();
  return (
    <>
      <nav className="p-2 sticky top-0 z-[100] border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 shadow-lg">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <img
            src="img/logo.png"
            alt="lekhpal book logo"
            width={40}
            height={40}
            className="rounded-full border-2 border-orange-600"
            onClick={() => {
              router.push("/");
            }}
          />
          <span
            className="self-center font-serif italic text-xl whitespace-nowrap"
            style={{
              background: "#c2410c",
              background: "linear-gradient(to top, #c2410c 0%, #F50000 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            onClick={() => {
              router.push("/");
            }}
          >
            Lekhpal Book
          </span>
          <Button
            type="button"
            text="|||"
            className="font-bold rotate-90 p-1 mr-2 text-sm text-orange-600 focus:outline-none"
            onClick={(el) => {
              Helper.toggleClass(
                document.getElementById("mobileSidebar"),
                "hidden"
              );
              Helper.toggleText(el.target, "|||", "✖️");
            }}
          />
        </div>
      </nav>
      {children}
    </>
  );
}
