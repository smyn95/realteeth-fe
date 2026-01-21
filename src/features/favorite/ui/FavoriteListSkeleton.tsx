import { Card, CardContent, CardHeader } from '@/components/ui/card';

type Props = {
  count: number;
};

export function FavoriteListSkeleton({ count }: Props) {
  return (
    <ul className="grid grid-cols-1 gap-3">
      {Array.from({ length: count }).map((_, index) => (
        <li key={index} className="list-none">
          <Card className="animate-pulse gap-0 border-slate-200 bg-white py-0 shadow-none">
            <CardHeader className="p-4 pr-20 pb-0">
              <div className="h-4 w-24 rounded-md bg-slate-100" />
            </CardHeader>

            <CardContent className="flex items-center justify-between p-4 pt-3">
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline gap-1">
                  <div className="h-8 w-12 rounded-lg bg-slate-200" />
                </div>

                <div className="mt-1 flex items-center gap-3">
                  <div className="h-3 w-10 rounded bg-slate-100" />
                  <div className="h-3 w-10 rounded bg-slate-100" />
                </div>
              </div>

              <div className="size-12 rounded-full bg-slate-100" />
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
