"use client";
import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

type Props = { src: string; label: string; poster?: string; posterAlt?: string };

export function ProjectVideo({ src, label, poster, posterAlt }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="demo-player">
      {playing ? (
        <video src={src} poster={poster} controls autoPlay playsInline preload="none" aria-label={label}>
          <a href={src}>Download demonstration video</a>
        </video>
      ) : (
        <button type="button" className={"video-launch" + (poster ? " has-poster" : "")} onClick={() => setPlaying(true)} aria-label={"Play " + label}>
          {poster && <Image src={poster} alt={posterAlt ?? label} width={320} height={240} preload />}
          <span className="video-overlay"><span className="play-icon"><Play aria-hidden="true" size={22} /></span><span>Watch demonstration<span className="video-label">{label}</span></span></span>
        </button>
      )}
      <figcaption>{label}</figcaption>
    </figure>
  );
}
