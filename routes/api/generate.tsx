import { type Handlers } from "$fresh/server.ts";
import { getContributions } from "./data.ts";
import { renderToString } from "https://esm.sh/v96/preact-render-to-string@5.2.4/X-ZS8q/src/index";
import IconStarFilled from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/star-filled.tsx"
import IconBook2 from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/book-2.tsx"
import IconTrophyFilled from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/trophy-filled.tsx"
import { createCanvas, loadImage } from "https://deno.land/x/canvas/mod.ts";
import * as path from "https://deno.land/std@0.183.0/path/mod.ts";


export const handler: Handlers = {
  async GET(req: Request) {
    const url = new URL(req.url);
    const name = url.searchParams.get("name");
    if (!name) {
      return new Response("Missing name query parameter", { status: 400 });
    }
    const { repos, user } = await getContributions(name);
    const canvas = createCanvas(800, 200 + Math.min(10, repos.length) * 40);

    let family = 'routes/api/OpenSans-Bold.ttf'
    // resolve family to full path
    //const __dirname = new URL('.', import.meta.url).pathname;
    // family = path.resolve(__dirname, '../../data/static/OpenSans_SemiCondensed-Regular.ttf')
    
    // resolve path
    let font = await Deno.readFile(family)
    let font_identifier = new Date().toString()
    canvas.loadFont(font, {
      family: font_identifier
    })

    const ctx = canvas.getContext("2d");
    ctx.font = `24px ${font_identifier}`
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

    ctx.fillStyle = "#3FB883";
    // make font Courier New
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const points = repos.reduce((acc: any, curr: any) => {
      return acc + Math.round(((curr as any).contributions.totalCount * (curr as any).repository.stargazerCount) / Math.max(1, (curr as any).repository.pullRequests.totalCount));
    }, 0);
    ctx.fillText(user.username + '\'s points: ' + points.toString() + ' pts', 40, 65);

    family = 'routes/api/OpenSans-SemiBold.ttf'
    // resolve family to full path
    //const __dirname = new URL('.', import.meta.url).pathname;
    // family = path.resolve(__dirname, '../../data/static/OpenSans_SemiCondensed-Regular.ttf')
    
    // resolve path
    font = await Deno.readFile(family)
    font_identifier = new Date().toString()
    canvas.loadFont(font, {
      family: font_identifier
    })


    // Styling options
    const panelWidth = 800;
    const panelHeight = 200;
    const panelPadding = 28;
    const panelBgColor = "#f9f9f9";
    const textColor = "#000";
    const tableHeaderFontSize = 18;
    const tableRowFontSize = 18;
    const tableHeaderColor = "#000";
    const tableRowColor = "#efefef";
    const tableHeaderBgColor = "#ddd";
    const tableRowBgColor = "#fff";
    const cornerRadius = 10; // Change this to adjust the corner radius

    // Draw the table header
    ctx.fillStyle = tableHeaderBgColor;
    roundRectTop(ctx, panelPadding, panelPadding + panelHeight / 4, panelWidth - panelPadding * 2, tableHeaderFontSize + panelPadding, cornerRadius).fill();
    ctx.fillStyle = tableHeaderColor;
    ctx.font = `${tableHeaderFontSize}px ${font_identifier}`
    ctx.fillText("Rank", panelPadding * 2, panelPadding * 2 + panelHeight / 4 + tableHeaderFontSize - 10);
    ctx.fillText("Name", panelPadding * 5, panelPadding * 2 + panelHeight / 4 + tableHeaderFontSize - 10);
    ctx.fillText("Stars", panelWidth / 2, panelPadding * 2 + panelHeight / 4 + tableHeaderFontSize - 10);
    ctx.fillText("Contributions", panelWidth - panelPadding * 4 - 80, panelPadding * 2 + panelHeight / 4 - 10 + tableHeaderFontSize);

    // Draw the table rows
    let currentRowY = panelPadding * 2 + tableHeaderFontSize + panelHeight / 4;
    const numRows = Math.min(10, repos.length);
    for (let i = 0; i < numRows; i++) {
      const repo = repos[i];
      let rowColor;
      if ((numRows + 1) % 2 === 0) {
        rowColor = i % 2 === 0 ? tableRowColor : tableRowBgColor;
      } else {
        rowColor = i % 2 === 0 ? tableRowBgColor : tableRowColor;
      }
      ctx.fillStyle = rowColor;
      if (i === numRows - 1) {
        roundRect(ctx, panelPadding, currentRowY, panelWidth - panelPadding * 2, tableRowFontSize + panelPadding, cornerRadius).fill();
        ctx.fillRect(panelPadding, currentRowY, panelWidth - panelPadding * 2, panelPadding / 2);
      } else {
        ctx.fillRect(panelPadding, currentRowY, panelWidth - panelPadding * 2, tableRowFontSize + panelPadding);
      }
      family = 'routes/api/OpenSans-SemiBold.ttf'
      font = await Deno.readFile(family)
      font_identifier = new Date().toString()
      canvas.loadFont(font, {
        family: font_identifier
      })
      ctx.fillStyle = textColor;
      ctx.font = `${tableRowFontSize}px ${font_identifier}`;
      ctx.fillStyle = '#3FB883';
      ctx.fillText(`${i + 1}`, panelPadding * 2, currentRowY + tableRowFontSize + panelPadding/2 - 2.5);
      ctx.font = `${tableRowFontSize}px ${font_identifier}`;
      ctx.fillStyle = '#000';
      ctx.fillText(repo.repository.name, panelPadding * 5, currentRowY + tableRowFontSize + panelPadding/2 - 2.5);
      family = 'routes/api/OpenSans-Bold.ttf'
      font = await Deno.readFile(family)
      font_identifier = new Date().toString()
      canvas.loadFont(font, {
        family: font_identifier
      })
      ctx.font = `${tableRowFontSize}px ${font_identifier}`;
      ctx.fillStyle = '#3FB883';
      ctx.fillText(repo.repository.stargazerCount.toString(), panelWidth / 2, currentRowY + tableRowFontSize + panelPadding/2 - 2.5);
      ctx.fillText(repo.contributions.totalCount.toString(), panelWidth - panelPadding * 4, currentRowY + tableRowFontSize + panelPadding/2 - 2.5);
      currentRowY += tableRowFontSize + panelPadding;
    }
    
    function roundRect(ctx: any, x: any, y: any, width: any, height: any, radius: any) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      return ctx;
    };

    function roundRectTop(ctx: any, x: any, y: any, width: any, height: any, radius: any) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height);
      ctx.lineTo(x, y + height);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      return ctx;
    }
    


    const returnImage = canvas.toBuffer();
    return new Response(returnImage, {
      headers: {
        "content-type": "image/png",
        "Cache-Control": "max-age=60",
      },
    });
  }
}