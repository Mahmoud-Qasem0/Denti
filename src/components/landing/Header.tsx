import { FC, JSX } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

const Header: FC = (): JSX.Element => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-2 border-b border-border/50 bg-background/80 backdrop-blur-md h-16">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={"/logo.png"}
            alt="Denti Logo"
            width={32}
            height={32}
            className="w-12"
          />
          <span>Denti</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            href={"#"}
            className="text-muted-foreground hover:text-foreground"
          >
            How it Work
          </Link>
          <Link
            href={"#"}
            className="text-muted-foreground hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            href={"#"}
            className="text-muted-foreground hover:text-foreground"
          >
            About
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <SignInButton mode="modal">
            <Button variant={"ghost"} size={"sm"}>
              Log In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button size={"sm"}>Sign Up</Button>
          </SignUpButton>
        </div>
      </div>
    </nav>
  );
};

export default Header;
