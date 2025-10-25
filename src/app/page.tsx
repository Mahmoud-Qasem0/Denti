import {
  SignedIn,
  SignedOut,
  SignOutButton,
  SignUpButton,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <>
        <h1>Home Page</h1>
        {/* if user sign out display SignUp Button for him */}
        <SignedOut>
          <SignUpButton mode="modal">Sign Up</SignUpButton>
        </SignedOut>
        {/* if user sign in display SignOut Button for him */}
        <SignedIn>
          <SignOutButton>Log out</SignOutButton>
        </SignedIn>
    </>
  );
}
