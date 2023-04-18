import { Head } from "$fresh/runtime.ts";
import Homepage from "../islands/Homepage.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Github Ranked</title>
      </Head>
      <Homepage />
    </>
  );
}
