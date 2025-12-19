import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface VideoCardProps {
  id: string;
  title: string;
  channel: string;
  channelAvatar: string;
  thumbnail: string;
  views: string;
  uploadTime: string;
  duration: string;
  isSubscribed?: boolean;
  onSubscribe?: (channelId: string) => void;
}

export default function VideoCard({
  id,
  title,
  channel,
  channelAvatar,
  thumbnail,
  views,
  uploadTime,
  duration,
  isSubscribed = false,
  onSubscribe
}: VideoCardProps) {
  const [subscribed, setSubscribed] = useState(isSubscribed);
  const [liked, setLiked] = useState(false);

  const handleSubscribe = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSubscribed(!subscribed);
    onSubscribe?.(id);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <Card className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 animate-fade-in cursor-pointer">
      <div className="relative overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute bottom-2 right-2 bg-black/80 text-white hover:bg-black/90">
          {duration}
        </Badge>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Icon name="Play" size={48} className="text-white drop-shadow-lg" />
        </div>
      </div>

      <div className="p-4">
        <div className="flex gap-3">
          <Avatar className="w-10 h-10 border-2 border-primary/20">
            <AvatarImage src={channelAvatar} alt={channel} />
            <AvatarFallback>{channel[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mb-1">{channel}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{views} просмотров</span>
              <span>•</span>
              <span>{uploadTime}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
          <Button
            size="sm"
            variant={subscribed ? "secondary" : "default"}
            onClick={handleSubscribe}
            className="flex-1"
          >
            <Icon name={subscribed ? "Check" : "Bell"} size={16} className="mr-1" />
            {subscribed ? "Подписан" : "Подписаться"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleLike}
            className={liked ? "text-accent" : ""}
          >
            <Icon name={liked ? "Heart" : "Heart"} size={16} fill={liked ? "currentColor" : "none"} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
