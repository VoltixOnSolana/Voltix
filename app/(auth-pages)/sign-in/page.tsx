"use client"

import { signInAction } from "@/app/(auth-pages)/actions/authActions";
import { paths } from "@/paths";
import { Button, Form, Input } from "@/utils/HeroUI";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { useActionState } from "react";

export default function Login() {

  const [state, formAction, pending] = useActionState(async (prevState: any, formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
      return { error: "Veuillez remplir tous les champs" };
    }

    return await signInAction(formData);
  }, null);

  return (  
    <Form
      className="w-full h-screen justify-center items-center space-y-4 text-white"
      validationBehavior="native"
      action={formAction}
    >
      <h1 className="text-2xl font-medium text-center">Se connecter</h1>
      <div className="flex flex-col gap-4 max-w-lg items-center justify-center">
        <Input       
          endContent={<Mail className="w-5 h-5" />}  
          isRequired
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Entrez votre email"
          type="email"
        />
        <Input
          isRequired
          label="Mot de passe"
          labelPlacement="outside"
          name="password"
          placeholder="Entrez votre mot de passe"
          type="password"
          endContent={<Lock className="w-5 h-5" />}
        />
        <div className="flex gap-4">
          <Button className="w-full" color="primary" type="submit" isLoading={pending} isDisabled={pending}>
            {pending ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </div>
        <p className="text-sm text-foreground">
          Vous n'avez pas de compte ?{" "}
          <Link className="text-foreground font-medium underline" href={paths.signUp()}>
            S'inscrire
          </Link>
        </p>
      </div>
    </Form>
  );
}
