import { App } from "https://cdn.skypack.dev/@octokit/app";
import { useEffect, useState } from "preact/hooks";
import IconStarFilled from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/star-filled.tsx"
import IconBook2 from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/book-2.tsx"
import IconTrophyFilled from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/trophy-filled.tsx"
import { mergeCommitContributionsWithOthers, sortCommitContributions } from "../utils/parsing.ts"

export default function Profile(props: {
  name: string;
  privateKeyPkcs8: string;
  appID: string;
  installationID: string;
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
    async function getContributions(username: string) {
      const body = `query { 
            user(login: "${username}") {
              email
              avatarUrl
              bio
              contributionsCollection(from: "2023-01-01T00:00:00Z", to: "${new Date().toISOString()}") {
                commitContributionsByRepository {
                  repository {
                    name, 
                    stargazerCount,
                    databaseId
                  },
                  contributions {
                    totalCount
                  }
                }
                pullRequestReviewContributionsByRepository {
                  repository {
                    name,
                    stargazerCount,
                    databaseId
                  },
                  contributions {
                    totalCount
                  }
                }
                issueContributionsByRepository {
                  repository {
                    name,
                    stargazerCount,
                    databaseId
                  },
                  contributions {
                    totalCount
                  }
                }
                pullRequestContributionsByRepository {
                  repository {
                    name,
                    stargazerCount,
                    databaseId
                  },
                  contributions {
                    totalCount
                  }
                }
              }
            }
            
          }`
    
      const app = new App({
        appId: props.appID,
        privateKey: props.privateKeyPkcs8,
      });
    
      const octokit = await app.getInstallationOctokit(props.installationID);
    
      try {
        let res = await octokit.graphql(body);
        res = mergeCommitContributionsWithOthers(res);
        res = sortCommitContributions(res);
        setRepos(res.user.contributionsCollection.commitContributionsByRepository);
        setUser({
          username: props.name,
          email: res.user.email,
          bio: res.user.bio,
          avatarUrl: res.user.avatarUrl
        });
        setLoading(false);
      } catch (e) {
        console.log(e)
      }
    }
    if (props.name) {
      getContributions(props.name);
    }
  }, [props.name]);
  
  return <div>
    <div className="p-4 flex flex-row gap-4 mx-auto justify-center">
      <div className="w-1/2 border p-6 rounded shadow">
        <div className="flex flex-row gap-4">
          {
            loading ? 
              <div className="animate-pulse w-24 h-24 rounded-full bg-gray-300"></div> 
              : <img src={user.avatarUrl} className="w-24 h-24 rounded-full shadow-lg"/>
          }
          <div className="flex flex-col justify-center">
            <p className="text-lg font-light flex flex-row items-center gap-2">
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
                <div className="animate-pulse w-48 h-8 rounded bg-gray-300 mt-4"></div>
                :
                <p className="text-lg font-extralight">{user.bio}</p>
            }
          </div>
        </div>
        {
          loading ?
            <div className="animate-pulse w-48 h-4 rounded bg-gray-300 m-3"></div>
            :
            <p className="text-lg font-extralight p-3"><span>{user.username}</span>'s top 10 repositories</p>
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
                    <td className="font-bold p-4 text-green-400"><div className="flex flex-row gap-1 items-center"><IconBook2 class="w-4 h-4" /> {repo.repository.name}</div></td>
                    <td className="font-bold p-4 border-l text-yellow-400 flex flex-row gap-1 items-center">{repo.repository.stargazerCount} <IconStarFilled class="w-4 h-4" /></td>
                    <td className="font-bold p-4 border-l text-purple-500"><div className="flex flex-row gap-1 items-center"><IconTrophyFilled class="w-4 h-4" />{repo.contributions.totalCount}</div></td>
                  </tr>
                })}
              </tbody>
            </table>
        }
      </div>
    </div>
  </div>;
}
