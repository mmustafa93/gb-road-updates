import Link from "next/link";
import Logo from "@/components/Logo";

type NavbarProps = {
  user: any;
  authLoading: boolean;
  signingOut: boolean;
  onSignOut: () => void;
};

export default function Navbar({
  user,
  authLoading,
  signingOut,
  onSignOut,
}: NavbarProps) {
  return (
    <header className="w-full border-b border-gray-100 bg-white">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex items-start justify-between gap-4">
          {/* LEFT: Logo + subtitle */}
          <div className="flex flex-col">
            <Logo />
            <p className="mt-1 text-[12px] text-gray-600">
              Powered by community reports
            </p>
          </div>

          {/* RIGHT: Auth actions */}
          <div className="flex items-center">
            {authLoading ? (
              <p className="text-sm text-gray-500 font-medium">
                Loading…
              </p>
            ) : signingOut ? (
              <p className="text-sm text-gray-500 font-medium">
                Signing out…
              </p>
            ) : user ? (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <p className="text-sm text-gray-700 font-medium hidden sm:block">
                  Hello{" "}
                  <span className="font-semibold">
                    {user.user_metadata?.full_name || "there"}
                  </span>
                  !
                </p>

                <Link
                  href="/report"
                  className="
                    text-sm font-medium
                    px-3 py-2
                    rounded-md
                    bg-blue-600 text-white
                    hover:bg-blue-700 transition
                    whitespace-nowrap
                  "
                >
                  My Reports
                </Link>

                <button
                  onClick={onSignOut}
                  className="
                    text-sm
                    px-3 py-2
                    rounded-md
                    border border-gray-300
                    text-gray-700
                    hover:bg-gray-100 transition
                    whitespace-nowrap
                  "
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="
                  text-sm font-medium
                  px-3 py-2
                  rounded-md
                  border border-gray-300
                  text-[#1a1a1a]
                  hover:bg-gray-100 transition
                  whitespace-nowrap
                "
              >
                Sign in / Sign up
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}