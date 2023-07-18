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
        <title>Recipeme - Best Recipes Around</title>
        <meta name="description" content="The best recipes around!" />
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
