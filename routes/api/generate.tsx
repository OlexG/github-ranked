import { type Handlers } from "$fresh/server.ts";
import { getContributions } from "./data.ts";
import { renderToString } from "https://esm.sh/v96/preact-render-to-string@5.2.4/X-ZS8q/src/index";
import IconStarFilled from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/star-filled.tsx"
import IconBook2 from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/book-2.tsx"
import IconTrophyFilled from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/trophy-filled.tsx"
import { createCanvas, loadImage } from "https://deno.land/x/canvas/mod.ts";




export const handler: Handlers = {
  async GET(req: Request) {
    const url = new URL(req.url);
    const name = url.searchParams.get("name");
    if (!name) {
      return new Response("Missing name query parameter", { status: 400 });
    }
    const { repos, user } = await getContributions(name);
    const image = await loadImage(user.avatarUrl);
    const canvas = createCanvas(800, 200 + Math.min(10, repos.length) * 40);
    const ctx = canvas.getContext("2d");
    // make background white
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    /*// draw a rectangle with padding and a rounded border
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 1;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);*/

    ctx.fillStyle = "#888";
    // make font Courier New
    ctx.font = "22px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const points = repos.reduce((acc: any, curr: any) => {
      return acc + ((curr as any).contributions.totalCount * (curr as any).repository.stargazerCount)
    }, 0);
    ctx.fillText(user.username + ': ' + points.toString() + ' pts', 40, 70);

    


    // Styling options
    const panelWidth = 800;
    const panelHeight = 200;
    const panelPadding = 28;
    const panelBgColor = "#f9f9f9";
    const textColor = "#333";
    const tableHeaderFontSize = 16;
    const tableRowFontSize = 14;
    const tableHeaderColor = "#666";
    const tableRowColor = "#ccc";
    const tableHeaderBgColor = "#f2f2f2";
    const tableRowBgColor = "#fff";

    // Draw the table header
    ctx.fillStyle = tableHeaderBgColor;
    ctx.fillRect(panelPadding, panelPadding + panelHeight / 4, panelWidth - panelPadding * 2, tableHeaderFontSize + panelPadding);
    ctx.fillStyle = tableHeaderColor;
    ctx.font = `${tableHeaderFontSize}px Arial`;
    ctx.fillText("Rank", panelPadding * 2, panelPadding * 2 + panelHeight / 4 + tableHeaderFontSize - 10);
    ctx.fillText("Name", panelPadding * 5, panelPadding * 2 + panelHeight / 4 + tableHeaderFontSize - 10);
    ctx.fillText("Stars", panelWidth / 2, panelPadding * 2 + panelHeight / 4 + tableHeaderFontSize - 10);
    ctx.fillText("Contributions", panelWidth - panelPadding * 4 - 80, panelPadding * 2 + panelHeight / 4 - 10 + tableHeaderFontSize);

    // Draw the table rows
    let currentRowY = panelPadding * 3 + tableHeaderFontSize + panelHeight / 4;
    const numRows = Math.min(10, repos.length);
    for (let i = 0; i < numRows; i++) {
      const repo = repos[i];
      const rowColor = i % 2 === 0 ? tableRowColor : tableRowBgColor;
      ctx.fillStyle = rowColor;
      ctx.fillRect(panelPadding, currentRowY, panelWidth - panelPadding * 2, tableRowFontSize + panelPadding);
      ctx.fillStyle = textColor;
      ctx.font = `${tableRowFontSize}px Arial`;
      ctx.fillText(`${i + 1}`, panelPadding * 2, currentRowY + tableRowFontSize + panelPadding/2 - 5);
      ctx.fillText(repo.repository.name, panelPadding * 5, currentRowY + tableRowFontSize + panelPadding/2 - 5);
      ctx.fillText(repo.repository.stargazerCount.toString(), panelWidth / 2, currentRowY + tableRowFontSize + panelPadding/2 - 5);
      ctx.fillText(repo.contributions.totalCount.toString(), panelWidth - panelPadding * 4, currentRowY + tableRowFontSize + panelPadding/2 - 5);
      currentRowY += tableRowFontSize + panelPadding;
    }
    

    const returnImage = canvas.toBuffer();
    return new Response(returnImage, {
      headers: {
        "content-type": "image/png",
      },
    });
  }
}