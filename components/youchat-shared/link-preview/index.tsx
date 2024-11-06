import Image from "next/image";
import { useEffect, useState } from "react";
import img from "public/Rectangle4.png";
import Link from "next/link";

interface Metadata {
  title: string;
  description: string;
  image: string;
}

export default function LinkPreview({ url }: { url: string }) {
  const [metadata, setMetadata] = useState<Metadata | null>(null);

  //   const fetchLinkMetadata = async (url: string) => {
  //     try {
  //       const { result }: any = await ogs({ url });
  //       setMetadata({
  //         title: result.ogTitle,
  //         description: result.ogDescription,
  //         image: result.ogImage.url,
  //       });
  //     } catch (error) {
  //       console.error(error);
  //       null;
  //     }
  //   };
  //   useEffect(() => {
  //     fetchLinkMetadata(url);
  //   }, [url]);

  // Check if metadata?.image is not undefined
  const imageUrl = metadata?.image || img; // Provide a default image

  return (
    <div className="flex flex-col gap-y-1 px-2 text-white font-medium">
      <Link target="_blank" href={url}>
        <div className="flex items-center gap-x-1 p-1 bg-black/80 rounded-md">
          <div>
            <Image alt="img" src={imageUrl} className="size-12 rounded-l-md" />
          </div>
          <div className="text-[0.7rem] leading-[0.8rem]">
            <h2>Mulan - Stroyteller</h2>
            <h3 className="font-normal">Reel by @jenysglow</h3>
            <p>open.spotify.com</p>
          </div>
        </div>
      </Link>
      <Link target="_blank" href={url}>
        <div className="flex items-center gap-x-1 p-1 bg-black/80 rounded-md">
          <div>
            <Image alt="img" src={imageUrl} className="size-12 rounded-l-md" />
          </div>
          <div className="text-[0.7rem] leading-[0.8rem]">
            <h2>Mulan - Stroyteller</h2>
            <h3 className="font-normal">Reel by @jenysglow</h3>
            <p>open.spotify.com</p>
          </div>
        </div>
      </Link>
      <Link target="_blank" href={url}>
        <div className="flex items-center gap-x-1 p-1 bg-black/80 rounded-md">
          <div>
            <Image alt="img" src={imageUrl} className="size-12 rounded-l-md" />
          </div>
          <div className="text-[0.7rem] leading-[0.8rem]">
            <h2>Mulan - Stroyteller</h2>
            <h3 className="font-normal">Reel by @jenysglow</h3>
            <p>open.spotify.com</p>
          </div>
        </div>
      </Link>
      <Link target="_blank" href={url}>
        <div className="flex items-center gap-x-1 p-1 bg-black/80 rounded-md">
          <div>
            <Image alt="img" src={imageUrl} className="size-12 rounded-l-md" />
          </div>
          <div className="text-[0.7rem] leading-[0.8rem]">
            <h2>Mulan - Stroyteller</h2>
            <h3 className="font-normal">Reel by @jenysglow</h3>
            <p>open.spotify.com</p>
          </div>
        </div>
      </Link>
      <Link target="_blank" href={url}>
        <div className="flex items-center gap-x-1 p-1 bg-black/80 rounded-md">
          <div>
            <Image alt="img" src={imageUrl} className="size-12 rounded-l-md" />
          </div>
          <div className="text-[0.7rem] leading-[0.8rem]">
            <h2>Mulan - Stroyteller</h2>
            <h3 className="font-normal">Reel by @jenysglow</h3>
            <p>open.spotify.com</p>
          </div>
        </div>
      </Link>
      
    </div>
  );
}
