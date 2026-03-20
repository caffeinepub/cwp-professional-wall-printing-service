import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Target, Users, Workflow } from "lucide-react";

export default function AboutPage() {
  const processSteps = [
    {
      number: "01",
      title: "Консултация",
      description: "Обсъждаме вашата визия и изисквания",
    },
    {
      number: "02",
      title: "Дизайн",
      description: "Създаваме персонализиран дизайн за вашето пространство",
    },
    {
      number: "03",
      title: "Подготовка",
      description: "Подготвяме стените и материалите за печат",
    },
    {
      number: "04",
      title: "Реализация",
      description: "Извършваме професионален печат с най-високо качество",
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Нашата мисия",
      description:
        "Да трансформираме пространствата чрез иновативен печат на стени, създавайки уникални и вдъхновяващи среди за нашите клиенти.",
      color: "text-cwp-yellow",
    },
    {
      icon: Users,
      title: "Нашият екип",
      description:
        "Екип от опитни специалисти с дългогодишен опит в областта на печата и дизайна, посветени на перфектното изпълнение.",
      color: "text-cwp-magenta",
    },
    {
      icon: Award,
      title: "Нашето качество",
      description:
        "Използваме само най-качествени материали и технологии, за да гарантираме дълготрайност и изключителен визуален ефект.",
      color: "text-cwp-cyan",
    },
  ];

  const printingSurfaces = [
    {
      title: "Дърво",
      description:
        "Естествена текстура и топлина, която добавя уют и елегантност към всяко пространство.",
      image: "/assets/generated/wooden-board.dim_600x400.jpg",
      gradient: "from-cwp-yellow/20 to-cwp-magenta/20",
    },
    {
      title: "Стъкло",
      description:
        "Модерен и изчистен вид с възможност за прозрачност и светлинни ефекти.",
      image: "/assets/generated/glass-droplets.dim_600x400.jpg",
      gradient: "from-cwp-magenta/20 to-cwp-cyan/20",
    },
    {
      title: "Метал",
      description:
        "Индустриален стил с висока издръжливост и уникален металически блясък.",
      image: "/assets/generated/aluminum-paint-splashes.dim_600x400.jpg",
      gradient: "from-cwp-cyan/20 to-cwp-blue/20",
    },
    {
      title: "Релеф",
      description:
        "Тридименсионален ефект, който придава дълбочина и характер на стените.",
      image: "/assets/generated/brick-wall-artwork.dim_600x400.jpg",
      gradient: "from-cwp-blue/20 to-cwp-yellow/20",
    },
  ];

  return (
    <div className="w-full">
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5 py-16 md:py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cwp-yellow via-cwp-magenta to-cwp-cyan bg-clip-text text-transparent">
              За нас
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Водещи специалисти в професионалния печат на стени с над 10 години
              опит
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="h-full border-border hover:border-cwp-cyan/50 transition-all duration-300 hover:shadow-lg hover:shadow-cwp-cyan/10">
                  <CardHeader>
                    <value.icon className={`h-12 w-12 mb-4 ${value.color}`} />
                    <CardTitle className="text-2xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Повърхности за печат
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Предлагаме професионален печат върху разнообразни материали, всеки
              с уникални характеристики
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {printingSurfaces.map((surface, index) => (
              <div
                key={surface.title}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="h-full border-border hover:border-cwp-cyan/50 transition-all duration-200 hover:shadow-lg hover:shadow-cwp-cyan/10 overflow-hidden group">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${surface.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10`}
                    />
                    <img
                      src={surface.image}
                      alt={surface.title}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{surface.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {surface.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <Workflow className="h-12 w-12 mx-auto mb-4 text-cwp-cyan" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Нашият процес
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Следваме структуриран подход, за да гарантираме перфектен резултат
              на всеки етап
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="h-full border-border hover:border-cwp-magenta/50 transition-all duration-300">
                  <CardHeader>
                    <div className="text-5xl font-bold bg-gradient-to-br from-cwp-yellow to-cwp-magenta bg-clip-text text-transparent mb-2">
                      {step.number}
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-cwp-magenta to-cwp-cyan" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Защо клиентите ни избират нас?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Комбинацията от опит, качество и индивидуален подход прави CWP
              предпочитан партньор за професионален печат на стени. Всеки проект
              е уникален и получава пълното ни внимание и експертиза.
            </p>
            <div className="grid sm:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-cwp-yellow to-cwp-magenta bg-clip-text text-transparent mb-2">
                  500+
                </div>
                <p className="text-muted-foreground">Завършени проекта</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-cwp-magenta to-cwp-cyan bg-clip-text text-transparent mb-2">
                  10+
                </div>
                <p className="text-muted-foreground">Години опит</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-cwp-cyan to-cwp-blue bg-clip-text text-transparent mb-2">
                  100%
                </div>
                <p className="text-muted-foreground">Доволни клиенти</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
