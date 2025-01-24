import { signInAction } from "@/app/(auth-pages)/actions/authActions";
import { Button } from "@/utils/HeroUI";
import Link from "next/link";

export default async function Login() {
  return (
    <form className="flex-1 flex flex-col min-w-64 w-full h-screen">
      <h1 className="text-2xl font-medium">Connexion</h1>
      <p className="text-sm text-foreground">
        Vous n'avez pas de compte ?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Créer un compte
        </Link>
      </p>
      <Button>Connexion</Button>
    </form>
  );
}
