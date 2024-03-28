/*import { PageProps } from "$fresh/server.ts";
import Profile from "../islands/Profile.tsx";
import Header from "../islands/Header.tsx";
import { Head } from "$fresh/runtime.ts";

export default function GeneratePage(props: PageProps) {
  const { name } = props.params;
  return (
    <>
      <Head>
        <title>Github Ranked</title>
      </Head>
      <Header />
      <Profile
        name={name}
      />
    </>
  );
}*/
import { PageProps } from "$fresh/server.ts";
import Image from "../islands/Image.tsx";
import { Head } from "$fresh/runtime.ts";
import Header from "../islands/Header.tsx";

export default function GeneratePage(props: PageProps) {
  const { name } = props.params;
  return (
    <>
      <Image
        name={name}
      />
    </>
  );
}

