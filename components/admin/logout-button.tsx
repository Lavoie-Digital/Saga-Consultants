import { logout } from "@/lib/auth-actions";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-stone-500 transition-colors hover:text-ink cursor-pointer"
      >
        Se déconnecter
      </button>
    </form>
  );
}
