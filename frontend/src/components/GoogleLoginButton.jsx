import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../auth/AuthContext";

export default function GoogleLoginButton() {
  const { loginWithGoogle } = useAuth();

  return (
    <GoogleLogin
      onSuccess={({ credential }) => loginWithGoogle(credential)}
      onError={() => alert("Google sign-in failed. Please try again.")}
    />
  );
}
