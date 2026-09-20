import { type ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
  MapPin,
  Menu,
  MessageCircle,
  MoveRight,
  Shirt,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import logo from '@assets/logo_1789862324726.jpg';
import compactLogo from '@assets/logo_versao02_remover_fundo_branco_1789862324720.jpg';
import storefront from '@assets/Frente_loja_1789862324719.jpg';
import storefrontTwo from '@assets/Frente_02_1789862324718.jpg';
import lookOne from '@assets/foto_01_sem_interface.jpg';
import lookTwo from '@assets/foto_02_sem_interface.jpg';
import lookThree from '@assets/foto_03_sem_interface.jpg';
import lookFour from '@assets/foto_04_sem_interface.jpg';
import lookFive from '@assets/foto_05_sem_interface.jpg';
import lookSix from '@assets/foto_06_sem_interface.jpg';
import lookSeven from '@assets/foto_07_sem_interface.jpg';

const queryClient = new QueryClient();

// Troque apenas este valor quando o número oficial do WhatsApp estiver confirmado.
const WHATSAPP_NUMBER = '5561999999999';
const WHATSAPP_MESSAGE = 'Olá, Kazzo! Quero conhecer as novidades e receber uma ajuda para escolher.';
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const navItems = [
  { label: 'A experiência', href: '#experiencia' },
  { label: 'Curadoria', href: '#curadoria' },
  { label: 'Quem já foi', href: '#avaliacoes' },
  { label: 'Onde estamos', href: '#visite' },
];

const looks = [
  { image: lookOne, alt: 'Mulher usando camisa listrada azul na entrada da Kazzo', label: 'Leveza para todos os dias', className: 'h-[420px] md:h-[570px]' },
  { image: lookTwo, alt: 'Mulher usando blusa vermelha e jeans escuro', label: 'Presença sem esforço', className: 'h-[310px] md:h-[410px]' },
  { image: lookThree, alt: 'Mulher usando colete jeans e camisa branca dentro da loja', label: 'Clássico com personalidade', className: 'h-[360px] md:h-[500px]' },
  { image: lookFour, alt: 'Mulher usando blusa poá e calça jeans ampla na loja', label: 'A peça que muda o look', className: 'h-[300px] md:h-[390px]' },
  { image: lookFive, alt: 'Homem usando camiseta marinho e calça jeans', label: 'Essencial bem escolhido', className: 'h-[340px] md:h-[460px]' },
  { image: lookSix, alt: 'Homem usando camisa jeans e calça jeans', label: 'Textura, proporção, atitude', className: 'h-[390px] md:h-[520px]' },
  { image: lookSeven, alt: 'Homem usando camisa bege e calça preta', label: 'Elegância que fica', className: 'h-[330px] md:h-[430px]' },
];

const benefits = [
  { icon: Sparkles, title: 'Seleção a dedo', text: 'Marcas e peças escolhidas antes de chegar às araras — para você encontrar menos excesso e mais sentido.' },
  { icon: Shirt, title: 'Ajuda no caimento', text: 'A gente conversa sobre ocasião, estilo e proporção para você decidir com segurança.' },
  { icon: Star, title: 'Coleção em movimento', text: 'A vitrine muda com frequência. Sempre tem uma nova combinação para descobrir.' },
  { icon: MessageCircle, title: 'Tudo pelo WhatsApp', text: 'Quer saber se aquela peça ainda está por aqui? Chame antes e a gente confere para você.' },
];

const testimonials = [
  { quote: 'Preço justo e produtos de ótimo gosto!!', name: 'Isaias Souza Santos', initials: 'IS' },
  { quote: 'As roupas uma mais linda que a outra, queria todasss', name: 'Leticia Souza', initials: 'LS' },
  { quote: 'Peças lindas, e de ótima qualidade!', name: 'Angela Gonçalves', initials: 'AG' },
];

const faqs = [
  { question: 'A Kazzo atende homem e mulher?', answer: 'Sim. Trabalhamos com moda masculina e feminina, com peças para estilos casual, elegante ou despojado.' },
  { question: 'Tem entrega ou é só na loja?', answer: 'Esse detalhe ainda está sendo confirmado pela equipe. Chame no WhatsApp e te informamos as opções disponíveis.' },
  { question: 'Como funciona a troca?', answer: 'Nossa política de troca está sendo confirmada. Fale com a equipe antes da compra para receber as condições atualizadas.' },
  { question: 'Quais formas de pagamento vocês aceitam?', answer: 'As formas de pagamento estão sendo confirmadas. A equipe informa tudo direitinho pelo WhatsApp.' },
  { question: 'Preciso agendar para visitar a loja?', answer: 'Não precisa. Mas chamar antes garante que a peça que você quer esteja disponível quando chegar.' },
  { question: 'A loja fica onde exatamente?', answer: 'Guará I, QE 11, próximo à Ae J — fácil de chegar de qualquer ponto do Guará.' },
];

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function WhatsAppButton({ children, className = '', testId = 'button-whatsapp' }: { children: ReactNode; className?: string; testId?: string }) {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-3 rounded-full bg-[#ffce00] px-6 py-3.5 text-sm font-bold text-[#232323] transition-all duration-300 hover:-translate-y-1 hover:bg-[#f6c300] hover:shadow-[0_14px_30px_rgba(255,206,0,.22)] ${className}`}
      data-testid={testId}
    >
      <MessageCircle size={18} strokeWidth={2.5} aria-hidden="true" />
      {children}
      <ArrowUpRight size={17} strokeWidth={2.5} aria-hidden="true" />
    </a>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  useEffect(() => {
    const items = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('in-view')),
      { threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="min-h-[100dvh] overflow-hidden bg-[#f5f1e9]">
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="container-kazzo flex h-[82px] items-center justify-between border-b border-white/20">
          <a href="#top" aria-label="Kazzo Multimarcas, voltar ao início" data-testid="link-logo">
            <img src={logo} alt="Kazzo Multimarcas — For Man and Woman" className="h-[44px] w-[130px] object-cover object-center mix-blend-screen md:h-[50px] md:w-[152px]" />
          </a>
          <nav className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-[.14em] text-white/80 lg:flex" aria-label="Navegação principal">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-[#ffce00]" data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="hidden rounded-full bg-[#ffce00] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[.12em] !text-[#232323] shadow-[0_8px_20px_rgba(255,206,0,.14)] transition-all hover:-translate-y-0.5 hover:bg-[#f6c300] hover:shadow-[0_12px_26px_rgba(255,206,0,.24)] sm:inline-flex" data-testid="link-header-whatsapp" style={{ backgroundColor: '#ffce00', color: '#232323' }}>
              Chamar no WhatsApp
            </a>
            <button type="button" className="inline-flex p-2 text-white lg:hidden" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-menu">
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="absolute inset-x-0 top-[82px] border-b border-white/10 bg-[#232323] px-7 py-6 lg:hidden">
            <nav className="flex flex-col gap-5 text-sm font-semibold uppercase tracking-[.13em] text-white" aria-label="Menu mobile">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={closeMenu} className="border-b border-white/10 pb-4" data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</a>
              ))}
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-1 inline-flex w-fit rounded-full bg-[#ffce00] px-5 py-3 text-xs font-bold text-[#232323]" data-testid="link-mobile-whatsapp">Chamar no WhatsApp</a>
            </nav>
          </div>
        )}
      </header>

      <section id="top" className="relative flex min-h-[760px] items-end bg-[#232323] text-white md:min-h-[840px]">
        <div className="absolute inset-0 overflow-hidden">
          <img src={storefront} alt="Fachada iluminada da loja Kazzo Multimarcas no Guará" className="hero-image h-full w-full object-cover object-[58%_center] opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#232323] via-[#232323]/80 to-[#232323]/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#232323] via-transparent to-[#232323]/70" />
        </div>
        <div className="container-kazzo relative z-10 pb-16 pt-36 md:pb-24">
          <div className="max-w-[740px]">
            <Reveal>
              <p className="eyebrow mb-7 text-[#ffce00]">Guará I · Moda masculina e feminina</p>
            </Reveal>
            <Reveal delay={.1}>
              <h1 className="font-display text-[clamp(3.5rem,8.2vw,7.8rem)] leading-[.91] tracking-[-.055em] text-balance">
                Moda selecionada,<br /><em className="text-[#ffce00]">estilo garantido.</em>
              </h1>
            </Reveal>
            <Reveal delay={.2}>
              <p className="mt-8 max-w-[545px] text-base leading-7 text-white/75 md:text-lg md:leading-8">Peças de marcas selecionadas para homem e mulher, com curadoria e atendimento que fazem a diferença — no Guará, perto de você.</p>
            </Reveal>
            <Reveal delay={.3} className="mt-9 flex flex-wrap items-center gap-5">
              <WhatsAppButton testId="button-hero-whatsapp">Chamar no WhatsApp</WhatsAppButton>
              <a href="#curadoria" className="group inline-flex items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-[#ffce00]" data-testid="link-hero-novidades">
                Ver as novidades da semana <MoveRight size={17} className="transition-transform group-hover:translate-x-1" />
              </a>
            </Reveal>
            <Reveal delay={.4}>
              <p className="mt-5 text-xs text-white/55">Resposta rápida <span className="mx-2 text-[#ffce00]">•</span> Atendimento personalizado</p>
            </Reveal>
          </div>
        </div>
        <a href="#experiencia" className="absolute bottom-7 right-7 z-10 hidden items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-white/60 transition-colors hover:text-[#ffce00] md:flex" data-testid="link-scroll-experience">
          Descubra a experiência <ArrowDown size={14} className="animate-bounce" />
        </a>
      </section>

      <div className="overflow-hidden bg-[#ffce00] py-3.5 text-[#232323]">
        <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap text-[11px] font-bold uppercase tracking-[.21em]">
          {Array.from({ length: 2 }).map((_, index) => (
            <span className="flex items-center gap-8" key={index}>
              <span>Curadoria que entende você</span><span className="text-xl leading-none">/</span>
              <span>Guará, perto de você</span><span className="text-xl leading-none">/</span>
              <span>Novidades para todos os estilos</span><span className="text-xl leading-none">/</span>
            </span>
          ))}
        </div>
      </div>

      <section id="experiencia" className="section-pad bg-[#f5f1e9]">
        <div className="container-kazzo grid gap-14 md:grid-cols-[.9fr_1.1fr] md:items-center md:gap-24">
          <Reveal>
            <p className="eyebrow mb-6 text-[#8c7b51]">Não é só sobre roupa</p>
            <h2 className="font-display max-w-[510px] text-[clamp(2.7rem,5.7vw,5.7rem)] leading-[.96] tracking-[-.055em]">Encontrar roupa bonita é fácil.<br /><em>Encontrar a certa, não.</em></h2>
            <span className="yellow-line my-8" />
            <p className="max-w-[500px] text-base leading-7 text-[#5d5a52]">Encontrar roupa boa, com curadoria de verdade e alguém que te ajuda a escolher, é outra história. A Kazzo nasceu para resolver isso.</p>
          </Reveal>
          <Reveal delay={.15} className="relative">
            <div className="image-mask ml-auto aspect-[4/5] max-w-[490px] bg-[#d9d0bf]">
              <img src={storefrontTwo} alt="Entrada da Kazzo com uma cliente em frente à vitrine" className="object-cover object-[center_35%]" />
            </div>
            <div className="absolute -bottom-7 -left-3 max-w-[260px] bg-[#232323] p-6 text-white md:-left-12">
              <p className="font-display text-2xl leading-tight">“Atendimento que entende o que combina com você.”</p>
              <p className="mt-4 text-[10px] uppercase tracking-[.16em] text-[#ffce00]">A diferença Kazzo</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="curadoria" className="section-pad bg-[#232323] text-white">
        <div className="container-kazzo">
          <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-6 text-[#ffce00]">O olhar por trás da arara</p>
              <h2 className="font-display max-w-[680px] text-[clamp(2.8rem,6vw,6.2rem)] leading-[.94] tracking-[-.055em]">Peças escolhidas<br /><em className="text-[#ffce00]">a dedo.</em></h2>
            </div>
            <p className="max-w-[320px] text-sm leading-6 text-white/60">Cada item entra pensando em quem vai vestir — não em lotar araras. Para o casual, o elegante e o despojado.</p>
          </Reveal>
          <div className="mt-16 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Reveal key={benefit.title} delay={index * .08} className="border-t border-white/20 pt-5">
                  <Icon size={22} strokeWidth={1.5} className="text-[#ffce00]" aria-hidden="true" />
                  <h3 className="mt-8 font-display text-2xl">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/55">{benefit.text}</p>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-20 grid grid-cols-2 gap-3 md:grid-cols-4">
            {looks.map((look, index) => (
              <Reveal key={look.label} delay={index * .06} className={`${index === 0 ? 'col-span-2 row-span-2' : ''} ${index === 2 ? 'md:col-start-2' : ''}`}>
                <figure className="group">
                  <div className={`image-mask relative ${look.className} bg-[#45423c]`}>
                    <img src={look.image} alt={look.alt} className="object-cover object-[center_42%]" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#232323]/80 to-transparent px-4 pb-4 pt-16">
                      <figcaption className="text-sm font-medium text-white">{look.label}</figcaption>
                    </div>
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#e8dfd0]">
        <div className="container-kazzo grid gap-14 md:grid-cols-[1fr_.8fr] md:items-center">
          <Reveal className="order-2 md:order-1">
            <p className="eyebrow mb-6 text-[#8c7b51]">Uma curadoria que continua no atendimento</p>
            <h2 className="font-display text-[clamp(2.8rem,5.5vw,5.5rem)] leading-[.96] tracking-[-.055em]">Roupa boa,<br /><em>atendimento<br />melhor ainda.</em></h2>
            <p className="mt-8 max-w-[510px] text-base leading-7 text-[#5d5a52]">A gente entende a ocasião, o estilo e o que realmente cai bem — ao invés de deixar você sozinho na prateleira.</p>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="group mt-9 inline-flex items-center gap-3 border-b-2 border-[#232323] pb-2 text-sm font-bold transition-colors hover:border-[#ffce00] hover:text-[#8d7100]" data-testid="link-mid-whatsapp">
              Converse com a nossa equipe <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </Reveal>
          <Reveal delay={.15} className="order-1 md:order-2">
            <div className="image-mask relative aspect-[4/5] max-w-[470px] md:ml-auto">
              <img src={lookThree} alt="Cliente experimentando um look jeans dentro da Kazzo" className="object-cover object-center" />
              <div className="absolute right-4 top-4 bg-[#ffce00] px-4 py-3 text-center text-[#232323]">
                <p className="font-display text-3xl leading-none">01</p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[.14em]">olhar</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="avaliacoes" className="section-pad bg-[#ffce00]">
        <div className="container-kazzo">
          <Reveal className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-6 text-[#6a5600]">Quem já viveu a experiência</p>
              <h2 className="font-display max-w-[680px] text-[clamp(2.8rem,6vw,6.3rem)] leading-[.94] tracking-[-.055em]">+5 mil avaliações<br /><em>não mentem.</em></h2>
            </div>
            <div className="flex items-center gap-3" data-testid="text-google-rating">
              <div className="flex gap-1 text-[#232323]" aria-label="5 estrelas"><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /></div>
              <span className="text-sm font-bold">5.011 avaliações no Google</span>
            </div>
          </Reveal>
          <div className="mt-16 grid gap-3 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * .1}>
                <article className="flex min-h-[280px] flex-col justify-between bg-[#f5f1e9] p-7 text-[#232323] transition-transform duration-300 hover:-translate-y-2 md:p-9" data-testid={`card-testimonial-${index}`}>
                  <div>
                    <div className="flex gap-1 text-[#b09100]" aria-hidden="true"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
                    <p className="mt-9 font-display text-[1.65rem] leading-[1.15]">“{testimonial.quote}”</p>
                  </div>
                  <div className="mt-8 flex items-center gap-3 border-t border-[#232323]/10 pt-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#232323] text-xs font-bold text-[#ffce00]" aria-hidden="true">{testimonial.initials}</span>
                    <span className="text-xs font-bold">{testimonial.name}</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-[#232323]/20 pt-7 md:flex-row md:items-center">
            <p className="max-w-[500px] text-sm leading-6">A próxima peça que fecha seu look pode já estar na loja. Confirme antes de sair de casa.</p>
            <WhatsAppButton testId="button-reviews-whatsapp">Quero falar com a Kazzo</WhatsAppButton>
          </Reveal>
        </div>
      </section>

      <section id="visite" className="section-pad bg-[#f5f1e9]">
        <div className="container-kazzo grid gap-12 md:grid-cols-[1.1fr_.9fr] md:items-end">
          <Reveal>
            <div className="image-mask relative aspect-[16/10]">
              <img src={storefront} alt="Fachada da Kazzo Multimarcas no Guará I" className="object-cover object-center" />
              <div className="absolute bottom-5 left-5 bg-[#ffce00] p-5 text-[#232323] md:bottom-7 md:left-7">
                <MapPin size={20} strokeWidth={1.7} />
                <p className="mt-3 max-w-[170px] font-display text-2xl leading-tight">Perto de você.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={.12}>
            <p className="eyebrow mb-6 text-[#8c7b51]">Venha olhar de perto</p>
            <h2 className="font-display text-[clamp(2.8rem,5.5vw,5.4rem)] leading-[.95] tracking-[-.055em]">Um endereço fixo.<br /><em>Uma vitrine viva.</em></h2>
            <p className="mt-7 max-w-[420px] text-base leading-7 text-[#5d5a52]">Guará I, QE 11, próximo à Ae J. Não precisa agendar — mas chama antes para a gente separar o que você quer ver.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <WhatsAppButton testId="button-location-whatsapp">Confirmar uma peça</WhatsAppButton>
              <a href="https://www.google.com/maps/search/?api=1&query=Kazzo+Multimarcas+Guará+DF" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#232323]/25 px-5 py-3.5 text-sm font-bold transition-colors hover:border-[#232323] hover:bg-[#232323] hover:text-[#f5f1e9]" data-testid="link-maps">
                Ver no mapa <ArrowUpRight size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#232323] py-8 text-white">
        <div className="container-kazzo flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <p className="text-sm text-white/70">Coleção nova chega direto na Kazzo — quem não acompanha, perde peça especial.</p>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-[#ffce00] transition-colors hover:text-white" data-testid="link-collection-whatsapp">Avise-me das novidades <ArrowUpRight size={16} /></a>
        </div>
      </section>

      <section className="section-pad bg-[#e8dfd0]">
        <div className="container-kazzo grid gap-12 md:grid-cols-[.75fr_1.25fr]">
          <Reveal>
            <p className="eyebrow mb-6 text-[#8c7b51]">Perguntas honestas</p>
            <h2 className="font-display text-[clamp(2.8rem,5vw,5rem)] leading-[.96] tracking-[-.05em]">Antes de<br /><em>vir conhecer.</em></h2>
            <p className="mt-7 max-w-[330px] text-sm leading-6 text-[#5d5a52]">O que ainda está sendo confirmado, a gente fala. O que já sabe, responde sem rodeio.</p>
          </Reveal>
          <Reveal delay={.12}>
            <div className="border-t border-[#232323]/20">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div key={faq.question} className="border-b border-[#232323]/20" data-testid={`faq-item-${index}`}>
                    <button type="button" className="flex w-full items-center justify-between gap-5 py-5 text-left text-sm font-bold md:py-6" onClick={() => setActiveFaq(isOpen ? null : index)} aria-expanded={isOpen} data-testid={`button-faq-${index}`}>
                      <span>{faq.question}</span>
                      <ChevronDown size={19} className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                    <div className={`faq-panel ${isOpen ? 'open' : ''}`}><div><p className="pb-6 pr-8 text-sm leading-6 text-[#5d5a52]">{faq.answer}</p></div></div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#232323] py-28 text-white md:py-40">
        <div className="absolute -right-12 -top-20 opacity-[.07] md:right-20"><img src={compactLogo} alt="" className="h-[370px] w-[370px] rounded-full grayscale" /></div>
        <div className="container-kazzo relative z-10 text-center">
          <Reveal>
            <p className="eyebrow mb-8 text-[#ffce00]">Seu próximo look pode estar aqui</p>
            <h2 className="mx-auto max-w-[880px] font-display text-[clamp(3.3rem,8vw,8rem)] leading-[.88] tracking-[-.06em]">Curadoria de moda.<br /><em className="text-[#ffce00]">Atendimento de verdade.</em></h2>
            <p className="mx-auto mt-8 max-w-[490px] text-base leading-7 text-white/60">Mais de 5 mil pessoas já confiaram na Kazzo. A próxima peça que vai fechar seu look pode estar te esperando.</p>
            <WhatsAppButton className="mt-9 whatsapp-pulse px-8 py-4" testId="button-final-whatsapp">Chamar no WhatsApp agora</WhatsAppButton>
            <p className="mt-5 text-xs text-white/45">Resposta rápida <span className="mx-2 text-[#ffce00]">•</span> Atendimento personalizado</p>
          </Reveal>
        </div>
      </section>

      <footer className="bg-[#161616] py-12 text-white">
        <div className="container-kazzo flex flex-col gap-9 md:flex-row md:items-end md:justify-between">
          <div>
            <img src={logo} alt="Kazzo Multimarcas" className="h-[47px] w-[144px] object-cover object-center mix-blend-screen" />
            <p className="mt-5 max-w-[280px] text-xs leading-5 text-white/45">Moda selecionada para homem e mulher, com atendimento que faz diferença no Guará.</p>
          </div>
          <div className="flex flex-col gap-3 text-sm text-white/60 md:items-end">
            <p>Guará I, QE 11 · Próximo à Ae J</p>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="font-bold text-[#ffce00] hover:text-white" data-testid="link-footer-whatsapp">Falar com a Kazzo no WhatsApp <ArrowUpRight size={14} className="ml-1 inline" /></a>
            <p className="mt-5 text-[10px] uppercase tracking-[.15em] text-white/25">© {new Date().getFullYear()} Kazzo Multimarcas</p>
          </div>
        </div>
      </footer>

      <a href={whatsappUrl} target="_blank" rel="noreferrer" className="whatsapp-pulse fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#ffce00] text-[#232323] transition-transform hover:scale-110 md:bottom-7 md:right-7" aria-label="Chamar Kazzo no WhatsApp" data-testid="button-floating-whatsapp">
        <MessageCircle size={23} strokeWidth={2.2} aria-hidden="true" />
      </a>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;