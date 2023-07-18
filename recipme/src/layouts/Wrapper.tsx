import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export interface WrapperProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  wrapperClasses?: string;
  title?: string;
  className?: string;
}

const Wrapper = ({ children, title }: WrapperProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {};

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <div>
      <Head>
        <title>
          Anthony Key | Software Engineer, Unity Developer Portfolio
        </title>
        <meta
          name="description"
          content="A Software Developer with 6 years of professional experience. Looking for Unity Contract / Permanent opportunities! Get in touch!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>{children}</div>
    </div>
  );
};

export const UnauthenticatedWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Wrapper;
