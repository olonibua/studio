import { Suspense } from "react";
import Header from "@/components/layout/header";
import RegisterForm from "@/components/forms/register-form";

function RegisterFormWrapper() {
  return <RegisterForm />;
}

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
        
        <Suspense fallback={
          <div className="w-full max-w-md mx-auto">
            <div className="bg-background-secondary border border-neutral-800 rounded-lg p-8">
              <div className="animate-pulse">
                <div className="h-4 bg-background-tertiary rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-4 bg-background-tertiary rounded w-1/2 mx-auto mb-8"></div>
                <div className="space-y-4">
                  <div className="h-10 bg-background-tertiary rounded"></div>
                  <div className="h-10 bg-background-tertiary rounded"></div>
                  <div className="h-10 bg-background-tertiary rounded"></div>
                  <div className="h-10 bg-background-tertiary rounded"></div>
                  <div className="h-10 bg-background-tertiary rounded"></div>
                </div>
              </div>
            </div>
          </div>
        }>
          <RegisterFormWrapper />
        </Suspense>
      </div>
    </div>
  );
} 