import Link from "next/link";
import { ReactNode } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

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
        <Link href={href}>{label}</Link>
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
        <ul className="menu p-4 w-80 min-h-full bg-secondary text-base-content">
          <SidebarItem label="Products" href="/admin/products" />
          <SidebarItem label="Servers" href="/admin/servers" />
        </ul>
      </div>
    </div>
  );
}
