import NodeRSA from "https://esm.sh/node-rsa@1.1.1";
import { HandlerContext } from "$fresh/server.ts";
import { App } from "https://cdn.skypack.dev/@octokit/app";
import { mergeCommitContributionsWithOthers, sortCommitContributions } from "../../utils/parsing.ts"
import "$dotenv/load.ts";

const appID=Deno.env.get("APP_ID") as string
const installationID=Deno.env.get("INSTALLATION_ID") as string

let privateKeyPEMString = Deno.env.get("KEY") as string;
// remove the " characters if they are there
privateKeyPEMString = privateKeyPEMString.replace(/"/g, "");
// turn the \n into actual newlines
privateKeyPEMString = privateKeyPEMString.replace(/\\n/g, "\n");

const privateKeyPEM = new NodeRSA(privateKeyPEMString, "pkcs1");
const privateKeyPkcs8 = privateKeyPEM.exportKey("pkcs8-private-pem");

export async function getContributions(username: string) {
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
                databaseId,
                url,
                pullRequests {
                  totalCount
                }
              },
              contributions {
                totalCount
              }
            }
            pullRequestReviewContributionsByRepository {
              repository {
                name,
                stargazerCount,
                databaseId,
                url,
                pullRequests {
                  totalCount
                }
              },
              contributions {
                totalCount
              }
            }
            issueContributionsByRepository {
              repository {
                name,
                stargazerCount,
                databaseId,
                url,
                pullRequests {
                  totalCount
                }
              },
              contributions {
                totalCount
              }
            }
            pullRequestContributionsByRepository {
              repository {
                name,
                stargazerCount,
                databaseId,
                url,
                pullRequests {
                  totalCount
                }
              },
              contributions {
                totalCount
              }
            }
          }
        }
        
      }`

  const app = new App({
    appId: appID,
    privateKey: privateKeyPkcs8,
  });

  const octokit = await app.getInstallationOctokit(installationID);

  try {
    let res = await octokit.graphql(body);
    res = mergeCommitContributionsWithOthers(res);
    res = sortCommitContributions(res);
    console.log(res.user.contributionsCollection.commitContributionsByRepository);
    return {
      repos: res.user.contributionsCollection.commitContributionsByRepository,
      user: {
        username: username,
        email: res.user.email,
        bio: res.user.bio,
        avatarUrl: res.user.avatarUrl
      }
    }
  } catch (e) {
    console.log(e)
    return {
      repos: [],
      user: {
        username: username,
        email: "",
        bio: "",
        avatarUrl: ""
      }
    }
  }
}

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const url = new URL(_req.url);
  const username = url.searchParams.get("username");
  if (!username) {
    return new Response("No username provided", {
      status: 400,
    });
  }
  const { repos, user } = await getContributions(username);
  return new Response(JSON.stringify({ repos, user }), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
};
