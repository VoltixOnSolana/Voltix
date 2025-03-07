"use client"

import { signInAction } from "@/app/(auth-pages)/actions/authActions";
import { paths } from "@/paths";
import { Button, Form, Input } from "@/utils/HeroUI";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

export default function Login() {
  const [error, setError] = useState<string | null>(null);

  const [state, formAction, pending] = useActionState(async (prevState: any, formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return { error: "Veuillez remplir tous les champs" };
    }

    const res = await signInAction(formData);
    if (res.error) {
      setError(res.error);
      return { error: res.error };
    }
  }, null);

  return (  
    <Form
      className="w-full h-screen justify-center items-center space-y-4 text-foreground"
      validationBehavior="native"
      action={formAction}
    >
      <h1 className="text-2xl font-medium text-center">Se connecter</h1>
      <div className="flex flex-col gap-4 max-w-lg items-center justify-center">
        <Input       
          endContent={<Mail className="w-5 h-5 text-foreground" />}  
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
          endContent={<Lock className="w-5 h-5 text-foreground" />}
        />
        <div className="flex gap-4">
          <Button className="w-full" color="primary" type="submit" isLoading={pending} isDisabled={pending}>
            {pending ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
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
