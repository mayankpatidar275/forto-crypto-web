import { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import Link from "next/link";
import { BlackLogo } from "./assets";

export const baseOptions: BaseLayoutProps = {
  nav: {
    // title: "FORTO",
    children: (
      <Link href="/" aria-label="Homepage" className="flex-shrink-0">
        <Image
          src={BlackLogo}
          alt="Logo"
          className="h-5 sm:h-6 w-auto opacity-65"
          width={150}
          height={50}
          priority
        />
      </Link>
    ),
  },
};
