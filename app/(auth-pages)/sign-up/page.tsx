"use client";

import { signUpAction } from "@/app/(auth-pages)/actions/authActions";
import { paths } from "@/paths";
import { Form, Input, Button } from "@/utils/HeroUI";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function Signup() {
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const error = searchParams.get("error");
  const emailFromUrl = searchParams.get("email");


  useEffect(() => {
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, [emailFromUrl]);

  useEffect(() => {
    if (error) {
      setLoading(false)
    }
  }, [error]);

    

  const getPasswordError = (value: string) => {
    if (value.length < 8) {
      return "Votre mot de passe doit contenir au moins 8 caractères  ";
    }
    if ((value.match(/[A-Z]/g) || []).length < 1) {
      return "Votre mot de passe doit contenir au moins 1 lettre majuscule";
    }
    if ((value.match(/[^a-z]/gi) || []).length < 1) {
      return "Votre mot de passe doit contenir au moins 1 symbole";
    }

    return null;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    const passwordError = getPasswordError(data.password as string);

    if (passwordError) {
      setErrors({ password: passwordError });
      return;
    }

    setErrors({});
    setLoading(true);
    await signUpAction(new FormData(e.currentTarget));
  };

  if (success) {
    return <div className="h-screen text-center"><p className="w-12vh">Merci pour votre inscription ! Veuillez vérifier votre email vous avez reçu un lien de vérification.</p></div>;
  }

  return (
    <Form
      className="w-full h-screen justify-center items-center space-y-4 text-white"
      validationBehavior="native"
      validationErrors={errors}
      onSubmit={onSubmit}
    >
      <h1 className="text-2xl font-medium text-center">Créer un compte</h1>
      <div className="flex flex-col gap-4 max-w-lg items-center justify-center">
        <div className="flex flex-row gap-4 items-center">
          <Input
            isRequired
            errorMessage={({ validationDetails }) => {
              if (validationDetails.valueMissing) {
                return "Veuillez entrer votre prénom";
              }

              return errors.firstname;
            }}
            label="Prénom"
            labelPlacement="outside"
            name="firstname"
            placeholder="Entrez votre prénom"
          />
                   <Input
            isRequired
            errorMessage={({ validationDetails }) => {
              if (validationDetails.valueMissing) {
                return "Veuillez entrer votre nom";
              }

              return errors.name;
            }}
            label="Nom"
            labelPlacement="outside"
            name="lastname"
            placeholder="Entrez votre nom"
          />
        </div>
        <Input
          isRequired
          value={email}
          errorMessage={({ validationDetails }) => {
            if (validationDetails.valueMissing) {
              return "Veuillez entrer votre email";
            }
            if (validationDetails.typeMismatch) {
              return "Veuillez entrer un email valide";
            }
          }}
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Entrez votre email"
          type="email"
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          isRequired
          errorMessage={getPasswordError(password)}
          isInvalid={getPasswordError(password) !== null}
          label="Mot de passe"
          labelPlacement="outside"
          name="password"
          placeholder="Entrez votre mot de passe"
          type="password"
          value={password}
          onValueChange={setPassword}
        />
        <div className="flex gap-4">
          <Button className="w-full" color="primary" type="submit" isLoading={loading}>
            S'inscrire
          </Button>
        </div>
        <p className="text-sm text-foreground">
          Vous avez déjà un compte ?{" "}
          <Link className="text-foreground font-medium underline" href={paths.signIn()}>
            Connexion
          </Link>
        </p>
        {error && <p>Une erreur est survenue lors de l'inscription</p>}
      </div>
    </Form>
  );
}

