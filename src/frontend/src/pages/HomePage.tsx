import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import VideoPlaceholder from "@/components/VideoPlaceholder";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Shield, Sparkles, Zap } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate({ to: "/contact" });
    // Smooth scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const features = [
    {
      icon: Sparkles,
      title: "Висококачествен печат",
      description:
        "Използваме най-съвременните технологии за перфектен резултат",
      color: "text-cwp-yellow",
    },
    {
      icon: Zap,
      title: "Бърза реализация",
      description:
        "Завършваме проектите в кратки срокове без компромис с качеството",
      color: "text-cwp-cyan",
    },
    {
      icon: Shield,
      title: "Гаранция за качество",
      description:
        "Предлагаме пълна гаранция и поддръжка на всички наши проекти",
      color: "text-cwp-magenta",
    },
  ];

  return (
    <div className="w-full">
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cwp-yellow via-cwp-magenta to-cwp-cyan bg-clip-text text-transparent">
                Трансформирайте вашите стени
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Професионален печат на стени с изключително качество. Превърнете
                всяко пространство в произведение на изкуството.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={() => navigate({ to: "/gallery" })}
                  className="bg-gradient-to-r from-cwp-magenta to-cwp-cyan hover:opacity-90 transition-opacity text-white font-semibold"
                >
                  Разгледайте галерията
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate({ to: "/about" })}
                  className="border-cwp-cyan text-cwp-cyan hover:bg-cwp-cyan/10"
                >
                  Научете повече
                </Button>
              </div>
            </div>

            <div
              className="animate-scale-in"
              style={{ animationDelay: "200ms" }}
            >
              <VideoPlaceholder />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Преди и след
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Вижте невероятната трансформация на пространствата с нашия
              професионален печат
            </p>
          </div>

          <div className="max-w-4xl mx-auto animate-scale-in">
            <BeforeAfterSlider
              beforeImage="/assets/изображение 1.png"
              afterImage="/assets/изображение 2.png"
              beforeLabel="Преди"
              afterLabel="След"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Защо да изберете нас?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card border border-border rounded-lg p-6 hover:border-cwp-cyan/50 transition-all duration-300 hover:shadow-lg hover:shadow-cwp-cyan/10 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <feature.icon className={`h-12 w-12 mb-4 ${feature.color}`} />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-cwp-magenta/10 via-background to-cwp-cyan/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Готови да започнете?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Свържете се с нас днес и нека превърнем вашата визия в реалност
            </p>
            <Button
              size="lg"
              onClick={handleContactClick}
              className="bg-gradient-to-r from-cwp-yellow via-cwp-magenta to-cwp-cyan hover:opacity-90 transition-opacity text-white font-semibold"
            >
              Свържете се с нас
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
