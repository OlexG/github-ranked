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
  return (
    <div className="py-3 px-2 border-b w-screen flex flex-row items-center text-gray-500"> 
      <button className="text-gray-500 transition duration-200 ease-in-out hover:text-gray-400">
        <IconHome class="w-8 h-8" />
      </button>
      <input 
        type="text" 
        placeholder="username" 
        className="border rounded p-2 ml-4" 
        value={username}
        onInput={(e) => setUsername((e.target as HTMLInputElement).value)}
      />
      <button 
        className="bg-green-400 text-white rounded p-2 ml-4 font-bold transition duration-200 ease-in-out hover:bg-green-500"
        onClick={processEnter}
      >
        GO
      </button>
    </div>
  );
}