const PROCESS_IMAGE = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029034863/CCdHEMvBPkKegAVP.png";

export default function ProcessSection() {
  const steps = [
    {
      number: 1,
      title: "Reunião de Alinhamento",
      description: "Entendemos seu modelo de negócio e definimos o melhor formato jurídico e tributário.",
    },
    {
      number: 2,
      title: "Coleta de Documentos",
      description: "Orientamos sobre toda a documentação necessária de forma clara e objetiva.",
    },
    {
      number: 3,
      title: "Processo de Legalização",
      description: "Nossa equipe cuida de todos os trâmites na Junta Comercial, Receita Federal e Prefeitura.",
    },
    {
      number: 4,
      title: "Empresa Aberta!",
      description: "Você recebe seu CNPJ, Alvará e está pronto para faturar.",
    },
  ];

  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-primary mb-4">Como abrir sua empresa em 4 passos simples</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Um processo claro, direto e eficiente do início ao fim.
          </p>
        </div>

        {/* Desktop View - Image */}
        <div className="hidden lg:block mb-16">
          <img
            src={PROCESS_IMAGE}
            alt="Processo de abertura de empresa em 4 passos"
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </div>

        {/* Mobile/Tablet View - Cards */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-secondary/10 rounded-xl p-6 border border-secondary/20 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Steps Below Image */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
