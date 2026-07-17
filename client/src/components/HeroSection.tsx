import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HERO_IMAGE = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029034863/WQdTZOAsVEMaQGqs.png";
const WHATSAPP_NUMBER = "5511956591211";

export default function HeroSection() {
  const whatsappLink = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=Olá! Gostaria de abrir minha empresa. Podem me ajudar?`;

  return (
    <section id="inicio" className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-primary leading-tight">
                Abertura de Empresa Rápida, Segura e Sem Burocracia
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Transforme sua ideia em um negócio real. A Capell Contabilidade cuida de toda a parte burocrática para você focar no que realmente importa: o crescimento da sua empresa.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground font-medium">Mais de 50 anos de experiência</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground font-medium">Especialistas em Legalização</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg h-14 px-8"
                >
                  Quero Abrir Minha Empresa Agora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary/5 font-semibold text-lg h-14 px-8"
                onClick={() => {
                  const element = document.getElementById("faq");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Saiba Mais
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden md:block">
            <div className="relative z-10">
              <img
                src={HERO_IMAGE}
                alt="Profissional trabalhando em abertura de empresa"
                className="w-full h-auto rounded-2xl shadow-2xl object-cover"
              />
            </div>
            {/* Decorative Background */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-secondary/30 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
