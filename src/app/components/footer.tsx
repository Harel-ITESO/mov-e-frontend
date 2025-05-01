import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
        <div className="flex flex-col gap-2">
          <Link href="/about">About</Link>
          <Link href="/news">News</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/support">Support</Link>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/help">Help</Link>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/apps">Apps</Link>
          <Link href="/developers">Developers</Link>
          <Link href="/api">API</Link>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs">© {new Date().getFullYear()} MovE, Inc.</p>
          <p>Made with ❤️ inspired by Letterboxd</p>
        </div>
      </div>
    </footer>
  );
}