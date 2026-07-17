import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";

const CAPELL_LOGO = "https://capell.com.br/web-files/img/logo.png";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <img src={CAPELL_LOGO} alt="Capell" className="h-10 w-auto" />
            <p className="text-white/70">
              Transformando a burocracia em oportunidades.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("inicio");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("como-funciona");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Como Funciona
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("beneficios");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Benefícios
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("faq");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>
                  Praça Carlos Gomes, 46 - 9º Andar<br />
                  Centro - São Paulo/SP
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+5511956591211" className="hover:text-white transition-colors">
                  (11) 9 5659-1211
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:contato@capell.com.br" className="hover:text-white transition-colors">
                  contato@capell.com.br
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4">Siga-nos</h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/capellcontabilidade/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/capellcontabilidade/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm">
            <p>© 2026 Capell Contabilidade. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <button className="hover:text-white transition-colors">Política de Privacidade</button>
              <button className="hover:text-white transition-colors">Termos de Serviço</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
