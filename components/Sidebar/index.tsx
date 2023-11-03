import Link from "next/link";
import { ReactNode } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsBoxFill } from "react-icons/bs";

type SidebarItemProps = {
  label: string;
  href: string;
};

type Props = {
  children: ReactNode;
};

export default function Sidebar({ children }: Props) {
  const SidebarItem = ({ label, href }: SidebarItemProps) => {
    return (
      <li>
        <Link
          className="text-white bg-primary hover:bg-third hover:text-white text-lg px-6 py-3"
          href={href}
        >
          <span className="mr-3 bg-secondary px-3 py-3 rounded-md">
            <BsBoxFill />
          </span>
          {label}
        </Link>
      </li>
    );
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <label htmlFor="my-drawer-2" className=" p-5">
          <GiHamburgerMenu />
        </label>
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-secondary text-base-content gap-4">
          <SidebarItem label="Products" href="/admin/products" />
          <SidebarItem label="Servers" href="/admin/servers" />
        </ul>
      </div>
    </div>
  );
}
