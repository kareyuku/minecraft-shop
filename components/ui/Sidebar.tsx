import Link from "next/link";
import { ReactNode } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsBoxFill, BsFillCreditCardFill } from "react-icons/bs";
import { HiServerStack } from "react-icons/hi2";

type SidebarItemProps = {
  label: string;
  href: string;
  icon: ReactNode;
};

type Props = {
  children: ReactNode;
};

const SidebarItem = ({ label, href, icon }: SidebarItemProps) => {
  return (
    <li>
      <Link
        className="text-white bg-primary hover:bg-third hover:text-white text-lg px-6 py-3"
        href={href}
      >
        <span className="mr-3 bg-secondary px-3 py-3 rounded-md">{icon}</span>
        {label}
      </Link>
    </li>
  );
};

export default function Sidebar({ children }: Props) {
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
        <ul className="menu p-4 w-80 min-h-full text-base-content gap-4 bg-secondary">
          <SidebarItem
            icon={<BsBoxFill />}
            label="Products"
            href="/dashboard/products"
          />
          <SidebarItem
            icon={<HiServerStack />}
            label="Servers"
            href="/dashboard/servers"
          />
          <SidebarItem
            icon={<BsFillCreditCardFill />}
            label="Payments"
            href="/dashboard/payments"
          />
        </ul>
      </div>
    </div>
  );
}
