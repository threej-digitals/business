import Layout from "@/components/layout";
import Meta from "@/components/head";
import GlobalContextProvider from "@/context/global";
import ClientRecord from "@/records/client";
import Head from "next/head";
import HeadAndMetaTag from "@/components/head";

export default function Clients({ cookies, location }) {
  return (
    <>
      <HeadAndMetaTag title="My clients" />
      <GlobalContextProvider cookies={cookies} location={location}>
        <Layout />
        <ClientRecord />
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
        href: ctx.req.headers.host + process.env.BASE + ctx.resolvedUrl,
      },
    },
  };
};
