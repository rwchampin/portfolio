"use client";
import {
  MagnifyingGlassIcon,
  LockClosedIcon,
  SunIcon,
} from "@radix-ui/react-icons";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";

export default function NavBar({ session }: { session: Session | null }) {
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
                <input type="text" className="hidden" />
            <MagnifyingGlassIcon onClick={showSearch} />
            <div>
              {session ? (
                <UserDropdown session={session} />
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
