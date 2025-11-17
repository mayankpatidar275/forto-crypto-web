"use client";

// import { useUserLogin } from "@/custom-hooks/useUserLogin";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { User } from "lucide-react";
import Link from "next/link";

const LoginUser = () => {
  // const { isLoaded } = useUser();
  // const { login } = useUserLogin();

  // Remove the useEffect - the hook now handles authentication automatically

  return (
    <div className="flex items-center space-x-4">
      <SignedIn>
        <Link href="/my-profile" className="sm:btn-primary">
          <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center">
            <User />
          </div>
        </Link>
      </SignedIn>
      <SignedOut>
        <SignUpButton>
          <div className="flex items-center">
            <div
              // onClick={() => login()}
              className="btn-primary"
              // disabled={!isLoaded}
            >
              Sign In
            </div>
          </div>
        </SignUpButton>
      </SignedOut>
    </div>
  );
};

export default LoginUser;
