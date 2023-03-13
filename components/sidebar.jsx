import ClientIcon from "@/svg/clientIcon";
import GearIcon from "@/svg/gearIcon";
import ListIcon from "@/svg/listIcon";
import OnlineShopIcon from "@/svg/onlineShopIcon";
import PaymentIcon from "@/svg/paymentIcon";
import PurchaseIcon from "@/svg/purchaseIcon";
import ReportIcon from "@/svg/reportIcon";
import SalesIcon from "@/svg/salesIcon";
import SupplierIcon from "@/svg/supplierIcon";
import WorkerIcon from "@/svg/workerIcon";
import Cookies from "js-cookie";
import Link from "next/link";
import Button from "./button";

function Profile() {
  if (Cookies?.lpbBID) {
    return (
      <div>
        <OnlineShopIcon width={40} height={40} />
      </div>
    );
  } else {
    return (
      <Link href="/login" style={{ padding: "0", background: "transparent" }}>
        <Button text="Sign In / Log In" />
      </Link>
    );
  }
}
export default function Sidebar() {
  return (
    <>
      <div
        className="flex flex-col gap-4 hidden fixed bottom-0 overflow-y-scroll h-screen w-full z-50 p-2 py-10 top-7 bg-slate-300"
        id="mobileSidebar"
      >
        <ul>
          <li>
            <Profile />
          </li>
        </ul>
        <ul className="flex flex-col gap-3 mt-4 ">
          <p className="text-sm text-gray-500">records....</p>
          <li>
            <Link href="/clients">
              <ClientIcon width={30} height={30} /> Clients / Parties
            </Link>
          </li>
          <li>
            <Link href="/clients">
              <ListIcon width={30} height={30} fill="#c45000" /> Items
            </Link>
          </li>
          <li>
            <Link href="/clients">
              <PaymentIcon width={30} height={30} fill="#c45000" /> Payments
            </Link>
          </li>
          <li>
            <Link href="/clients">
              <PurchaseIcon width={30} height={30} fill="#c45000" /> Purchase
            </Link>
          </li>
          <li>
            <Link href="/clients">
              <SalesIcon width={30} height={30} fill="#c45000" /> Sales
            </Link>
          </li>
          <li>
            <Link href="/clients">
              <SupplierIcon width={30} height={30} fill="#c45000" /> Suppliers
            </Link>
          </li>
          <li>
            <Link href="/clients">
              <WorkerIcon width={30} height={30} fill="#c45000" /> Workers
            </Link>
          </li>
        </ul>

        <ul className="flex flex-col gap-3 mt-4 ">
          <p className="text-sm text-gray-500">more....</p>
          <li>
            <Link href="/clients">
              <ReportIcon width={25} height={25} fill="#c45000" /> Reports
            </Link>
          </li>
          <li>
            <Link href="/clients">
              <OnlineShopIcon width={25} height={25} fill="#c45000" /> Online
              Shop
            </Link>
          </li>
          <li>
            <Link href="/clients">
              <GearIcon width={25} height={25} fill="#c45000" /> Business
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
