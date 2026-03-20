import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle, Frame, Palette, Square, Triangle, Type } from "lucide-react";
import { useState } from "react";

export default function ToolsPage() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const colorElements = [
    {
      id: "primary",
      title: "Основен цвят",
      icon: Circle,
      color: "bg-cwp-yellow",
      description: "Жълт - енергия и оптимизъм",
    },
    {
      id: "secondary",
      title: "Вторичен цвят",
      icon: Square,
      color: "bg-cwp-magenta",
      description: "Магента - креативност и страст",
    },
    {
      id: "accent",
      title: "Акцентен цвят",
      icon: Triangle,
      color: "bg-cwp-cyan",
      description: "Циан - спокойствие и професионализъм",
    },
    {
      id: "highlight",
      title: "Подчертаване",
      icon: Palette,
      color: "bg-cwp-blue",
      description: "Синьо - доверие и стабилност",
    },
  ];

  const designElements = [
    {
      id: "border",
      title: "Граници",
      icon: Frame,
      demo: (
        <div className="w-full h-24 border-4 border-cwp-cyan rounded-lg flex items-center justify-center">
          <span className="text-sm text-muted-foreground">Граница с циан</span>
        </div>
      ),
    },
    {
      id: "background",
      title: "Фон",
      icon: Square,
      demo: (
        <div className="w-full h-24 bg-gradient-to-r from-cwp-magenta/20 to-cwp-cyan/20 rounded-lg flex items-center justify-center">
          <span className="text-sm">Градиентен фон</span>
        </div>
      ),
    },
    {
      id: "text",
      title: "Текст",
      icon: Type,
      demo: (
        <div className="w-full h-24 flex flex-col items-center justify-center space-y-2">
          <span className="text-cwp-yellow font-bold">Жълт текст</span>
          <span className="text-cwp-magenta font-bold">Магента текст</span>
          <span className="text-cwp-cyan font-bold">Циан текст</span>
        </div>
      ),
    },
  ];

  const buttonStates = [
    { id: "default", label: "Нормално", state: "default" },
    { id: "hover", label: "При посочване", state: "hover" },
    { id: "active", label: "Активно", state: "active" },
  ];

  return (
    <div className="w-full">
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5 py-16 md:py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cwp-yellow via-cwp-magenta to-cwp-cyan bg-clip-text text-transparent">
              Дизайн инструменти
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Визуални елементи и цветова палитра на нашата дизайн система
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4 text-center">
              Състояния на бутони
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Интерактивни бутони с видими hover ефекти
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {buttonStates.map((buttonState, index) => (
              <div
                key={buttonState.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {buttonState.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <Button
                      className={`bg-gradient-to-r from-cwp-magenta to-cwp-cyan text-white font-semibold transition-all duration-300 ${
                        buttonState.state === "hover" ||
                        hoveredButton === buttonState.id
                          ? "opacity-90 scale-105 shadow-lg shadow-cwp-cyan/30"
                          : buttonState.state === "active"
                            ? "opacity-80 scale-95"
                            : ""
                      }`}
                      onMouseEnter={() => setHoveredButton(buttonState.id)}
                      onMouseLeave={() => setHoveredButton(null)}
                    >
                      Примерен бутон
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4 text-center">
              Цветова палитра
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Основните цветове на нашата марка
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {colorElements.map((element, index) => (
              <div
                key={element.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="border-border hover:border-cwp-cyan/50 transition-all duration-300 hover:shadow-lg hover:shadow-cwp-cyan/10">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      <element.icon
                        className={`h-8 w-8 ${element.color.replace("bg-", "text-")}`}
                      />
                      <CardTitle className="text-lg">{element.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`w-full h-24 ${element.color} rounded-lg mb-3 shadow-lg`}
                    />
                    <p className="text-sm text-muted-foreground">
                      {element.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4 text-center">
              Дизайн елементи
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Визуални компоненти и стилове
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {designElements.map((element, index) => (
              <div
                key={element.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="border-border hover:border-cwp-magenta/50 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <element.icon className="h-6 w-6 text-cwp-cyan" />
                      <CardTitle className="text-lg">{element.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>{element.demo}</CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-6">Градиентни комбинации</h2>
            <div className="space-y-4">
              <div className="h-24 bg-gradient-to-r from-cwp-yellow via-cwp-magenta to-cwp-cyan rounded-lg shadow-lg" />
              <div className="h-24 bg-gradient-to-r from-cwp-magenta to-cwp-blue rounded-lg shadow-lg" />
              <div className="h-24 bg-gradient-to-r from-cwp-cyan to-cwp-yellow rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
