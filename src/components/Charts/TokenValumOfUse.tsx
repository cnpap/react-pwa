'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export const description = '不同模型的 token 损耗图表';

// 修改数据结构以反映不同模型的 token 损耗
const chartData = [
  { date: '2024-04-01', gpt3: 222, gpt4: 150, claude: 180 },
  { date: '2024-04-02', gpt3: 97, gpt4: 180, claude: 120 },
  { date: '2024-04-03', gpt3: 167, gpt4: 120, claude: 170 },
  { date: '2024-04-04', gpt3: 242, gpt4: 260, claude: 220 },
  { date: '2024-04-05', gpt3: 373, gpt4: 290, claude: 250 },
  { date: '2024-04-06', gpt3: 301, gpt4: 340, claude: 310 },
  { date: '2024-04-07', gpt3: 245, gpt4: 180, claude: 170 },
  { date: '2024-04-08', gpt3: 409, gpt4: 320, claude: 280 },
  { date: '2024-04-09', gpt3: 59, gpt4: 110, claude: 150 },
  { date: '2024-04-10', gpt3: 261, gpt4: 190, claude: 230 },
  { date: '2024-04-11', gpt3: 327, gpt4: 350, claude: 370 },
  { date: '2024-04-12', gpt3: 292, gpt4: 210, claude: 240 },
  { date: '2024-04-13', gpt3: 342, gpt4: 380, claude: 390 },
  { date: '2024-04-14', gpt3: 137, gpt4: 220, claude: 230 },
  { date: '2024-04-15', gpt3: 120, gpt4: 170, claude: 180 },
  { date: '2024-04-16', gpt3: 138, gpt4: 190, claude: 200 },
  { date: '2024-04-17', gpt3: 446, gpt4: 360, claude: 370 },
  { date: '2024-04-18', gpt3: 364, gpt4: 410, claude: 420 },
  { date: '2024-04-19', gpt3: 243, gpt4: 180, claude: 190 },
  { date: '2024-04-20', gpt3: 89, gpt4: 150, claude: 160 },
  { date: '2024-04-21', gpt3: 137, gpt4: 200, claude: 210 },
  { date: '2024-04-22', gpt3: 224, gpt4: 170, claude: 180 },
  { date: '2024-04-23', gpt3: 138, gpt4: 230, claude: 240 },
  { date: '2024-04-24', gpt3: 387, gpt4: 290, claude: 300 },
  { date: '2024-04-25', gpt3: 215, gpt4: 250, claude: 260 },
  { date: '2024-04-26', gpt3: 75, gpt4: 130, claude: 140 },
  { date: '2024-04-27', gpt3: 383, gpt4: 420, claude: 430 },
  { date: '2024-04-28', gpt3: 122, gpt4: 180, claude: 190 },
  { date: '2024-04-29', gpt3: 315, gpt4: 240, claude: 250 },
  { date: '2024-04-30', gpt3: 454, gpt4: 380, claude: 390 },
  { date: '2024-05-01', gpt3: 165, gpt4: 220, claude: 230 },
  { date: '2024-05-02', gpt3: 293, gpt4: 310, claude: 320 },
  { date: '2024-05-03', gpt3: 247, gpt4: 190, claude: 200 },
  { date: '2024-05-04', gpt3: 385, gpt4: 420, claude: 430 },
  { date: '2024-05-05', gpt3: 481, gpt4: 390, claude: 400 },
  { date: '2024-05-06', gpt3: 498, gpt4: 520, claude: 530 },
  { date: '2024-05-07', gpt3: 388, gpt4: 300, claude: 310 },
  { date: '2024-05-08', gpt3: 149, gpt4: 210, claude: 220 },
  { date: '2024-05-09', gpt3: 227, gpt4: 180, claude: 190 },
  { date: '2024-05-10', gpt3: 293, gpt4: 330, claude: 340 },
  { date: '2024-05-11', gpt3: 335, gpt4: 270, claude: 280 },
  { date: '2024-05-12', gpt3: 197, gpt4: 240, claude: 250 },
  { date: '2024-05-13', gpt3: 197, gpt4: 160, claude: 170 },
  { date: '2024-05-14', gpt3: 448, gpt4: 490, claude: 500 },
  { date: '2024-05-15', gpt3: 473, gpt4: 380, claude: 390 },
  { date: '2024-05-16', gpt3: 338, gpt4: 400, claude: 410 },
  { date: '2024-05-17', gpt3: 499, gpt4: 420, claude: 430 },
  { date: '2024-05-18', gpt3: 315, gpt4: 350, claude: 360 },
  { date: '2024-05-19', gpt3: 235, gpt4: 180, claude: 190 },
  { date: '2024-05-20', gpt3: 177, gpt4: 230, claude: 240 },
  { date: '2024-05-21', gpt3: 82, gpt4: 140, claude: 150 },
  { date: '2024-05-22', gpt3: 81, gpt4: 120, claude: 130 },
  { date: '2024-05-23', gpt3: 252, gpt4: 290, claude: 300 },
  { date: '2024-05-24', gpt3: 294, gpt4: 220, claude: 230 },
  { date: '2024-05-25', gpt3: 201, gpt4: 250, claude: 260 },
  { date: '2024-05-26', gpt3: 213, gpt4: 170, claude: 180 },
  { date: '2024-05-27', gpt3: 420, gpt4: 460, claude: 470 },
  { date: '2024-05-28', gpt3: 233, gpt4: 190, claude: 200 },
  { date: '2024-05-29', gpt3: 78, gpt4: 130, claude: 140 },
  { date: '2024-05-30', gpt3: 340, gpt4: 280, claude: 290 },
  { date: '2024-05-31', gpt3: 178, gpt4: 230, claude: 240 },
  { date: '2024-06-01', gpt3: 178, gpt4: 200, claude: 210 },
  { date: '2024-06-02', gpt3: 470, gpt4: 410, claude: 420 },
  { date: '2024-06-03', gpt3: 103, gpt4: 160, claude: 170 },
  { date: '2024-06-04', gpt3: 439, gpt4: 380, claude: 390 },
  { date: '2024-06-05', gpt3: 88, gpt4: 140, claude: 150 },
  { date: '2024-06-06', gpt3: 294, gpt4: 250, claude: 260 },
  { date: '2024-06-07', gpt3: 323, gpt4: 370, claude: 380 },
  { date: '2024-06-08', gpt3: 385, gpt4: 320, claude: 330 },
  { date: '2024-06-09', gpt3: 438, gpt4: 480, claude: 490 },
  { date: '2024-06-10', gpt3: 155, gpt4: 200, claude: 210 },
  { date: '2024-06-11', gpt3: 92, gpt4: 150, claude: 160 },
  { date: '2024-06-12', gpt3: 492, gpt4: 420, claude: 430 },
  { date: '2024-06-13', gpt3: 81, gpt4: 130, claude: 140 },
  { date: '2024-06-14', gpt3: 426, gpt4: 380, claude: 390 },
  { date: '2024-06-15', gpt3: 307, gpt4: 350, claude: 360 },
  { date: '2024-06-16', gpt3: 371, gpt4: 310, claude: 320 },
  { date: '2024-06-17', gpt3: 475, gpt4: 520, claude: 530 },
  { date: '2024-06-18', gpt3: 107, gpt4: 170, claude: 180 },
  { date: '2024-06-19', gpt3: 341, gpt4: 290, claude: 300 },
  { date: '2024-06-20', gpt3: 408, gpt4: 450, claude: 460 },
  { date: '2024-06-21', gpt3: 169, gpt4: 210, claude: 220 },
  { date: '2024-06-22', gpt3: 317, gpt4: 270, claude: 280 },
  { date: '2024-06-23', gpt3: 480, gpt4: 530, claude: 540 },
  { date: '2024-06-24', gpt3: 132, gpt4: 180, claude: 190 },
  { date: '2024-06-25', gpt3: 141, gpt4: 190, claude: 200 },
  { date: '2024-06-26', gpt3: 434, gpt4: 380, claude: 390 },
  { date: '2024-06-27', gpt3: 448, gpt4: 490, claude: 500 },
  { date: '2024-06-28', gpt3: 149, gpt4: 200, claude: 210 },
  { date: '2024-06-29', gpt3: 103, gpt4: 160, claude: 170 },
  { date: '2024-06-30', gpt3: 446, gpt4: 400, claude: 410 },
];

