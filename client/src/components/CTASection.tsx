import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

export default function CTASection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone) {
      toast.error("Por favor, preencha seu nome e telefone.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/email/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, company, businessType }),
      });

      if (response.ok) {
        setSubmitted(true);
        toast.success("Mensagem enviada! Em breve entraremos em contato.");
        setName(""); setEmail(""); setPhone(""); setCompany(""); setBusinessType("");
      } else {
        const data = await response.json();
        toast.error(data.error || "Erro ao enviar. Tente novamente.");
      }
    } catch (err) {
      toast.error("Erro de conexão. Verifique sua internet e tente novamente.");
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
                  <Label htmlFor="name" className="text-white font-medium">
                    Seu Nome Completo <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ex: João da Silva"
                    value={name}
                    onChange={e => setName(e.target.value)}
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
                  <Label htmlFor="phone" className="text-white font-medium">
                    Seu Telefone / WhatsApp <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Ex: (11) 9 9999-9999"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-white font-medium">
                    Nome do Negócio (opcional)
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Ex: Minha Empresa Ltda"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType" className="text-white font-medium">
                    Qual é o ramo do seu negócio?
                  </Label>
                  <Textarea
                    id="businessType"
                    placeholder="Ex: Comércio de roupas, Consultoria de TI, Restaurante..."
                    value={businessType}
                    onChange={e => setBusinessType(e.target.value)}
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
