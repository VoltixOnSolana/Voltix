'use server'

import { signInAction } from "@/app/(auth-pages)/actions/authActions";
import { paths } from "@/paths";
import { Button, Form, Input } from "@/utils/HeroUI";
import Link from "next/link";
import { Send, RefreshCcw, Mail } from "lucide-react";

export default async function Login() {
  return (
    <Form
      className="w-full h-screen justify-center items-center space-y-4 text-white"
      validationBehavior="native"
      action={signInAction}
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
        
        />
        <div className="flex gap-4">
          <Button className="w-full" color="primary" type="submit">
            Se connecter
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
