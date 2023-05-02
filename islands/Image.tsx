import { useEffect, useRef, useState } from "preact/hooks";
import IconStarFilled from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/star-filled.tsx";
import IconBook2 from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/book-2.tsx";
import IconTrophyFilled from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/trophy-filled.tsx";
import html2canvas from "https://esm.sh/html2canvas@1.4.1";

export default function Image(props: {
  name: string;
}) {
  const [windowLocation, setWindowLocation] = useState<string | undefined>(
    undefined,
  );
  const pRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    setWindowLocation(window.location.origin);
  }, []);

  function copyText() {
    navigator.clipboard.writeText(
      `<img src="${windowLocation}/api/generate?name=${props.name}" width="600">`,
    );
  }
  return (
    <div>
      {windowLocation && props.name &&
        (
          <div className="flex flex-col items-center justify-center font-light p-5">
            <p ref={pRef}>
              Paste this into your profile's readme (width is editable)
            </p>
            <p className="border-2 rounded-lg p-2 m-1">
              {`<img src="${windowLocation}/api/generate?name=${props.name}" width="600">`}
            </p>
            <button className="underline text-lg" onClick={() => copyText()}>
              Copy Link
            </button>
            <img
              src={`${windowLocation}/api/generate?name=${props.name}`}
              className="md:w-2/3 w-full"
            />
          </div>
        )}
    </div>
  );
}
