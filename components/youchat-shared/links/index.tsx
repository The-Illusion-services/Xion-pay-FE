import useLinkPreview from "@/hooks/useLinkPreiew";
import Link from "next/link";

const LinkPreview = ({ text }: any) => {
  const { data: preview } = useLinkPreview(text);

  if (!preview) return null;

  return (
    <Link target="_blank" href={`${preview.url} `}>
      <div className="bg-brown-dark rounded-md flex no-underline">
        <div className="w-[6rem]">
          <img
            src={preview.image}
            alt={preview.title}
            className="object-cover w-24 h-[4.5rem] rounded-l-md"
          />
        </div>
        <div className="px-2 py-1">
          <h2 className="font-medium text-sm truncate no-underline">
            {preview.title}
          </h2>
          <p>{preview.description}</p>
          {/* <p>{preview.url}</p> */}
        </div>
      </div>
    </Link>
  );
};

export default LinkPreview;
