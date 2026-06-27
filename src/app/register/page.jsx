"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeSlash, Person, At } from "@gravity-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { signUp,signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // Form States
const [name, setName] = useState("");
const [photoURL, setPhotoURL] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

// UI States
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState("");
const [success, setSuccess] = useState("");

// GOOGLE LOGIN
const handleGoogleSignIn =
  async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };



 const handleRegister = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");
  setIsLoading(true);

  try {
    const { data, error: authError } = await signUp.email({
      name,
      email,
      password,
      image: photoURL,
       role: "user",
        plan: "free",
    });

    if (authError) {
      setError(authError.message || "Registration failed");
      return;
    }

    setSuccess("Account created successfully!");

    setName("");
    setPhotoURL("");
    setEmail("");
    setPassword("");

    router.push("/login");
  } catch (err) {
    setError("Something went wrong");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4 py-20">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-zinc-900/80 p-8 shadow-[0_0_50px_rgba(139,92,246,0.15)] backdrop-blur-xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-4xl font-extrabold text-transparent">
              Create Account
            </h1>

            <p className="mt-3 text-sm text-zinc-400">
              Join Life Lessons and start sharing your experiences.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Full Name
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-800 px-4 transition focus-within:border-violet-500">
                <Person className="text-zinc-400" />

               <input
  type="text"
  required
  placeholder="John Doe"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full bg-transparent py-3 text-white outline-none"
/>
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Photo URL
              </label>

              <input
  type="url"
  required
  placeholder="https://your-image-url.com"
  value={photoURL}
  onChange={(e) => setPhotoURL(e.target.value)}
  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-violet-500"
/>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Email Address
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-800 px-4 transition focus-within:border-violet-500">
                <At className="text-zinc-400" />

               <input
  type="email"
  required
  placeholder="you@example.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full bg-transparent py-3 text-white outline-none"
/>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Password
              </label>

              <div className="flex items-center rounded-xl border border-zinc-700 bg-zinc-800 px-4 transition focus-within:border-violet-500">
                <input
  type={showPassword ? "text" : "password"}
  required
  placeholder="Enter your password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full bg-transparent py-3 text-white outline-none"
/>

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-zinc-400 transition hover:text-white"
                >
                  {showPassword ? <EyeSlash /> : <Eye />}
                </button>
              </div>
            </div>

            {error && (
  <p className="text-center text-sm text-red-500">
    {error}
  </p>
)}

{success && (
  <p className="text-center text-sm text-green-500">
    {success}
  </p>
)}

            {/* Register Button */}
            <button
  type="submit"
  disabled={isLoading}
  className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 py-3 font-semibold text-white transition duration-300 hover:scale-[1.02]"
>
  {isLoading ? "Creating Account..." : "Create Account"}
</button>
            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-zinc-700"></div>
              <span className="text-sm text-zinc-500">OR</span>
              <div className="h-px flex-1 bg-zinc-700"></div>
            </div>

            {/* Google Button */}
            <button
  type="button"
  onClick={
    handleGoogleSignIn
  }
  className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-700 bg-zinc-800 py-3 font-medium text-white transition hover:bg-zinc-700"
>
  <FcGoogle size={22} />
  Continue with Google
</button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-violet-400 transition hover:text-violet-300"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}