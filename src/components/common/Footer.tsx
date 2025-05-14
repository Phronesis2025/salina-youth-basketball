import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-primary text-text py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Branding */}
          <div>
            <Image
              src="/images/WCS Logo-transparentBG.png"
              alt="WCS Basketball Logo"
              width={150}
              height={40}
              className="object-contain mb-4"
            />
            <p className="font-montserrat text-sm">
              Salina Youth Basketball Club &copy; 2025
            </p>
          </div>

          {/* Newsletter Signup (Placeholder) */}
          <div>
            <h3 className="font-bebas text-lg mb-4">Stay Updated</h3>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="font-montserrat text-sm px-4 py-2 rounded bg-white text-black"
              />
              <button
                type="submit"
                className="bg-[#D91E18] text-white font-bebas px-4 py-2 rounded hover:bg-[#D91E18]/80"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bebas text-lg mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="font-montserrat text-sm hover:text-[#D91E18]"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="font-montserrat text-sm hover:text-[#D91E18]"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
