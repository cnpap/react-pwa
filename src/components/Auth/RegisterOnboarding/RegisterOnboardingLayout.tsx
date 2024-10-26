import React from 'react';
import { ROUTE_AUTH_LOGIN } from '@/constant/route';
import { PropsWithChildren } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

function RegisterOnboardingLayout(props: PropsWithChildren) {
  return (
    <div className="flex h-screen bg-background">
      <div className="hidden lg:flex w-full max-w-md flex-col justify-center p-8 bg-primary text-primary-foreground">
        <Card className="bg-primary-foreground/10 text-primary-foreground border-none">
          <CardContent className="p-6 space-y-6">
            <Button
              variant="ghost"
              className="p-0 h-auto text-primary-foreground hover:bg-transparent hover:text-primary-foreground/80"
              asChild
            >
              <a href={ROUTE_AUTH_LOGIN} className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回登录
              </a>
            </Button>
            <h2 className="text-2xl font-semibold">功能提供差异</h2>
            <p className="text-primary-foreground/80">
              为防止滥用，账号启用需 10 元首冲。该费用可用于消费 ai token。
              <br />
              如有任何问题，请添加作者微信，推送到开发群。
            </p>
            <div className="flex justify-center py-8">
              <svg height="160" width="160" viewBox="0 0 33 33" role="img">
                <path fill="transparent" d="M0,0 h33v33H0z" shapeRendering="crispEdges"></path>
                <path
                  fill="#fff"
                  d="M0 0h7v1H0zM9 0h1v1H9zM12 0h2v1H12zM16 0h5v1H16zM23 0h1v1H23zM26,0 h7v1H26zM0 1h1v1H0zM6 1h1v1H6zM9 1h1v1H9zM12 1h4v1H12zM17 1h1v1H17zM20 1h1v1H20zM22 1h1v1H22zM26 1h1v1H26zM32,1 h1v1H32zM0 2h1v1H0zM2 2h3v1H2zM6 2h1v1H6zM8 2h1v1H8zM10 2h2v1H10zM13 2h1v1H13zM17 2h8v1H17zM26 2h1v1H26zM28 2h3v1H28zM32,2 h1v1H32zM0 3h1v1H0zM2 3h3v1H2zM6 3h1v1H6zM8 3h1v1H8zM11 3h2v1H11zM14 3h1v1H14zM16 3h1v1H16zM19 3h2v1H19zM22 3h1v1H22zM26 3h1v1H26zM28 3h3v1H28zM32,3 h1v1H32zM0 4h1v1H0zM2 4h3v1H2zM6 4h1v1H6zM8 4h1v1H8zM10 4h1v1H10zM15 4h1v1H15zM18 4h1v1H18zM22 4h3v1H22zM26 4h1v1H26zM28 4h3v1H28zM32,4 h1v1H32zM0 5h1v1H0zM6 5h1v1H6zM8 5h1v1H8zM15 5h3v1H15zM20 5h2v1H20zM26 5h1v1H26zM32,5 h1v1H32zM0 6h7v1H0zM8 6h1v1H8zM10 6h1v1H10zM12 6h1v1H12zM14 6h1v1H14zM16 6h1v1H16zM18 6h1v1H18zM20 6h1v1H20zM22 6h1v1H22zM24 6h1v1H24zM26,6 h7v1H26zM8 7h2v1H8zM11 7h1v1H11zM14 7h2v1H14zM21 7h1v1H21zM23 7h2v1H23zM0 8h1v1H0zM2 8h5v1H2zM12 8h5v1H12zM22 8h1v1H22zM24 8h1v1H24zM26 8h5v1H26zM1 9h1v1H1zM4 9h2v1H4zM9 9h1v1H9zM11 9h2v1H11zM15 9h2v1H15zM18 9h2v1H18zM21 9h1v1H21zM23 9h1v1H23zM26 9h2v1H26zM29 9h2v1H29zM4 10h3v1H4zM8 10h3v1H8zM15 10h2v1H15zM18 10h1v1H18zM20 10h1v1H20zM25 10h1v1H25zM28 10h1v1H28zM30 10h2v1H30zM0 11h2v1H0zM5 11h1v1H5zM10 11h2v1H10zM14 11h3v1H14zM20 11h3v1H20zM28 11h3v1H28zM32,11 h1v1H32zM2 12h2v1H2zM5 12h3v1H5zM12 12h1v1H12zM15 12h1v1H15zM18 12h2v1H18zM24 12h1v1H24zM28 12h2v1H28zM31,12 h2v1H31zM0 13h1v1H0zM2 13h2v1H2zM10 13h3v1H10zM14 13h3v1H14zM20 13h4v1H20zM26 13h2v1H26zM30,13 h3v1H30zM1 14h1v1H1zM4 14h4v1H4zM12 14h2v1H12zM17 14h3v1H17zM21 14h1v1H21zM25 14h3v1H25zM31 14h1v1H31zM1 15h1v1H1zM3 15h3v1H3zM10 15h3v1H10zM14 15h1v1H14zM16 15h1v1H16zM19 15h4v1H19zM25 15h2v1H25zM29 15h2v1H29zM6 16h1v1H6zM9 16h1v1H9zM11 16h1v1H11zM14 16h1v1H14zM17 16h1v1H17zM19 16h1v1H19zM22 16h1v1H22zM24 16h2v1H24zM27 16h4v1H27zM32,16 h1v1H32zM0 17h3v1H0zM4 17h1v1H4zM7 17h3v1H7zM11 17h3v1H11zM15 17h3v1H15zM19 17h2v1H19zM22 17h2v1H22zM25 17h3v1H25zM29 17h2v1H29zM5 18h2v1H5zM8 18h1v1H8zM11 18h1v1H11zM13 18h1v1H13zM15 18h3v1H15zM20 18h3v1H20zM25 18h4v1H25zM30 18h2v1H30zM0 19h3v1H0zM4 19h2v1H4zM7 19h3v1H7zM14 19h10v1H14zM25 19h1v1H25zM27 19h4v1H27zM0 20h1v1H0zM2 20h3v1H2zM6 20h2v1H6zM9 20h1v1H9zM11 20h6v1H11zM19 20h2v1H19zM24 20h2v1H24zM29 20h1v1H29zM31 20h1v1H31zM0 21h1v1H0zM2 21h1v1H2zM4 21h2v1H4zM8 21h1v1H8zM10 21h1v1H10zM12 21h1v1H12zM15 21h1v1H15zM18 21h1v1H18zM21 21h2v1H21zM29 21h2v1H29zM32,21 h1v1H32zM0 22h1v1H0zM2 22h1v1H2zM4 22h1v1H4zM6 22h1v1H6zM9 22h1v1H9zM13 22h1v1H13zM15 22h3v1H15zM20 22h3v1H20zM25 22h1v1H25zM27 22h1v1H27zM31 22h1v1H31zM0 23h1v1H0zM3 23h1v1H3zM5 23h1v1H5zM7 23h1v1H7zM11 23h1v1H11zM15 23h1v1H15zM18 23h1v1H18zM21 23h1v1H21zM23 23h3v1H23zM27 23h4v1H27zM0 24h1v1H0zM2 24h1v1H2zM5 24h3v1H5zM10 24h4v1H10zM15 24h4v1H15zM24 24h5v1H24zM8 25h3v1H8zM13 25h4v1H13zM19 25h3v1H19zM23 25h2v1H23zM28 25h1v1H28zM30,25 h3v1H30zM0 26h7v1H0zM9 26h2v1H9zM12 26h2v1H12zM15 26h2v1H15zM18 26h1v1H18zM20 26h2v1H20zM23 26h2v1H23zM26 26h1v1H26zM28 26h1v1H28zM30 26h1v1H30zM0 27h1v1H0zM6 27h1v1H6zM8 27h1v1H8zM12 27h2v1H12zM16 27h1v1H16zM19 27h1v1H19zM21 27h4v1H21zM28 27h3v1H28zM32,27 h1v1H32zM0 28h1v1H0zM2 28h3v1H2zM6 28h1v1H6zM8 28h1v1H8zM15 28h1v1H15zM18 28h1v1H18zM21 28h1v1H21zM24 28h6v1H24zM0 29h1v1H0zM2 29h3v1H2zM6 29h1v1H6zM8 29h4v1H8zM13 29h1v1H13zM15 29h2v1H15zM20 29h1v1H20zM28 29h1v1H28zM30,29 h3v1H30zM0 30h1v1H0zM2 30h3v1H2zM6 30h1v1H6zM8 30h3v1H8zM12 30h2v1H12zM18 30h2v1H18zM22 30h2v1H22zM26 30h2v1H26zM29 30h2v1H29zM0 31h1v1H0zM6 31h1v1H6zM9 31h1v1H9zM11 31h3v1H11zM16 31h1v1H16zM19 31h3v1H19zM28 31h3v1H28zM0 32h7v1H0zM8 32h1v1H8zM11 32h1v1H11zM13 32h2v1H13zM17 32h1v1H17zM19 32h1v1H19zM22 32h4v1H22zM27 32h1v1H27zM29 32h3v1H29z"
                  shapeRendering="crispEdges"
                ></path>
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <a href="#" className="flex items-center text-2xl font-semibold">
              <img
                alt=""
                className="w-8 h-8 mr-2"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              />
              <span className="text-foreground">Flowbite</span>
            </a>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default RegisterOnboardingLayout;
