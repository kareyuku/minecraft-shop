import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

type SidebarItemProps = {
  label: string;
  href: string;
};

export default function Sidebar() {
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
        {/* Page content here */}
        <label htmlFor="my-drawer-2" className=" lg:hidden p-5">
          <GiHamburgerMenu />
        </label>
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
