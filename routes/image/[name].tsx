import { PageProps } from "$fresh/server.ts";
import Image from "../../islands/Image.tsx";
import { Head } from "$fresh/runtime.ts";


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
