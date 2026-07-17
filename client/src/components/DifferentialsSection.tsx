import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const SUCCESS_IMAGE = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029034863/LDXGsXQLxDHxriwL.png";

export default function DifferentialsSection() {
  const differentials = [
    "Departamento Contábil especializado em gestão financeira",
    "Departamento Fiscal com expertise em obrigações tributárias",
    "Departamento Legal focado em constituição e regularização",
    "Departamento Pessoal para gestão de folha de pagamento",
    "Atendimento personalizado com visitas semanais",
    "Tecnologia inovadora como prestação de serviço",
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="hidden md:block">
            <img
              src={SUCCESS_IMAGE}
              alt="Empreendedor bem-sucedido"
              className="w-full h-auto rounded-2xl shadow-2xl object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-primary">O parceiro ideal para o seu negócio</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Não somos apenas contadores, somos parceiros estratégicos. Oferecemos suporte completo com nossos Departamentos Contábil, Fiscal, Pessoal e Legal.
              </p>
            </div>

            {/* Differentials List */}
            <div className="space-y-3">
              {differentials.map((differential, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground font-medium">{differential}</p>
                </div>
              ))}
            </div>

            {/* Quote */}
            <Card className="bg-secondary/10 border border-secondary/20 p-6">
              <p className="text-foreground italic">
                "Utilizamos a tecnologia como uma prestação de serviço inovador de contabilidade ao nosso cliente."
              </p>
              <p className="text-sm text-muted-foreground mt-3">— Capell Contabilidade</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
