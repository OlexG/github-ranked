import Header from "./Header.tsx"

export default function Homepage() {
  return (
    <>
      <div class="w-screen">
        <Header />
      </div>
      <div class="flex flex-col items-center justify-center h-screen absolute top-0 right-0 w-screen -z-50">
        <div class="lg:w-128 flex flex-col items-center justify-center">
          <h1 class="text-6xl font-bold text-gray-500 px-4 text-center">Github Ranked</h1>
          <p class="text-lg font-light text-gray-500 px-4 text-center">Type a Github username is the searchbox above</p>
          <p className="font-light text-sm text-gray-500 pt-2 px-4 text-justify lg:w-96">
            Github Ranked is a tool to easily showcase the most impressive contributions of a Github user. 
            Using this tool, you can easily tell who is active on Github and what their area of interest is. 
          </p>
        </div>
      </div>
    </>
  )
}