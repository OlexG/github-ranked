import { useState } from "preact/hooks";
import IconHome from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/home.tsx"

export default function Header() {
  const [ username, setUsername ] = useState("");
  function processEnter() {
    if (username.length > 0) {
      window.location.href = `/${username}`;
      setUsername("");
    }
  }
  function processGenerate() {
    if (username.length > 0) {
      window.location.href = `/image/${username}`;
      setUsername("");
    } else {
      // get username from url
      const url = window.location.href;
      const username = url.split("/").pop();
      window.location.href = `/image/${username}`;
    }
  }

  function processGetLink() {
    if (username.length > 0) {
      // new tab
      window.open(`/api/generate?name=${username}`);
    } else {
      // get username from url
      const url = window.location.href;
      const username = url.split("/").pop();
      window.open(`/api/generate?name=${username}`);
    }
  }

  return (
    <div className="py-3 px-2 border-b w-screen flex flex-row items-center text-gray-500 flex-wrap"> 
      <a 
        className="text-gray-500 transition duration-200 ease-in-out hover:text-gray-400 pl-2.5 md:pr-0"
        href="/"
      >
        <IconHome class="w-8 h-8" />
      </a>
      <input 
        type="text" 
        placeholder="username" 
        className="border rounded p-2 ml-4" 
        value={username}
        onInput={(e) => setUsername((e.target as HTMLInputElement).value)}
      />
      <button 
        className="md:w-10 w-full bg-green-400 text-white rounded p-2 mx-4 my-2 md:ml-4 md:mr-0 font-bold transition duration-200 ease-in-out hover:bg-green-500"
        onClick={processEnter}
      >
        GO
      </button>
      <button 
        className="md:w-40 w-full bg-green-400 text-white rounded p-2 mx-4 my-2 md:ml-4 md:mr-0 font-bold transition duration-200 ease-in-out hover:bg-green-500"
        onClick={processGenerate}
      >
        GENERATE IMAGE
      </button>
      <button 
        className="md:w-32 w-full bg-green-400 text-white rounded p-2 mx-4 my-2 md:ml-4 md:mr-0 font-bold transition duration-200 ease-in-out hover:bg-green-500"
        onClick={processGetLink}
      >
        GET LINK
      </button>
    </div>
  );
}