import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const CAPELL_LOGO = "https://capell.com.br/web-files/img/logo.png";
const WHATSAPP_NUMBER = "5511956591211";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const whatsappLink = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=Olá! Gostaria de saber mais sobre a abertura de empresa.`;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-border z-50 shadow-sm">
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src={CAPELL_LOGO}
            alt="Capell Contabilidade"
            className="h-12 w-auto"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("inicio")}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Início
          </button>
          <button
            onClick={() => scrollToSection("como-funciona")}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Como Funciona
          </button>
          <button
            onClick={() => scrollToSection("beneficios")}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Benefícios
          </button>
          <button
            onClick={() => scrollToSection("depoimentos")}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Depoimentos
          </button>
          <button
            onClick={() => scrollToSection("faq")}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            FAQ
          </button>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              Falar com Consultor
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-primary" />
          ) : (
            <Menu className="w-6 h-6 text-primary" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="container py-4 space-y-3">
            <button
              onClick={() => scrollToSection("inicio")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection("como-funciona")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              Como Funciona
            </button>
            <button
              onClick={() => scrollToSection("beneficios")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              Benefícios
            </button>
            <button
              onClick={() => scrollToSection("depoimentos")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              Depoimentos
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              FAQ
            </button>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Falar com Consultor
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
