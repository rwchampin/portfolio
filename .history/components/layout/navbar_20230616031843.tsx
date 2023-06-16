"use client";
import  Popover  from  "@/components/shared/popover";
import {
  MagnifyingGlassIcon,
  LockClosedIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";

export default function NavBar({ session }: { session: Session | null }) {
  const searchbar = useRef<HTMLInputElement>(null);
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);
  const links = [
    {
      name: "experiments",
      href: "/experiments",
    },
    {
      name: "learn",
      href: "/learn",
    },
    {
      name: "web development",
      href: "/web-development",
    },
    {
      name: "design",
      href: "/design",
    },
    {
      name: "code",
      href: "/code",
    },
  ];

  const showSearch = () => {
    if (searchbar.current) {
      gsap.to(searchbar.current, {
        duration: 0.2,
        width: 500,
        ease: "power1.inOut",
      });
      searchbar.current.focus();
    }
  }


  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="Precedent logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>Precedent</p>
          </Link>
          <div className="flex items-center space-x-5">
            <ul className="flex items-center space-x-5">
              {links.map((link, i) => (
                <li key={i}>
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
                <input ref={searchbar} type="text" className="hidden" />
            <MagnifyingGlassIcon className="cursor-pointer" onClick={showSearch} />
            <div>
              {session ? (
                <Popover> <UserDropdown session={session} /></Popover>
               
              ) : (
                  <LockClosedIcon onClick={() => setShowSignInModal(true)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
