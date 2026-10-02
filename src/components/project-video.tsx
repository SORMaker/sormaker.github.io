"use client";
import { useState } from "react";
import { Play } from "lucide-react";

export function ProjectVideo({ src, label }: { src: string; label: string }) {
  const [playing, setPlaying] = useState(false);
  return <figure className="demo-player">{playing ? <video src={src} controls autoPlay playsInline preload="none" aria-label={label}><a href={src}>Download demonstration video</a></video> : <button type="button" className="video-launch" onClick={() => setPlaying(true)} aria-label={"Play " + label}><span className="play-icon"><Play aria-hidden="true" size={22} /></span><span>Watch demonstration<span className="video-label">{label}</span></span></button>}<figcaption>{label}. A recorded rollout, not an aggregate evaluation.</figcaption></figure>;
}
