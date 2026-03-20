import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContactForm } from "@/hooks/useQueries";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const submitContactForm = useSubmitContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Моля, попълнете всички полета");
      return;
    }

    try {
      await submitContactForm.mutateAsync({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      toast.success("Съобщението е изпратено успешно.");
      setFormData({ name: "", email: "", message: "" });
    } catch (_error) {
      toast.error(
        "Грешка при изпращане на съобщението. Моля, опитайте отново.",
      );
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: "Адрес",
      value: "БЪЛГАРИЯ / гр. Габрово / ул. Белорусия 1",
      color: "text-cwp-cyan",
      hoverColor: "hover:text-cwp-cyan",
    },
    {
      icon: Phone,
      label: "Телефон",
      value: "088_ __ __ __",
      color: "text-cwp-yellow",
      hoverColor: "hover:text-cwp-yellow",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cwp-yellow via-cwp-magenta to-cwp-cyan bg-clip-text text-transparent">
              Контакти
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Свържете се с нас за консултация или запитване относно нашите
              услуги за професионален печат на стени
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div
              className="space-y-6 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.label}
                    className="group border-border/40 bg-card hover:border-border transition-all duration-200 hover:shadow-lg hover:shadow-cwp-cyan/10"
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`flex-shrink-0 p-3 rounded-lg bg-accent/50 ${item.color} group-hover:scale-110 transition-transform duration-200`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">
                            {item.label}
                          </h3>
                          <p className="text-lg font-semibold text-foreground break-words">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              <Card
                className="border-border/40 bg-card animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-3 rounded-lg bg-accent/50 text-cwp-magenta">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-muted-foreground mb-4">
                        Изпратете ни съобщение
                      </h3>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="text-foreground">
                            Име *
                          </Label>
                          <Input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="Вашето име"
                            required
                            className="mt-1 bg-background border-border/40 focus:border-cwp-magenta transition-colors"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-foreground">
                            Имейл *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            placeholder="your@email.com"
                            required
                            className="mt-1 bg-background border-border/40 focus:border-cwp-magenta transition-colors"
                          />
                        </div>
                        <div>
                          <Label htmlFor="message" className="text-foreground">
                            Съобщение *
                          </Label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                message: e.target.value,
                              })
                            }
                            placeholder="Вашето съобщение..."
                            required
                            rows={5}
                            className="mt-1 bg-background border-border/40 focus:border-cwp-magenta transition-colors resize-none"
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={submitContactForm.isPending}
                          className="w-full bg-cwp-magenta hover:bg-cwp-magenta/90 text-white transition-all duration-200 hover:shadow-lg hover:shadow-cwp-magenta/20"
                        >
                          {submitContactForm.isPending ? (
                            <>
                              <span className="animate-spin mr-2">⏳</span>
                              Изпращане...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Изпрати съобщение
                            </>
                          )}
                        </Button>
                      </form>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <Card className="border-border/40 bg-card h-full">
                <CardContent className="p-0 h-full min-h-[400px] lg:min-h-[600px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2921.8!2d25.3167!3d42.8667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a93f5c5c5c5c5c%3A0x5c5c5c5c5c5c5c5c!2z0YPQuy4g0JHQtdC70L7RgNGD0YHQuNGPIDEsINCT0LDQsdGA0L7QstC-LCDQkdGK0LvQs9Cw0YDQuNGP!5e0!3m2!1sbg!2sbg!4v1234567890123!5m2!1sbg!2sbg"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: "400px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Местоположение на CWP - гр. Габрово, ул. Белорусия 1"
                    className="rounded-lg"
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          <div
            className="text-center animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <p className="text-muted-foreground">
              Очакваме вашето запитване и ще се радваме да работим с вас!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
