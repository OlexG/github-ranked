import { useEffect, useRef, useState } from "preact/hooks";

export default function Image(props: {
  name: string;
}) {
  const [windowLocation, setWindowLocation] = useState<string | undefined>(
    undefined,
  );
  const [image, setImage] = useState<string | undefined>(undefined);
  const pRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    setWindowLocation(window.location.origin);
    async function getImage() {
      const url = `${window.location.origin}/api/generate?name=${props.name}`;
      const response = await fetch(url);
      const blob = await response.blob();
      setImage(URL.createObjectURL(blob));
    }
    getImage();
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
            {image
              ? (
                <img
                  src={image}
                  className="md:w-2/3 w-full"
                />
              )
              : (
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mt-16"></div>
              )}
          </div>
        )}
    </div>
  );
}
