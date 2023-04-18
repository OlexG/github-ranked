import Header from "./Header.tsx"

export default function Homepage() {
  return (
    <>
      <div class="w-screen">
        <Header />
      </div>
      <div class="flex flex-col items-center justify-center h-screen absolute top-0 right-0 w-screen -z-50">
        <h1 class="text-6xl font-bold text-gray-500 text-center px-4">Github Ranked</h1>
        <p class="text-lg font-light text-gray-500 text-center px-4">Type a Github username is the searchbox above</p>
        <p className="font-light text-sm text-gray-500 lg:w-80 pt-2 px-4 text-justify">
          Github Ranked is a tool to easily showcase the most impressive contributions of a Github user and rank their account based on these. 
          Using this tool, you can easily tell who is active on Github and what their area of interest is. 
        </p>
      </div>
    </>
  )
}