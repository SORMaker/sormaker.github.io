import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return <main id="main" className="not-found"><p className="eyebrow">404</p><h1>Page not found</h1><p>The page you requested is not available.</p><Button asChild variant="outline"><Link href="/">Back to home</Link></Button></main>;
}
