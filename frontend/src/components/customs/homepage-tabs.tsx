"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReservationForm from "./reservation-form";
import ReservationRules from "./reservation-rules";

const default_value = "rules";

const tab_items = [
  {
    value: "rules",
    label: "退宿規則",
  },
  {
    value: "res-form",
    label: "預約表單",
  },
];

const HomepageTabs = () => {
  return (
    <>
      <Tabs defaultValue={default_value} className="w-[650px]">
        <TabsList className="grid w-full grid-cols-2">
          {tab_items.map((item) => (
            <TabsTrigger value={item.value} key={item.value}>{item.label}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="rules">
          <ReservationRules />
        </TabsContent>
        <TabsContent value="res-form">
          <ReservationForm />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default HomepageTabs;
