import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="bg-white">
      <div className="flex items-center justify-center min-h-screen">
        <main className="px-8 py-8 sm:px-12 lg:px-16 lg:py-12">
          <div className="max-w-xl lg:max-w-3xl">
            <SignUp />
          </div>
        </main>
      </div>
    </section>
  );
}