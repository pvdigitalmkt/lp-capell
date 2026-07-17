import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useState } from "react";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "João Silva",
      role: "Empreendedor",
      content: "A equipe da Capell tornou o processo de abertura da minha agência incrivelmente simples. Recomendo de olhos fechados!",
      rating: 5,
    },
    {
      name: "Maria Oliveira",
      role: "Sócia-Diretora",
      content: "Profissionalismo e agilidade definem. Estava perdido com a burocracia, mas eles resolveram tudo rapidamente.",
      rating: 5,
    },
    {
      name: "Carlos Santos",
      role: "Diretor de Operações",
      content: "Excelente atendimento! A Capell foi fundamental para o sucesso da nossa empresa desde o início.",
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="depoimentos" className="py-20 md:py-28 bg-secondary/10">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-primary mb-4">Quem confia na Capell</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Confira os depoimentos de clientes que transformaram suas ideias em negócios bem-sucedidos.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-8 bg-white border border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Card className="p-8 bg-white border border-border">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-foreground mb-6 leading-relaxed text-lg">
              "{testimonials[currentIndex].content}"
            </p>
            <div className="mb-6">
              <p className="font-semibold text-foreground text-lg">{testimonials[currentIndex].name}</p>
              <p className="text-muted-foreground">{testimonials[currentIndex].role}</p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={prevTestimonial}
                className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
              >
                ← Anterior
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-primary" : "bg-border"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
              >
                Próximo →
              </button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
