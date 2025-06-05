import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type InfoCardProps = {
  title: string;
  value: string | number;
};

const InfoCards = ({ title, value }: InfoCardProps) => {
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <h2 className="text-2xl capitalize">{title}</h2>
          </CardTitle>
          <CardDescription>
            <span>{title} basic details given</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="text-3xl font-bold text-center">{value}</h1>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
};

export default InfoCards;
