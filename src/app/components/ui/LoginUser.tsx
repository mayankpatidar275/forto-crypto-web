import { usePrivy } from "@privy-io/react-auth";
import { User } from "lucide-react";
import Link from "next/link";
import React from "react";

const LoginUser = () => {
  const { authenticated, login, ready } = usePrivy();
  const disableLogin = !ready || (ready && authenticated);

  return (
    <div className="flex items-center space-x-4">
      {authenticated ? (
        <Link href="/my-profile" className="sm:btn-primary">
          <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center">
            <User />
          </div>
        </Link>
      ) : (
        <div className="flex items-center">
          <button
            disabled={disableLogin}
            onClick={login}
            className="btn-primary"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginUser;
