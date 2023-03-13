import Layout from "@/components/layout";
import HeadAndMetaTag from "@/components/head";
import GlobalContextProvider from "@/context/global";

export default function Home({ cookies, location }) {
  return (
    <>
      <HeadAndMetaTag
        title="Lekhpal Book"
        description="Keep track of all your business activities"
      />
      <GlobalContextProvider cookies={cookies} location={location} salt={salt}>
        <Layout />
        <h2>Home</h2>
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
