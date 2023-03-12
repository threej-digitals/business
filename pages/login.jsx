import Layout from "@/components/layout";
import HeadAndMetaTag from "@/components/head";
import GlobalContextProvider from "@/context/global";
import Button from "@/components/button";

export default function Login({ cookies, location }) {
  if (cookies?.lpbUserId) {
    return (location.href = location.base);
  }

  function MobileNoInput({ id }) {
    return (
      <div className="relative">
        <label
          htmlFor="phone"
          className="absolute -top-3 px-2 left-1 text-sm text-gray-600 bg-white"
        >
          Mobile no
        </label>
        <input
          type="tel"
          name="phone"
          id={id}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 "
          placeholder="91 00000 00000"
          required=""
          onChange={(el) => {
            let phoneErrorMsg = document.getElementById(id + "Error");
            if (!/^\d{11,13}$/.test(el.target.value.replace(/[^\d]/gm, ""))) {
              phoneErrorMsg.innerText = "Invalid number";
              return false;
            } else {
              phoneErrorMsg.innerText = "";
              return true;
            }
          }}
        />
        <p id={id + "Error"} className="text-sm text-red-700"></p>
      </div>
    );
  }
  function LoginForm() {
    return (
      <section className="bg-gray-200 ">
        <div className="flex flex-col gap-5 items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow ">
            <div className="p-6 space-y-10 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-orange-700 md:text-2xl ">
                Sign in to your business account
              </h1>
              <form className="space-y-7" action="#">
                <MobileNoInput id="mobileNo" />
                <div className="relative mt-4">
                  <label
                    htmlFor="password"
                    className="absolute -top-3 px-2 left-1 text-sm text-gray-600 bg-white"
                  >
                    pin / password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 "
                    placeholder="password"
                    required=""
                  />
                </div>
                <Button type="submit" text="Sign In" />
              </form>
            </div>
          </div>
          <div className="w-full bg-white rounded-lg shadow">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className=" text-center text-sm w-full text-gray-400">
                New? / Forgot Password?
              </p>
              <Button
                text="Sign In with WhatsApp"
                className="rounded-full w-full p-2 bg-[#25d366] drop-shadow-md text-white font-bold"
                style={{ textShadow: "0 0px 2px BLACK" }}
                onClick={() => {
                  document.getElementById("whatsappLoginForm").style.top =
                    "50px";
                  setTimeout(() => {
                    window.open(
                      "https://wa.me/+919727782048?text=send%20login%20otp",
                      "_blank"
                    );
                  }, 1000);
                }}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
  function WhatsappLoginForm() {
    return (
      <section
        className="bg-[#00000091] text-center fixed m-auto z-10 w-full h-full transition-all "
        id="whatsappLoginForm"
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow ">
            <div className="p-6 space-y-8 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-orange-700 md:text-2xl ">
                WhatsApp Login
              </h1>
              <form className="space-y-6" action={location.base + "/api/auth"}>
                <MobileNoInput id="WA_mobileNo" />
                <div className="relative">
                  <label
                    htmlFor="otp"
                    className="absolute -top-3 px-2 left-1 text-sm text-gray-500 bg-white"
                  >
                    otp
                  </label>
                  <input
                    type="text"
                    name="otp"
                    id="otp"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 "
                    placeholder="6 digit OTP"
                    required=""
                  />
                </div>
                <Button type="submit" text="Verify" onClick={() => {}} />
                <Button
                  text="Close"
                  className="bg-transparent rounded-full"
                  onClick={() => {
                    document.getElementById("whatsappLoginForm").style.top = "";
                  }}
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <>
      <HeadAndMetaTag
        title="Lekhpal Book"
        description="Keep track of all your business activities"
      />
      <GlobalContextProvider cookies={cookies} location={location}>
        <Layout />
        <LoginForm />
        <WhatsappLoginForm />
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
