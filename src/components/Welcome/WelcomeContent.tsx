import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const WelcomeContent: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-primary text-primary-foreground">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex items-center justify-center space-x-2">
            <img
              className="w-8 h-8"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            <span className="text-2xl font-semibold">Flowbite</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              探索世界领先的设计作品集。
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              全球数百万设计师和机构在 Flowbite 上展示他们的作品集 -
              这里是世界上最优秀的设计和创意专业人士的家园。
            </p>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <div className="flex -space-x-2">
              <Avatar className="border-2 border-background">
                <AvatarImage
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                  alt="Bonnie"
                />
                <AvatarFallback>BG</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarImage
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                  alt="Jese"
                />
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarImage
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
                  alt="Roberta"
                />
                <AvatarFallback>RC</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarImage
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/thomas-lean.png"
                  alt="Thomas"
                />
                <AvatarFallback>TL</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-sm">
              超过 <span className="font-medium">15.7k</span> 位满意的客户
            </div>
          </div>

          <Button variant="secondary" className="mx-auto">
            开始探索
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeContent;
