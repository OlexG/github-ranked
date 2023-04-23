import { useEffect, useState, useRef } from "preact/hooks";
import IconStarFilled from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/star-filled.tsx"
import IconBook2 from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/book-2.tsx"
import IconTrophyFilled from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/trophy-filled.tsx"
import html2canvas from "https://esm.sh/html2canvas@1.4.1";

export default function Image(props: {
  name: string;
}) {
  const [ repos, setRepos ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    username: "",
    email: "",
    bio: "",
    avatarUrl: ""
  });

  useEffect(() => {
    const handleDownloadImage = async () => {
      const element = printRef.current as HTMLElement;
      const canvas = await html2canvas(element, {
        useCORS: true
      });
  
      const data = canvas.toDataURL('image/jpg');
      (imageRef.current as HTMLImageElement).src = data;
      // show imageRef and hide printRef
      imageRef.current?.classList.remove('hidden');
      printRef.current?.classList.add('hidden');
    };
    setLoading(true);
    fetch(`/api/data?username=${props.name}`)
      .then(res => res.json())
      .then(data => {
        setRepos(data.repos);
        setUser(data.user);
        setLoading(false);
        setTimeout(() => {
          handleDownloadImage();
        }, 0);
      }
    );
  }, [props.name]);
  const printRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  return (
  <>
    <div className="w-200">
      <div ref={printRef} className='w-full p-1'>
        <div className="w-full border p-6 rounded shadow">
          <p className="text-lg font-light px-3 flex flex-row items-center gap-2">
            {
              loading ?
                <div className="animate-pulse w-24 h-4 rounded bg-gray-300"></div>
              :
              <>
                <span className="">{user.username}:</span>
                <span className="text-yellow-400 font-bold">{
                  repos.reduce((acc, curr) => {
                    return acc + ((curr as any).contributions.totalCount * (curr as any).repository.stargazerCount)
                  }, 0)
                } pts</span>
              </>
            }
            
          </p>
          {
            loading ?
              <div className="animate-pulse w-48 h-4 rounded bg-gray-300 m-3"></div>
              :
              <p className="text-lg font-extralight px-3 pb-3"><span>{user.username}</span>'s top 10 repositories</p>
          }{
            loading ?
              <div className="animate-pulse w-full h-4 rounded bg-gray-300 m-3"></div>
              :
              <table class="table-auto min-w-full border text-left text-sm font-light">
                <thead className="bg-gray-100">
                  <tr className="border-b">
                    <th className="font-bold p-4 text-green-400">Name</th>
                    <th className="font-bold p-4 border-l text-yellow-400 flex flex-row gap-1 items-center">Stars</th>
                    <th className="font-bold p-4 border-l text-purple-500">Contributions</th>
                  </tr>
                </thead>
                <tbody>
                  {repos.filter((_, i) => i < 10).map((repo: any) => {
                    return <tr className="border-b">
                      <td className="font-bold p-4 text-green-400"><div className="flex flex-row gap-1 items-center"><IconBook2 class="w-4 h-4" /> <span className="pb-4 leading-3">{repo.repository.name}</span></div></td>
                      <td className="font-bold p-4 border-l text-yellow-400 flex flex-row gap-1 items-center"><span className="pb-4 leading-3">{repo.repository.stargazerCount}</span> <IconStarFilled class="w-4 h-4" /></td>
                      <td className="font-bold p-4 border-l text-purple-500"><div className="flex flex-row gap-1 items-center"><IconTrophyFilled class="w-4 h-4" /><span className="pb-4 leading-3">{repo.contributions.totalCount}</span></div></td>
                    </tr>
                  })}
                </tbody>
              </table>
          }
        </div>
      </div>
    </div>
    <img ref={imageRef} src="" className="hidden" />
  </>
  );
}
