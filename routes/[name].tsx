import { PageProps } from "$fresh/server.ts";
import Profile from "../islands/Profile.tsx";
import Header from "../islands/Header.tsx";
import { Head } from "$fresh/runtime.ts";
import NodeRSA from "https://esm.sh/node-rsa@1.1.1";
import "$dotenv/load.ts";

let privateKeyPEMString = Deno.env.get("KEY") as string;
// remove the " characters if they are there
privateKeyPEMString = privateKeyPEMString.replace(/"/g, "");
// turn the \n into actual newlines
privateKeyPEMString = privateKeyPEMString.replace(/\\n/g, "\n");
console.log(privateKeyPEMString);

const privateKeyPEM = new NodeRSA(privateKeyPEMString, "pkcs1");
const privateKeyPkcs8 = privateKeyPEM.exportKey("pkcs8-private-pem");

export default function GeneratePage(props: PageProps) {
  const { name } = props.params;
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <Header />
      <Profile 
        name={name} 
        privateKeyPkcs8={privateKeyPkcs8}
        appID={Deno.env.get("APP_ID") as string}
        installationID={Deno.env.get("INSTALLATION_ID") as string}
      />
    </>
  );
}
