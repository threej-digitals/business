import { BusinessContext } from "@/context/businessContext";
import { GlobalContext } from "@/context/global";
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
import { useContext } from "react";
import Button from "./button";

export default function Sidebar() {
  const { cookies } = useContext(GlobalContext);
  const business = useContext(BusinessContext);

  function Profile() {
    if (cookies.lpbBID) {
      //Business profile button
      return (
        <div>
          <Link
            href="/settings"
            className="flex gap-4 bg-gray-200 p-1 rounded-full items-center"
          >
            <span className=" rounded-full p-2 shadow-md bg-gradient-to-br from-red-300 to-orange-500">
              <OnlineShopIcon width={25} height={25} />
            </span>
            <p className="loggedBusiness flex justify-between w-full text-lg relative">
              {business.detail.NAME || business.detail.MOBILENO}
            </p>
          </Link>
          <Link href="/">
            <Button
              className="mt-4 border-orange-500 border-2 text-center w-full rounded-full p-1 text-orange-600 font-semibold bg-[#fb5b0017]"
              text="Logout "
              onClick={() => {
                Cookies.remove("lpbBID");
              }}
            />
          </Link>
        </div>
      );
    } else {
      //login button
      return (
        <Link href="/login" style={{ padding: "0", background: "transparent" }}>
          <Button text="Sign In / Log In" />
        </Link>
      );
    }
  }
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
        {/* footer */}
        <div className="mt-10">
          <p className="text-gray-500 text-sm text-center">
            A product by{" "}
            <Link href="https://bento.me/jitendra" target="_blank">
              ThreeJ
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