const chartConfig = {
  tokens: {
    label: 'Token 损耗',
  },
  gpt3: {
    label: 'GPT-3.5 Turbo',
    color: 'hsl(var(--chart-1))',
  },
  gpt4: {
    label: 'GPT-4o',
    color: 'hsl(var(--chart-2))',
  },
  claude: {
    label: 'Claude 3.5 Sonnet',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export function TokenValumOfUse() {
  const [activeModel, setActiveModel] = React.useState<keyof typeof chartConfig>('gpt3');

  const total = React.useMemo(
    () => ({
      gpt3: chartData.reduce((acc, curr) => acc + curr.gpt3, 0),
      gpt4: chartData.reduce((acc, curr) => acc + curr.gpt4, 0),
      claude: chartData.reduce((acc, curr) => acc + curr.claude, 0),
    }),
    [],
  );

  return (
    <Card className="shadow-none">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Token 损耗图表</CardTitle>
          <CardDescription>显示过去3个月不同模型的 token 损耗</CardDescription>
        </div>
        <div className="flex">
          {['gpt3', 'gpt4', 'claude'].map((key) => {
            const model = key as keyof typeof chartConfig;
            return (
              <button
                key={model}
                data-active={activeModel === model}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-4 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveModel(model)}
              >
                <span className="text-xs text-muted-foreground">{chartConfig[model].label}</span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[model as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('zh-CN', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="tokens"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('zh-CN', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeModel} fill={`var(--color-${activeModel})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
