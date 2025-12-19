import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import VideoCard from '@/components/VideoCard';
import Splash from '@/components/Splash';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  if (showSplash) {
    return <Splash onComplete={() => setShowSplash(false)} />;
  }

  const videos = [
    {
      id: '1',
      title: 'Как создавать вирусный контент в 2024 году',
      channel: 'Креатив Pro',
      channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=creative',
      thumbnail: 'https://cdn.poehali.dev/projects/c29f41d0-4f43-49c7-94f2-ba9e3540246d/files/b1d419ce-6900-44e5-8b50-207175a9ca99.jpg',
      views: '1.2M',
      uploadTime: '2 дня назад',
      duration: '15:30',
      isSubscribed: false,
    },
    {
      id: '2',
      title: 'Обзор новейших технологий: ТОП-10 гаджетов',
      channel: 'Tech Review',
      channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech',
      thumbnail: 'https://cdn.poehali.dev/projects/c29f41d0-4f43-49c7-94f2-ba9e3540246d/files/46a58e7e-b839-4d07-b800-c3d92dcc8cbb.jpg',
      views: '856K',
      uploadTime: '5 дней назад',
      duration: '22:45',
      isSubscribed: true,
    },
    {
      id: '3',
      title: 'Лучшие моменты стримов за неделю',
      channel: 'Game Stream',
      channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=game',
      thumbnail: 'https://cdn.poehali.dev/projects/c29f41d0-4f43-49c7-94f2-ba9e3540246d/files/8b6cadc2-4764-469b-adb2-32286421b1df.jpg',
      views: '2.3M',
      uploadTime: '1 неделю назад',
      duration: '45:12',
      isSubscribed: true,
    },
    {
      id: '4',
      title: 'Мастер-класс по видеомонтажу для начинающих',
      channel: 'Креатив Pro',
      channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=creative',
      thumbnail: 'https://cdn.poehali.dev/projects/c29f41d0-4f43-49c7-94f2-ba9e3540246d/files/b1d419ce-6900-44e5-8b50-207175a9ca99.jpg',
      views: '543K',
      uploadTime: '3 дня назад',
      duration: '18:20',
      isSubscribed: false,
    },
    {
      id: '5',
      title: 'Распаковка флагманского смартфона 2024',
      channel: 'Tech Review',
      channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech',
      thumbnail: 'https://cdn.poehali.dev/projects/c29f41d0-4f43-49c7-94f2-ba9e3540246d/files/46a58e7e-b839-4d07-b800-c3d92dcc8cbb.jpg',
      views: '1.8M',
      uploadTime: '1 день назад',
      duration: '12:15',
      isSubscribed: true,
    },
    {
      id: '6',
      title: 'Эпичные победы в киберспорте',
      channel: 'Game Stream',
      channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=game',
      thumbnail: 'https://cdn.poehali.dev/projects/c29f41d0-4f43-49c7-94f2-ba9e3540246d/files/8b6cadc2-4764-469b-adb2-32286421b1df.jpg',
      views: '3.1M',
      uploadTime: '4 дня назад',
      duration: '28:40',
      isSubscribed: true,
    },
  ];

  const filteredVideos = searchQuery
    ? videos.filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : videos;

  const handleSubscribe = (channelId: string) => {
    console.log('Subscribed to:', channelId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar onNavigate={setCurrentPage} currentPage={currentPage} />
      <div className="ml-64 transition-all duration-300">
        <Header onSearch={setSearchQuery} notificationCount={3} />
        
        <main className="pt-20 px-6 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 animate-slide-up">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent p-8 md:p-12">
                <div className="relative z-10">
                  <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4">
                    Добро пожаловать на VideoHub
                  </h1>
                  <p className="text-white/90 text-lg mb-6 max-w-2xl">
                    Смотрите лучшие видео, подписывайтесь на любимые каналы и получайте уведомления о новом контенте
                  </p>
                  <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                    <Icon name="Sparkles" size={20} className="mr-2" />
                    Исследовать тренды
                  </Button>
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
              </div>
            </div>

            <Tabs defaultValue="all" className="mb-6">
              <TabsList className="bg-muted">
                <TabsTrigger value="all">
                  <Icon name="Grid3x3" size={16} className="mr-2" />
                  Все видео
                </TabsTrigger>
                <TabsTrigger value="trending">
                  <Icon name="TrendingUp" size={16} className="mr-2" />
                  Популярное
                </TabsTrigger>
                <TabsTrigger value="subscriptions">
                  <Icon name="Bell" size={16} className="mr-2" />
                  Подписки
                </TabsTrigger>
                <TabsTrigger value="recent">
                  <Icon name="Clock" size={16} className="mr-2" />
                  Недавние
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                {filteredVideos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVideos.map((video, index) => (
                      <div 
                        key={video.id}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <VideoCard {...video} onSubscribe={handleSubscribe} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Icon name="Search" size={64} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-heading text-xl font-semibold mb-2">Видео не найдены</h3>
                    <p className="text-muted-foreground">Попробуйте изменить запрос</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="trending" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.slice(0, 3).map((video, index) => (
                    <div 
                      key={video.id}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <VideoCard {...video} onSubscribe={handleSubscribe} />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="subscriptions" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.filter(v => v.isSubscribed).map((video, index) => (
                    <div 
                      key={video.id}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <VideoCard {...video} onSubscribe={handleSubscribe} />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recent" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.slice().reverse().map((video, index) => (
                    <div 
                      key={video.id}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <VideoCard {...video} onSubscribe={handleSubscribe} />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}