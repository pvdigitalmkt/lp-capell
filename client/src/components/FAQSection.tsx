import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const faqs = [
    {
      question: "Quanto tempo demora para abrir uma empresa?",
      answer: "O prazo pode variar de acordo com o município e a atividade, mas com nossa expertise, o processo é otimizado para ser o mais rápido possível. Em média, conseguimos abrir uma empresa em 5 a 15 dias úteis.",
    },
    {
      question: "Quais documentos eu preciso?",
      answer: "Basicamente RG, CPF, comprovante de residência e IPTU do local onde a empresa será instalada. Nossa equipe orienta sobre detalhes específicos conforme seu tipo de atividade e estrutura jurídica.",
    },
    {
      question: "Qual o custo para abrir uma empresa?",
      answer: "Os custos envolvem taxas governamentais (Junta Comercial, Receita Federal, Prefeitura) e nossos honorários. Fale com um consultor para um orçamento personalizado e transparente.",
    },
    {
      question: "Qual é a melhor estrutura jurídica para meu negócio?",
      answer: "Depende do seu modelo de negócio, faturamento esperado e número de sócios. Podemos ser MEI, PJ, Sociedade Limitada ou Sociedade Anônima. Nossa equipe analisa seu caso e recomenda a melhor opção.",
    },
    {
      question: "Vocês oferecem suporte após a abertura?",
      answer: "Sim! Oferecemos suporte completo em contabilidade, fiscal, pessoal e legal. Realizamos visitas semanais para orientação e assessoria contínua.",
    },
    {
      question: "Como funciona o atendimento?",
      answer: "Você pode nos contatar via WhatsApp, telefone ou email. Agendamos uma reunião inicial para entender suas necessidades e apresentar a melhor solução.",
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-primary mb-4">Dúvidas Frequentes</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Encontre respostas para as perguntas mais comuns sobre abertura de empresa.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 data-[state=open]:bg-secondary/10 transition-colors"
              >
                <AccordionTrigger className="hover:no-underline py-4 text-left">
                  <span className="text-lg font-semibold text-foreground">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 pt-0">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
