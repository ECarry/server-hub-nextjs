import RegisterForm from "@/modules/auth/components/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

const LoginPage = () => {
  return <RegisterForm />;
};

export default LoginPage;
