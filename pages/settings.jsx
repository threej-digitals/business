import Layout from "@/components/layout";
import HeadAndMetaTag from "@/components/head";
import GlobalContextProvider from "@/context/global";
import { BusinessContext } from "@/context/businessContext";
import { useContext } from "react";
import Button from "@/components/button";

function GeneralSettings() {
  const business = useContext(BusinessContext);

  return (
    <form
      className="flex flex-col items-center p-3 gap-6"
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new URLSearchParams();
        for (const pair of new FormData(e.target)) {
          data.append(pair[0], pair[1]);
        }
        data.delete("logo");
        data.append("logo", document.querySelector("form img").src);

        fetch("api/business", {
          method: "POST",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            if (!data.ok) {
              console.error(data);
            }
            alert(data.message);
          });
        return false;
      }}
    >
      <p className="mt-3 text-gray-400 text-lg">Update Business Profile</p>
      <section className="my-3">
        <img
          src={"img/uploads/" + business.detail.LOGO}
          alt="Click to add your Business Logo"
          className=" cursor-pointer w-[120px] h-[120px] rounded-lg shadow-xl text-sm text-gray-600 text-center"
          onClick={() => {
            document.querySelector("input#logo").click();
          }}
        />
        <input
          type="file"
          name="logo"
          id="logo"
          className="hidden"
          accept=".jpg,.png,.jpeg"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const reader = new FileReader();
              reader.readAsDataURL(e.target.files[0]);
              reader.onload = () => {
                document.querySelector("form img").src = reader.result;
              };
            }
          }}
        />
      </section>
      <section className="flex w-full">
        <label
          className="self-center w-1/3 text-right px-2"
          htmlFor="businessName"
        >
          name
        </label>
        <input
          type="text"
          name="businessName"
          id="businessName"
          defaultValue={business.detail.BNAME || ""}
          placeholder="eg: lekhpal Book"
          className=" border-b-2 border-orange-500 p-1"
        />
      </section>
      <section className="flex w-full">
        <label className="self-center w-1/3 text-right px-2" htmlFor="address">
          address
        </label>
        <input
          type="address"
          name="address"
          id="address"
          defaultValue={business.detail.ADDRESS || ""}
          className=" border-b-2 border-orange-500 p-1"
        />
      </section>
      <section className="flex w-full">
        <label className="self-center w-1/3 text-right px-2" htmlFor="phone">
          phone
        </label>
        <input
          type="text"
          name="phone"
          defaultValue={business.detail.MOBILENO}
          className=" border-b-2 border-orange-500 p-1"
          disabled
        />
      </section>
      <section className="flex w-full">
        <label className="self-center w-1/3 text-right px-2" htmlFor="gstin">
          GSTIN
        </label>
        <input
          type="text"
          name="gstin"
          id="gstin"
          placeholder="TAX ID"
          defaultValue={business.detail.GSTIN}
          className=" border-b-2 border-orange-500 p-1"
        />
      </section>
      <section className="flex w-full">
        <label className="self-center w-1/3 text-right px-2" htmlFor="password">
          password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="********"
          className=" border-b-2 border-orange-500 p-1"
        />
      </section>
      <hr />
      <Button type="submit" text="Save Profile" />
    </form>
  );
}

export default function Settings({ cookies, location }) {
  return (
    <>
      <HeadAndMetaTag title="Business settings" />
      <GlobalContextProvider cookies={cookies} location={location}>
        <Layout />
        {/* general settings */}
        <GeneralSettings />
      </GlobalContextProvider>
    </>
  );
}

export const getServerSideProps = (ctx) => {
  return {
    props: {
      cookies: ctx.req.cookies,
      location: {
        base: process.env.NEXT_PUBLIC_BASE,
        host: ctx.req.headers.host,
        href:
          ctx.req.headers.host + process.env.NEXT_PUBLIC_BASE + ctx.resolvedUrl,
      },
    },
  };
};
