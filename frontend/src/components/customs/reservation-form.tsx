"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ReservationFormSchema = z.object({
  floor: z.string(),
  room: z.string(),
  bed: z.string(),
});

type ReservationFormInputs = z.infer<typeof ReservationFormSchema>;

const ReservationForm = () => {
  const { handleSubmit, setValue, reset, watch } =
    useForm<ReservationFormInputs>({
      resolver: zodResolver(ReservationFormSchema),
    });

  const [floor, setFloor] = useState("");
  const [room, setRoom] = useState("");
  const [bed, setBed] = useState("");
  const [BedNumber, setBedNumber] = useState(
    Array.from({ length: 6 }, (_, i) => i + 1)
  );
  const RoomNumber = Array.from({ length: 15 }, (_, i) => i + 1);
  const FloorNumber = Array.from({ length: 13 }, (_, i) => i + 2);

  const onSubmit: SubmitHandler<ReservationFormInputs> = async (data) => {
    const { floor, room, bed } = data;
    const room_id = `${floor}${room.padStart(2, "0")}-${bed}`;

    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "reservation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ room_id: room_id }),
      }
    );

    if (response.ok) {
      toast.success("預約成功");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      const error_message = response.json().then((data) => data.error);
      toast.error(error_message);
    }
  };

  const handleFloorChange = (value: string) => {
    setFloor(value);
    setValue("floor", value);
  };

  const handleRoomChange = (value: string) => {
    setRoom(value);
    setValue("room", value);

    if (value === "15") {
      setBedNumber(Array.from({ length: 4 }, (_, i) => i + 1));
    }
  };

  const handleBedChange = (value: string) => {
    setBed(value);
    setValue("bed", value);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>預約表單</CardTitle>
          <CardDescription className="text-red-500">
            送出預約前請先再三確認，如果回報"點錯"為理由要求刪除預約紀錄，將視為檢查不合格。
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-3 justify-around">
              <div className="flex items-center gap-3">
                <Label htmlFor="floor">樓層</Label>
                <Select onValueChange={(values) => handleFloorChange(values)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="選擇樓層" />
                  </SelectTrigger>
                  <SelectContent>
                    {FloorNumber.map((floor) => (
                      <SelectItem
                        key={`floor-${floor}`}
                        value={floor.toString()}
                      >
                        {floor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <Label htmlFor="room">房號</Label>
                <Select onValueChange={(values) => handleRoomChange(values)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="選擇房號" />
                  </SelectTrigger>
                  <SelectContent>
                    {RoomNumber.map((room) => (
                      <SelectItem key={`room-${room}`} value={room.toString()}>
                        {room}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <Label htmlFor="bed">床號</Label>
                <Select onValueChange={(values) => handleBedChange(values)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="選擇床號" />
                  </SelectTrigger>
                  <SelectContent>
                    {BedNumber.map((bed) => (
                      <SelectItem key={`bed-${bed}`} value={bed.toString()}>
                        {bed}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button
              type="submit"
              disabled={floor && bed && room ? false : true}
            >
              預約
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};

export default ReservationForm;
