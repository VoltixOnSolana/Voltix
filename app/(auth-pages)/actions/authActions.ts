"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import { paths } from "@/paths";

// Action pour l'inscription d'un nouvel utilisateur
export const signUpAction = async (formData: FormData) => {
  // Récupération des données du formulaire
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const firstname = formData.get("firstname")?.toString();
  const lastname = formData.get("lastname")?.toString();
  const supabase = await createClient(); // Création d'un client Supabase
  const origin = (await headers()).get("origin"); // Récupération de l'origine des headers

  // Vérification que toutes les données requises sont présentes
  if (!email || !password || !firstname || !lastname) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email, password, firstname and lastname are required",
    );
  }

  // Inscription de l'utilisateur via Supabase
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`, // Redirection après vérification de l'email
    },
  });

  // Gestion des erreurs d'inscription
  if (error) {
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    // Création de l'utilisateur dans la base de données Prisma
    await prisma.user.create({
      data: {
        id: data.user?.id,
        username: firstname + lastname + data.user?.id.slice(0, 4),
        email
      }
    });
    return encodedRedirect(
      "success",
      "/sign-up",
      "Merci pour votre inscription ! Veuillez vérifier votre email pour un lien de vérification.",
    );
  }
};

// Action pour la connexion d'un utilisateur
export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  // Connexion de l'utilisateur avec Supabase
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // Gestion des erreurs de connexion
  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  // Redirection vers le compte utilisateur après connexion réussie
  return redirect(paths.userAccount(data.user.id));
};

// Action pour la réinitialisation du mot de passe
export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  // Vérification que l'email est fourni
  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  // Demande de réinitialisation du mot de passe via Supabase
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  // Gestion des erreurs de réinitialisation
  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  // Redirection après demande de réinitialisation
  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

// Action pour la mise à jour du mot de passe
export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Vérification que les mots de passe sont fournis et identiques
  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  // Mise à jour du mot de passe via Supabase
  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  // Gestion des erreurs de mise à jour
  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  // Confirmation de la mise à jour réussie
  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

// Action pour la déconnexion de l'utilisateur
export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut(); // Déconnexion via Supabase
  return redirect("/sign-in"); // Redirection vers la page de connexion
};
