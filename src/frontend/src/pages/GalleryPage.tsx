import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetGalleryImages } from "@/hooks/useQueries";
import { useState } from "react";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

const CATEGORIES = [
  { id: "all", label: "Всички" },
  { id: "Интериор", label: "Интериор" },
  { id: "Екстериор", label: "Екстериор" },
  { id: "Природа", label: "Природа" },
  { id: "Геометрични", label: "Геометрични" },
  { id: "Абстрактни", label: "Абстрактни" },
  { id: "Ресторанти", label: "Ресторанти" },
];

// Fallback gallery items using static assets
const FALLBACK_GALLERY: GalleryItem[] = [
  // Интериор
  {
    id: "interior-1",
    title: "Модерна всекидневна",
    category: "Интериор",
    image: "/assets/generated/interior-project-1.dim_600x400.jpg",
    description:
      "Елегантен интериорен дизайн за съвременна всекидневна с акцентна стена",
  },
  {
    id: "interior-2",
    title: "Спалня с природни мотиви",
    category: "Интериор",
    image: "/assets/generated/interior-project-2.dim_600x400.jpg",
    description: "Релаксираща атмосфера със стенен принт на природни елементи",
  },
  {
    id: "interior-3",
    title: "Офис пространство",
    category: "Интериор",
    image: "/assets/generated/interior-project-3.dim_600x400.jpg",
    description: "Професионален дизайн за офис с мотивиращи визуални елементи",
  },
  {
    id: "interior-4",
    title: "Кухня с акцент",
    category: "Интериор",
    image: "/assets/generated/interior-project-4.dim_600x400.jpg",
    description: "Стилна кухня с декоративна стена и модерен принт",
  },
  {
    id: "interior-5",
    title: "Баня със стил",
    category: "Интериор",
    image: "/assets/generated/interior-project-5.dim_600x400.jpg",
    description: "Луксозна баня с водоустойчив стенен принт",
  },
  {
    id: "interior-6",
    title: "Детска стая",
    category: "Интериор",
    image: "/assets/generated/interior-project-6.dim_600x400.jpg",
    description: "Цветен и весел дизайн за детска стая с образователни мотиви",
  },
  // Екстериор
  {
    id: "exterior-1",
    title: "Търговски обект",
    category: "Екстериор",
    image: "/assets/generated/exterior-project-1.dim_600x400.jpg",
    description: "Привличащ вниманието дизайн за търговски обект",
  },
  {
    id: "exterior-2",
    title: "Фасада на къща",
    category: "Екстериор",
    image: "/assets/generated/exterior-project-2.dim_600x400.jpg",
    description: "Впечатляваща фасада с художествен стенен принт",
  },
  {
    id: "exterior-3",
    title: "Градска стена",
    category: "Екстериор",
    image: "/assets/generated/exterior-project-3.dim_600x400.jpg",
    description: "Урбанистичен дизайн за външна градска стена",
  },
  {
    id: "exterior-4",
    title: "Вилна сграда",
    category: "Екстериор",
    image: "/assets/generated/exterior-project-4.dim_600x400.jpg",
    description: "Елегантен екстериорен принт за вилна сграда",
  },
  {
    id: "exterior-5",
    title: "Паркова стена",
    category: "Екстериор",
    image: "/assets/generated/exterior-project-5.dim_600x400.jpg",
    description: "Природосъобразен дизайн за паркова зона",
  },
  {
    id: "exterior-6",
    title: "Обществена сграда",
    category: "Екстериор",
    image: "/assets/generated/exterior-project-6.dim_600x400.jpg",
    description: "Представителен дизайн за обществена сграда",
  },
  // Природа
  {
    id: "nature-1",
    title: "Горски пейзаж",
    category: "Природа",
    image: "/assets/generated/nature-project-1.dim_600x400.jpg",
    description: "Реалистичен горски пейзаж за релаксираща атмосфера",
  },
  {
    id: "nature-2",
    title: "Морски бряг",
    category: "Природа",
    image: "/assets/generated/nature-project-2.dim_600x400.jpg",
    description: "Спокоен морски изглед за медитативно пространство",
  },
  {
    id: "nature-3",
    title: "Планински връх",
    category: "Природа",
    image: "/assets/generated/nature-project-3.dim_600x400.jpg",
    description: "Величествен планински пейзаж с панорамен изглед",
  },
  {
    id: "nature-4",
    title: "Тропическа растителност",
    category: "Природа",
    image: "/assets/generated/nature-tropical-vegetation.dim_600x400.jpg",
    description: "Буйна тропическа растителност за екзотична атмосфера",
  },
  {
    id: "nature-5",
    title: "Цветна градина",
    category: "Природа",
    image: "/assets/generated/nature-colorful-garden.dim_600x400.jpg",
    description: "Цветна градина с разнообразие от растения",
  },
  {
    id: "nature-6",
    title: "Водопад",
    category: "Природа",
    image: "/assets/generated/nature-waterfall.dim_600x400.jpg",
    description: "Динамичен водопад за енергизираща атмосфера",
  },
  // Геометрични
  {
    id: "geometric-1",
    title: "Хексагонален мотив",
    category: "Геометрични",
    image: "/assets/generated/geometric-hexagonal.dim_600x400.jpg",
    description: "Повтарящ се хексагонален шарка за модерен вид",
  },
  {
    id: "geometric-2",
    title: "Триъгълна мозайка",
    category: "Геометрични",
    image: "/assets/generated/geometric-triangular.dim_600x400.jpg",
    description: "Динамична триъгълна мозайка с цветови преходи",
  },
  {
    id: "geometric-3",
    title: "Кръгови композиции",
    category: "Геометрични",
    image: "/assets/generated/geometric-circular.dim_600x400.jpg",
    description: "Хармонични кръгови форми в съвременна композиция",
  },
  {
    id: "geometric-4",
    title: "Линейни елементи",
    category: "Геометрични",
    image: "/assets/generated/geometric-linear.dim_600x400.jpg",
    description: "Минималистични линейни форми с чисти линии",
  },
  {
    id: "geometric-5",
    title: "Диамантени форми",
    category: "Геометрични",
    image: "/assets/generated/geometric-diamond.dim_600x400.jpg",
    description: "Елегантни диамантени форми в геометрична композиция",
  },
  {
    id: "geometric-6",
    title: "Спирални мотиви",
    category: "Геометрични",
    image: "/assets/generated/geometric-spiral.dim_600x400.jpg",
    description: "Хипнотизиращи спирални форми с динамичен ефект",
  },
  // Абстрактни
  {
    id: "abstract-1",
    title: "Флуидни форми",
    category: "Абстрактни",
    image: "/assets/generated/abstract-fluid.dim_600x400.jpg",
    description: "Плавни флуидни форми в абстрактна композиция",
  },
  {
    id: "abstract-2",
    title: "Цветни петна",
    category: "Абстрактни",
    image: "/assets/generated/abstract-splash.dim_600x400.jpg",
    description: "Експресивна композиция с цветни петна и текстури",
  },
  {
    id: "abstract-3",
    title: "Текстурни композиции",
    category: "Абстрактни",
    image: "/assets/generated/abstract-textured.dim_600x400.jpg",
    description: "Богати текстури в абстрактна художествена форма",
  },
  {
    id: "abstract-4",
    title: "Цветови преходи",
    category: "Абстрактни",
    image: "/assets/generated/abstract-gradient.dim_600x400.jpg",
    description: "Плавни цветови преходи и градиенти",
  },
  {
    id: "abstract-5",
    title: "Органични форми",
    category: "Абстрактни",
    image: "/assets/generated/abstract-organic.dim_600x400.jpg",
    description: "Природни органични форми в абстрактна интерпретация",
  },
  {
    id: "abstract-6",
    title: "Художествени щрихи",
    category: "Абстрактни",
    image: "/assets/generated/abstract-brushstroke.dim_600x400.jpg",
    description: "Експресивни художествени щрихи и динамични движения",
  },
  // Ресторанти
  {
    id: "restaurant-1",
    title: "Модерна трапезария",
    category: "Ресторанти",
    image: "/assets/generated/restaurant-dining-1.dim_600x400.jpg",
    description:
      "Елегантен дизайн за съвременна трапезария с изискана атмосфера",
  },
  {
    id: "restaurant-2",
    title: "Уютно кафене",
    category: "Ресторанти",
    image: "/assets/generated/restaurant-cafe-2.dim_600x400.jpg",
    description: "Топъл и приветлив интериор за градско кафене",
  },
  {
    id: "restaurant-3",
    title: "Стилен бар",
    category: "Ресторанти",
    image: "/assets/generated/restaurant-bar-3.dim_600x400.jpg",
    description: "Модерна атмосфера за бар с уникален визуален стил",
  },
  {
    id: "restaurant-4",
    title: "Професионална кухня",
    category: "Ресторанти",
    image: "/assets/generated/restaurant-kitchen-4.dim_600x400.jpg",
    description: "Функционален и естетичен дизайн за кухненско пространство",
  },
  {
    id: "restaurant-5",
    title: "Открита тераса",
    category: "Ресторанти",
    image: "/assets/generated/restaurant-outdoor-5.dim_600x400.jpg",
    description: "Свеж дизайн за външна зона на ресторант",
  },
  {
    id: "restaurant-6",
    title: "Тематичен ресторант",
    category: "Ресторанти",
    image: "/assets/generated/restaurant-themed-6.dim_600x400.jpg",
    description: "Уникален тематичен дизайн за специализиран ресторант",
  },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: backendImages, isLoading } = useGetGalleryImages();

  // Convert backend images to gallery items
  const backendGalleryItems: GalleryItem[] =
    backendImages?.map((img) => ({
      id: img.id,
      title: img.title,
      category: img.category,
      image: img.image.getDirectURL(),
      description: img.description,
    })) || [];

  // Use backend images if available, otherwise use fallback
  const galleryItems =
    backendGalleryItems.length > 0 ? backendGalleryItems : FALLBACK_GALLERY;

  const filteredItems =
    selectedCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="w-full">
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5 py-16 md:py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cwp-yellow via-cwp-magenta to-cwp-cyan bg-clip-text text-transparent">
              Галерия
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Разгледайте нашите завършени проекти и вдъхновете се за вашето
              пространство
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 animate-fade-in-up">
            <div className="flex flex-wrap gap-3 justify-center">
              {CATEGORIES.map((category) => (
                <Badge
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  className={`cursor-pointer px-5 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cwp-cyan focus:ring-offset-2 focus:ring-offset-background ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-cwp-magenta to-cwp-cyan text-white hover:opacity-90 shadow-lg shadow-cwp-magenta/20"
                      : "border-cwp-cyan/50 text-cwp-cyan hover:bg-cwp-cyan/10 hover:border-cwp-cyan"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                  // biome-ignore lint/a11y/useSemanticElements: Badge used as interactive button
                  tabIndex={0}
                  role="button"
                  aria-pressed={selectedCategory === category.id}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedCategory(category.id);
                    }
                  }}
                >
                  {category.label}
                </Badge>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static list of skeletons
                <Card key={`skel-${index}`} className="overflow-hidden">
                  <Skeleton className="aspect-[3/2] w-full" />
                  <CardContent className="p-4 space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Card
                    className="overflow-hidden cursor-pointer group border-border hover:border-cwp-cyan/50 transition-all duration-300 hover:shadow-xl hover:shadow-cwp-cyan/10 focus-within:ring-2 focus-within:ring-cwp-cyan focus-within:ring-offset-2 focus-within:ring-offset-background"
                    onClick={() => setSelectedImage(item)}
                    // biome-ignore lint/a11y/useSemanticElements: Card used as interactive button
                    tabIndex={0}
                    role="button"
                    aria-label={`Отвори ${item.title}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedImage(item);
                      }
                    }}
                  >
                    <div className="relative aspect-[3/2] overflow-hidden bg-muted">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <p className="text-sm text-foreground/90 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-cwp-cyan transition-colors duration-200">
                        {item.title}
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-xs border-cwp-magenta/50 text-cwp-magenta hover:bg-cwp-magenta/10 transition-colors duration-200"
                      >
                        {item.category}
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}

          {!isLoading && filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                Няма налични проекти в тази категория
              </p>
            </div>
          )}
        </div>
      </section>

      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedImage && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl bg-gradient-to-r from-cwp-yellow via-cwp-magenta to-cwp-cyan bg-clip-text text-transparent">
                  {selectedImage.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden bg-muted">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="w-full h-auto"
                  />
                </div>
                <div className="space-y-2">
                  <Badge
                    variant="outline"
                    className="border-cwp-magenta/50 text-cwp-magenta"
                  >
                    {selectedImage.category}
                  </Badge>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedImage.description}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
