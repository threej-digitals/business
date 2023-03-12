import Head from "next/head";

export default function HeadAndMetaTag({ title, description }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="title" content={title} />
      <base href={process.env.NEXT_PUBLIC_BASE + "/"} />
    </Head>
  );
}
