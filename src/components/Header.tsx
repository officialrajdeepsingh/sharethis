import Link from "next/link";

export function Header() {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <span className="ml-3 text-xl">Share This</span>
        </Link>
        
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link target="_blank" href="/api/feed" className="mr-5 hover:text-gray-900">RSS</Link>
          <Link target="_blank" href="/api/jsonfeed" className="mr-5 hover:text-gray-900">JSON RSS</Link>
          <Link target="_blank" href="/api/jsontoxml" className="mr-5 hover:text-gray-900">XML</Link>
        </nav>

      </div>
    </header>
  );
}
