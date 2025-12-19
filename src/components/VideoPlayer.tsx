import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  channel: string;
  channelAvatar: string;
  views: string;
  uploadTime: string;
  description: string;
  videoUrl?: string;
  isSubscribed?: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

export default function VideoPlayer({
  videoId,
  title,
  channel,
  channelAvatar,
  views,
  uploadTime,
  description,
  videoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4',
  isSubscribed = false,
  onClose,
  onSubscribe
}: VideoPlayerProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: '1',
      author: 'Иван Петров',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ivan',
      text: 'Отличное видео! Очень познавательно',
      time: '2 часа назад',
      likes: 12
    },
    {
      id: '2',
      author: 'Мария Сидорова',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
      text: 'Спасибо за контент, жду продолжение!',
      time: '5 часов назад',
      likes: 8
    }
  ]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = `${title}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([
        {
          id: Date.now().toString(),
          author: 'Пользователь',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
          text: comment,
          time: 'только что',
          likes: 0
        },
        ...comments
      ]);
      setComment('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      <div className="min-h-screen pb-8">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <span className="font-heading font-semibold text-lg">VITAnet 2</span>
            <div className="w-10"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="relative bg-black rounded-xl overflow-hidden aspect-video mb-4 animate-fade-in">
                <video
                  className="w-full h-full"
                  controls
                  autoPlay
                  src={videoUrl}
                >
                  Ваш браузер не поддерживает видео
                </video>
              </div>

              <div className="space-y-4">
                <div>
                  <h1 className="font-heading font-bold text-2xl md:text-3xl mb-2 animate-slide-up">
                    {title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span>{views} просмотров</span>
                    <span>•</span>
                    <span>{uploadTime}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={liked ? "default" : "secondary"}
                    onClick={() => setLiked(!liked)}
                    className="flex-1 sm:flex-none"
                  >
                    <Icon name="ThumbsUp" size={18} className="mr-2" fill={liked ? "currentColor" : "none"} />
                    {liked ? "Нравится" : "Нравится"}
                  </Button>
                  <Button
                    variant={saved ? "default" : "secondary"}
                    onClick={() => setSaved(!saved)}
                    className="flex-1 sm:flex-none"
                  >
                    <Icon name="Heart" size={18} className="mr-2" fill={saved ? "currentColor" : "none"} />
                    {saved ? "Сохранено" : "Сохранить"}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleDownload}
                    className="flex-1 sm:flex-none"
                  >
                    <Icon name="Download" size={18} className="mr-2" />
                    Скачать
                  </Button>
                  <Button variant="secondary" className="flex-1 sm:flex-none">
                    <Icon name="Share2" size={18} className="mr-2" />
                    Поделиться
                  </Button>
                </div>

                <Card className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12 border-2 border-primary">
                      <AvatarImage src={channelAvatar} alt={channel} />
                      <AvatarFallback>{channel[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-heading font-semibold text-lg">{channel}</h3>
                          <p className="text-sm text-muted-foreground">245K подписчиков</p>
                        </div>
                        <Button
                          variant={isSubscribed ? "secondary" : "default"}
                          onClick={onSubscribe}
                        >
                          <Icon name={isSubscribed ? "Check" : "Bell"} size={16} className="mr-2" />
                          {isSubscribed ? "Подписан" : "Подписаться"}
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                  </div>
                </Card>

                <div>
                  <h3 className="font-heading font-semibold text-xl mb-4">
                    Комментарии ({comments.length})
                  </h3>

                  <div className="mb-6">
                    <Textarea
                      placeholder="Добавьте комментарий..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="mb-2"
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" onClick={() => setComment('')}>
                        Отмена
                      </Button>
                      <Button onClick={handleAddComment} disabled={!comment.trim()}>
                        Комментировать
                      </Button>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <div className="space-y-4">
                    {comments.map((c) => (
                      <div key={c.id} className="flex gap-3 animate-fade-in">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={c.avatar} alt={c.author} />
                          <AvatarFallback>{c.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm">{c.author}</span>
                            <span className="text-xs text-muted-foreground">{c.time}</span>
                          </div>
                          <p className="text-sm mb-2">{c.text}</p>
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="h-auto p-0">
                              <Icon name="ThumbsUp" size={14} className="mr-1" />
                              {c.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="h-auto p-0">
                              Ответить
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <h3 className="font-heading font-semibold text-lg mb-4">Рекомендации</h3>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Card key={i} className="p-3 cursor-pointer hover:border-primary/50 transition-all">
                    <div className="flex gap-3">
                      <div className="relative w-40 aspect-video bg-muted rounded overflow-hidden flex-shrink-0">
                        <Badge className="absolute bottom-1 right-1 text-xs">12:30</Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm line-clamp-2 mb-1">
                          Похожее видео #{i}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-1">Канал</p>
                        <p className="text-xs text-muted-foreground">100K • 2 дня назад</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
