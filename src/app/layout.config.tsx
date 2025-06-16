import { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import Link from "next/link";
import { WhiteLogo } from "./assets";

export const baseOptions: BaseLayoutProps = {
  nav: {
    // title: "FORTO",
    children: (
      <Link href="/" aria-label="Homepage" className="flex-shrink-0">
        <Image
          src={WhiteLogo}
          alt="Logo"
          className="h-5 sm:h-6 w-auto"
          width={150}
          height={50}
          priority
        />
      </Link>
    ),
  },
};
