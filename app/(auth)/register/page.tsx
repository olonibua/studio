import Header from "@/components/layout/header";
import RegisterForm from "@/components/forms/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <Header />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-light mb-4 tracking-wide">
            Join MOSÉ
          </h1>
          <p className="text-text-muted font-light">
            Create your account to discover authentic African art
          </p>
        </div>
        
        <RegisterForm />
      </div>
    </div>
  );
} 