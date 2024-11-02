"use client";
import { Button, Card } from "antd";
import { useState } from "react";
import { ICategory } from "./interface/category.interface";
import fruitOrVegetable from "./mockData/fruitOrVegetable.json";

const Page = () => {
  const [data, setData] = useState<ICategory[]>(fruitOrVegetable);
  const [fruit, setFruit] = useState<ICategory[]>([]);
  const [vegetable, setVegetable] = useState<ICategory[]>([]);
  const [timeouts, setTimeouts] = useState<{ [name: string]: NodeJS.Timeout }>(
    {}
  );

  const onClickToCategory = async (item: ICategory) => {
    const { name, type } = item;
    if (timeouts[name]) {
      clearTimeout(timeouts[name]);
    }

    if (type === "Fruit") {
      setFruit((prev) => [...prev, item]);
    } else {
      setVegetable((prev) => [...prev, item]);
    }
    setData((prev) => prev.filter(({ name: prevName }) => prevName !== name));

    const timeoutId = setTimeout(() => {
      onClickBackToMain(item);
    }, 5000);

    setTimeouts((prev) => ({
      ...prev,
      [name]: timeoutId,
    }));
  };

  const onClickBackToMain = async (item: ICategory) => {
    const { name, type } = item;
    if (timeouts[name]) {
      clearTimeout(timeouts[name]);
    }
    if (type === "Fruit") {
      setFruit((prev) =>
        prev.filter(({ name: fruitName }) => fruitName !== name)
      );
    } else {
      setVegetable((prev) =>
        prev.filter(({ name: vegetableName }) => vegetableName !== name)
      );
    }
    setData((prev) => [...prev, item]);
  };

  return (
    <div className="w-full h-[100dvh]">
      <div className="flex justify-center gap-5 pt-5">
        <div className="flex">
          <Card className="text-center w-[250px]">
            <div className="flex flex-col gap-2">
              {data.map((item, index) => (
                <Button
                  key={`${item.name}-${index}`}
                  onClick={() => onClickToCategory(item)}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </Card>
        </div>
        <div className="flex">
          <Card title="Fruit" className="text-center w-[250px]">
            <div className="flex flex-col gap-2">
              {fruit.map((item, index) => (
                <Button
                  key={`${item.name}-${index}`}
                  onClick={() => onClickBackToMain(item)}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </Card>
        </div>
        <div className="flex">
          <Card title="Vegetable" className="text-center w-[250px]">
            <div className="flex flex-col gap-2">
              {vegetable.map((item, index) => (
                <Button
                  key={`${item.name}-${index}`}
                  onClick={() => onClickBackToMain(item)}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
