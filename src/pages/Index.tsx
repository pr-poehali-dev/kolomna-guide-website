import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Index = () => {
  const [activeSection, setActiveSection] = useState('routes');
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const routes = [
    {
      id: 1,
      title: 'Исторический центр',
      duration: '2-3 часа',
      distance: '3.5 км',
      description: 'Прогулка по сердцу древней Коломны с посещением Кремля и старинных храмов',
      difficulty: 'Легкий',
      highlights: ['Коломенский Кремль', 'Успенский собор', 'Музей пастилы'],
      coordinates: '55.0983,38.7788',
    },
    {
      id: 2,
      title: 'Набережная и парки',
      duration: '1.5-2 часа',
      distance: '4 км',
      description: 'Живописный маршрут вдоль реки Москвы с отдыхом в городских парках',
      difficulty: 'Легкий',
      highlights: ['Набережная Москвы-реки', 'Парк Мира', 'Смотровая площадка'],
      coordinates: '55.0950,38.7650',
    },
    {
      id: 3,
      title: 'Посады и слободы',
      duration: '3-4 часа',
      distance: '5.5 км',
      description: 'Знакомство с купеческой Коломной и традиционной архитектурой',
      difficulty: 'Средний',
      highlights: ['Купеческие усадьбы', 'Деревянное зодчество', 'Ремесленные мастерские'],
      coordinates: '55.1020,38.7850',
    },
  ];

  const landmarks = [
    {
      id: 1,
      name: 'Коломенский Кремль',
      category: 'Архитектура',
      rating: 4.9,
      description: 'Древняя крепость XVI века с сохранившимися башнями и стенами',
      workTime: '09:00 - 18:00',
      price: '300 ₽',
      coordinates: '55.0983,38.7788',
    },
    {
      id: 2,
      name: 'Музей пастилы',
      category: 'Музей',
      rating: 4.8,
      description: 'Интерактивный музей с дегустацией знаменитой коломенской пастилы',
      workTime: '10:00 - 20:00',
      price: '500 ₽',
      coordinates: '55.0978,38.7795',
    },
    {
      id: 3,
      name: 'Успенский собор',
      category: 'Храм',
      rating: 4.9,
      description: 'Главный собор Коломенского Кремля с уникальными фресками',
      workTime: '08:00 - 19:00',
      price: 'Бесплатно',
      coordinates: '55.0985,38.7792',
    },
    {
      id: 4,
      name: 'Музей-резиденция «Арткоммуналка»',
      category: 'Музей',
      rating: 4.7,
      description: 'Атмосферный музей быта советской коммунальной квартиры',
      workTime: '11:00 - 19:00',
      price: '400 ₽',
      coordinates: '55.0995,38.7810',
    },
  ];

  const restaurants = [
    {
      id: 1,
      name: 'Калачная',
      cuisine: 'Русская',
      rating: 4.6,
      priceLevel: '₽₽',
      description: 'Традиционные калачи и выпечка по старинным рецептам',
      address: 'ул. Зайцева, 14',
      specialty: 'Калачи, пироги',
      phone: '+7 (496) 618-55-11',
      coordinates: '55.0975,38.7765',
    },
    {
      id: 2,
      name: 'Обжорный ряд',
      cuisine: 'Русская',
      rating: 4.5,
      priceLevel: '₽₽',
      description: 'Аутентичная русская кухня в историческом центре',
      address: 'ул. Лажечникова, 5',
      specialty: 'Щи, пельмени, блины',
      phone: '+7 (496) 612-40-44',
      coordinates: '55.0980,38.7780',
    },
    {
      id: 3,
      name: 'Pastila Café',
      cuisine: 'Кафе',
      rating: 4.8,
      priceLevel: '₽',
      description: 'Уютное кафе с десертами и напитками',
      address: 'ул. Посадская, 13',
      specialty: 'Пастила, чай, кофе',
      phone: '+7 (496) 615-73-20',
      coordinates: '55.0988,38.7800',
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Архитектура':
        return 'Castle';
      case 'Музей':
        return 'Library';
      case 'Храм':
        return 'Church';
      default:
        return 'MapPin';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Легкий':
        return 'bg-green-500';
      case 'Средний':
        return 'bg-yellow-500';
      case 'Сложный':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const openRoute = (coordinates: string) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates}`;
    window.open(url, '_blank');
    toast.success('Открываем маршрут в Google Maps');
  };

  const openLandmarkRoute = (coordinates: string) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates}`;
    window.open(url, '_blank');
    toast.success('Строим маршрут до места');
  };

  const handleBooking = (restaurant: any) => {
    setSelectedRestaurant(restaurant);
    setIsBookingOpen(true);
  };

  const copyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    toast.success('Номер телефона скопирован');
  };

  const callPhone = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-purple-50">
      <div
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://cdn.poehali.dev/projects/1f9adb36-a649-4428-9ce8-ff7712e2034f/files/667cf7aa-3a6e-4d80-bfce-c0f9df0bd02d.jpg')`,
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in text-center">
            Путеводитель по Коломне
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in text-center max-w-2xl">
            Откройте для себя древний город с богатой историей и традициями
          </p>
          <div className="flex gap-4 animate-scale-in">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              <Icon name="Map" className="mr-2" size={20} />
              Начать путешествие
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white hover:bg-white/20 text-white">
              <Icon name="Download" className="mr-2" size={20} />
              Скачать карту
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="routes" className="w-full" onValueChange={setActiveSection}>
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4 mb-8 h-14">
            <TabsTrigger value="routes" className="text-base">
              <Icon name="Route" className="mr-2" size={18} />
              <span className="hidden sm:inline">Маршруты</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="text-base">
              <Icon name="Map" className="mr-2" size={18} />
              <span className="hidden sm:inline">Карта</span>
            </TabsTrigger>
            <TabsTrigger value="landmarks" className="text-base">
              <Icon name="Landmark" className="mr-2" size={18} />
              <span className="hidden sm:inline">Места</span>
            </TabsTrigger>
            <TabsTrigger value="restaurants" className="text-base">
              <Icon name="UtensilsCrossed" className="mr-2" size={18} />
              <span className="hidden sm:inline">Рестораны</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="routes" className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-3">Пешеходные маршруты</h2>
              <p className="text-lg text-muted-foreground">
                Выберите маршрут и начните своё путешествие по Коломне
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {routes.map((route, index) => (
                <Card
                  key={route.id}
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-2xl">{route.title}</CardTitle>
                      <Badge className={`${getDifficultyColor(route.difficulty)} text-white`}>
                        {route.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="text-base">{route.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Icon name="Clock" size={16} />
                          <span>{route.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="MapPin" size={16} />
                          <span>{route.distance}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Icon name="Star" size={16} className="text-accent" />
                          Основные точки:
                        </h4>
                        <ul className="space-y-1">
                          {route.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-sm flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button className="w-full" variant="default" onClick={() => openRoute(route.coordinates)}>
                        <Icon name="Navigation" className="mr-2" size={16} />
                        Построить маршрут
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="map" className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-3">Интерактивная карта</h2>
              <p className="text-lg text-muted-foreground">
                Все достопримечательности и маршруты на одной карте
              </p>
            </div>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-[600px] bg-gray-100">
                  <img
                    src="https://cdn.poehali.dev/projects/1f9adb36-a649-4428-9ce8-ff7712e2034f/files/dd4fee4c-5b75-4480-bae6-3782d45c99ed.jpg"
                    alt="Карта Коломны"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4">
                    <h3 className="font-bold mb-2">Легенда карты</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-primary" />
                        <span>Исторические места</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-secondary" />
                        <span>Музеи</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-accent" />
                        <span>Рестораны</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="landmarks" className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-3">Достопримечательности</h2>
              <p className="text-lg text-muted-foreground">
                Самые интересные места Коломны для посещения
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {landmarks.map((landmark, index) => (
                <Card
                  key={landmark.id}
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Icon
                            name={getCategoryIcon(landmark.category)}
                            className="text-primary"
                            size={24}
                          />
                          <CardTitle className="text-2xl">{landmark.name}</CardTitle>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">{landmark.category}</Badge>
                          <div className="flex items-center gap-1">
                            <Icon name="Star" className="text-yellow-500 fill-yellow-500" size={16} />
                            <span className="font-semibold">{landmark.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-base mt-3">{landmark.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Clock" size={16} className="text-muted-foreground" />
                        <span>{landmark.workTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Ticket" size={16} className="text-muted-foreground" />
                        <span className="font-semibold">{landmark.price}</span>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1" onClick={() => openLandmarkRoute(landmark.coordinates)}>
                          <Icon name="Navigation" className="mr-2" size={16} />
                          Как добраться
                        </Button>
                        <Button variant="outline" size="icon">
                          <Icon name="Heart" size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="restaurants" className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-3">Рестораны и кафе</h2>
              <p className="text-lg text-muted-foreground">
                Лучшие места, чтобы попробовать традиционную кухню
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant, index) => (
                <Card
                  key={restaurant.id}
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('https://cdn.poehali.dev/projects/1f9adb36-a649-4428-9ce8-ff7712e2034f/files/4d63ebf1-b468-452b-a5bf-6f7e48ff818c.jpg')`,
                    }}
                  />
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl">{restaurant.name}</CardTitle>
                      <Badge variant="outline">{restaurant.priceLevel}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-secondary">{restaurant.cuisine}</Badge>
                      <div className="flex items-center gap-1">
                        <Icon name="Star" className="text-yellow-500 fill-yellow-500" size={14} />
                        <span className="text-sm font-semibold">{restaurant.rating}</span>
                      </div>
                    </div>
                    <CardDescription className="mt-2">{restaurant.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2 text-sm">
                        <Icon name="MapPin" size={16} className="text-muted-foreground mt-0.5" />
                        <span>{restaurant.address}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <Icon name="ChefHat" size={16} className="text-muted-foreground mt-0.5" />
                        <span className="font-semibold">{restaurant.specialty}</span>
                      </div>
                      <Button className="w-full" variant="default" onClick={() => handleBooking(restaurant)}>
                        <Icon name="UtensilsCrossed" className="mr-2" size={16} />
                        Забронировать
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">О путеводителе</h3>
              <p className="text-gray-400">
                Ваш надёжный помощник в путешествии по древней Коломне
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Контакты</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@kolomna-guide.ru</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (495) 123-45-67</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Следите за нами</h3>
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="bg-white/10 hover:bg-white/20 border-white/20">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="outline" size="icon" className="bg-white/10 hover:bg-white/20 border-white/20">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button variant="outline" size="icon" className="bg-white/10 hover:bg-white/20 border-white/20">
                  <Icon name="Youtube" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Путеводитель по Коломне. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Бронирование столика</DialogTitle>
            <DialogDescription>
              {selectedRestaurant?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <Icon name="MapPin" size={20} className="text-primary" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Адрес</p>
                <p className="font-medium">{selectedRestaurant?.address}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <Icon name="Phone" size={20} className="text-primary" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Телефон для бронирования</p>
                <p className="font-medium text-lg">{selectedRestaurant?.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <Icon name="ChefHat" size={20} className="text-primary" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Специализация</p>
                <p className="font-medium">{selectedRestaurant?.specialty}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button className="flex-1" onClick={() => callPhone(selectedRestaurant?.phone)}>
                <Icon name="Phone" className="mr-2" size={18} />
                Позвонить
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => copyPhone(selectedRestaurant?.phone)}>
                <Icon name="Copy" className="mr-2" size={18} />
                Копировать
              </Button>
            </div>

            <Button 
              variant="secondary" 
              className="w-full" 
              onClick={() => openLandmarkRoute(selectedRestaurant?.coordinates)}
            >
              <Icon name="Navigation" className="mr-2" size={18} />
              Построить маршрут
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;