import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

// EmailJS credentials
const EMAILJS_PUBLIC_KEY = "wJfN-UcFU52dxGSZA";
const EMAILJS_SERVICE_ID = "service_7a1ndan";
const EMAILJS_TEMPLATE_ID = "template_qw2swq6";

export default function CTASection() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [tipo_empresa, setTipoEmpresa] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !telefone) {
      toast.error("Por favor, preencha seu nome e telefone.");
      return;
    }

    setLoading(true);

    const now = new Date();
    const data_hora = now.toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const templateParams = {
      nome,
      email: email || "Não informado",
      telefone,
      mensagem: empresa ? `Negócio: ${empresa}` : "Não informado",
      tipo_empresa: tipo_empresa || "Não informado",
      data_hora,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setSubmitted(true);
      toast.success("Mensagem enviada! Em breve entraremos em contato.");
      setNome(""); setEmail(""); setTelefone(""); setEmpresa(""); setTipoEmpresa("");
    } catch (err) {
      console.error("EmailJS error:", err);
      toast.error("Erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Dê o primeiro passo para o sucesso do seu negócio
            </h2>
            <p className="text-lg text-primary-foreground/90">
              Preencha o formulário abaixo e um de nossos especialistas entrará em contato em breve.
            </p>
          </div>

          <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm border border-white/10">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Mensagem Recebida!</h3>
                <p className="text-primary-foreground/80 mb-6">
                  Obrigado pelo contato! Nossa equipe entrará em contato em breve para dar início ao processo de abertura da sua empresa.
                </p>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                  onClick={() => setSubmitted(false)}
                >
                  Enviar outra mensagem
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-white font-medium">
                    Seu Nome Completo <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="nome"
                    type="text"
                    placeholder="Ex: João da Silva"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium">
                    Seu E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Ex: joao@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-white font-medium">
                    Seu Telefone / WhatsApp <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="telefone"
                    type="tel"
                    placeholder="Ex: (11) 9 9999-9999"
                    value={telefone}
                    onChange={e => setTelefone(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="empresa" className="text-white font-medium">
                    Nome do Negócio (opcional)
                  </Label>
                  <Input
                    id="empresa"
                    type="text"
                    placeholder="Ex: Minha Empresa Ltda"
                    value={empresa}
                    onChange={e => setEmpresa(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipo_empresa" className="text-white font-medium">
                    Qual é o ramo do seu negócio?
                  </Label>
                  <Textarea
                    id="tipo_empresa"
                    placeholder="Ex: Comércio de roupas, Consultoria de TI, Restaurante..."
                    value={tipo_empresa}
                    onChange={e => setTipoEmpresa(e.target.value)}
                    rows={3}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-primary hover:bg-white/90 font-semibold text-base py-6 mt-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 w-5 h-5" />
                      Solicitar Contato Gratuito
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-white/60">
                  Seus dados estão seguros. Não compartilhamos suas informações com terceiros.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
