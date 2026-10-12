import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "var(--bg-primary)" }}
    >
      <p
        className="font-mono text-sm mb-4"
        style={{ color: "var(--accent-primary)" }}
      >
        404
      </p>
      <h1
        className="text-3xl font-bold mb-3"
        style={{ color: "var(--text-primary)" }}
      >
        Page Not Found
      </h1>
      <p
        className="text-sm mb-8 max-w-md"
        style={{ color: "var(--text-secondary)" }}
      >
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 text-sm font-medium rounded-[var(--radius-md)] transition-all"
        style={{
          background: "var(--accent-primary)",
          color: "#ffffff",
        }}
      >
        Go Home
      </Link>
    </div>
  );
}
