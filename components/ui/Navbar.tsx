import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { BsWalletFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import VoucherModal from "../modals/VoucherModal";

type NavbarItem = {
  Icon?: ReactNode;
  text: string;
} & LinkProps;

export default function Navbar() {
  function NavbarItem({ text, Icon, href }: NavbarItem) {
    return (
      <Link
        href={href}
        className="flex items-center gap-2 hover:bg-third transition-colors cursor-pointer px-5 py-2 rounded-md"
      >
        {Icon && Icon}
        {text}
      </Link>
    );
  }

  return (
    <nav className="py-6 rounded-md flex justify-between max-sm:flex-col text-xl">
      <section className="navbar__category flex gap-2 uppercase font-bold">
        <h1>Shopiku.pl</h1>
      </section>
      <section className="navbar_category flex gap-2">
        <NavbarItem text={"Shop"} href={"/"} />
        <NavbarItem text={"Documents"} href={"/documents"} />
        <VoucherModal />
      </section>
    </nav>
  );
}
