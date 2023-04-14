import { PageProps } from "$fresh/server.ts";
import Profile from "../islands/Profile.tsx";
import Header from "../islands/Header.tsx";
import { Head } from "$fresh/runtime.ts";
import NodeRSA from "https://esm.sh/node-rsa@1.1.1";
import "$dotenv/load.ts";

const privateKeyPEMString = Deno.readTextFileSync(Deno.env.get("KEY_PATH") as string);

const privateKeyPEM = new NodeRSA(privateKeyPEMString);
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
