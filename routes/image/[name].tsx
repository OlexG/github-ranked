import { PageProps } from "$fresh/server.ts";
import Image from "../../islands/Image.tsx";
import { Head } from "$fresh/runtime.ts";
import Header from "../../islands/Header.tsx";

export default function GeneratePage(props: PageProps) {
  const { name } = props.params;
  return (
    <>
      <Header />
      <Image
        name={name}
      />
    </>
  );
}
