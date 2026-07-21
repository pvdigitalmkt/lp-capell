import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5511956591211";

// Extend Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export default function WhatsAppButton() {
  const handleClick = () => {
    // Push GTM event clique_whatsapp to dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "clique_whatsapp",
      whatsapp_origem: "botao_flutuante",
    });

    const message = "Olá! Gostaria de saber mais sobre abertura de empresa.";
    const whatsappLink = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      title="Fale conosco no WhatsApp"
      aria-label="Abrir WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute right-16 bg-green-600 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Fale conosco!
      </span>
    </button>
  );
}
