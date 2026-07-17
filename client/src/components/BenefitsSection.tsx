import { Card } from "@/components/ui/card";
import { Zap, Lock, Users, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function BenefitsSection() {
  const ref = useScrollAnimation();
  const benefits = [
    {
      icon: Zap,
      title: "Agilidade no Processo",
      description: "Reduzimos o tempo de abertura através de processos otimizados e expertise consolidada.",
    },
    {
      icon: Lock,
      title: "Segurança Jurídica e Fiscal",
      description: "Todos os trâmites são realizados conforme legislação vigente, garantindo compliance total.",
    },
    {
      icon: Users,
      title: "Atendimento Personalizado",
      description: "Equipe dedicada que entende seu negócio e oferece soluções customizadas.",
    },
    {
      icon: TrendingUp,
      title: "Redução de Custos",
      description: "Orientamos sobre a melhor estrutura tributária para maximizar seus resultados.",
    },
  ];

  return (
    <section id="beneficios" className="py-20 md:py-28 bg-secondary/10">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-primary mb-4">Chega de dor de cabeça com a burocracia</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Abrir uma empresa no Brasil pode ser um processo complexo e demorado. Com a Capell Contabilidade, você tem um time de especialistas que cuida de tudo.
          </p>
        </div>

        <div ref={ref as any} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const delayClass = index % 5 === 0 ? '' : `scroll-animate-delay-${index % 5}`;
            return (
              <Card
                key={index}
                className={`p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border bg-white scroll-animate ${delayClass}`}
              >
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
