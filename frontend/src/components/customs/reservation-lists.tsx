"use client";
import { CircleCheck, CircleX, Hourglass } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import FailButton from "./fail-button";
import PassButton from "./pass-button";

type reservationListsType = {
  id: number;
  room_id: string;
  create_at: string;
  is_checked: boolean;
  is_pass: boolean;
  check_person?: string;
};

const ReservationLists = ({
  res_lists,
}: {
  res_lists: reservationListsType[];
}) => {
  const { theme } = useTheme();
  const check_person = "vic";

  return (
    <>
      <Card>
        <CardContent className="space-y-2">
          {res_lists.map((res, index) => (
            <div
              key={index}
              className="grid grid-cols-3 p-[10px] m-[20px] border-2 drop-shadow-md border-neutral-300 rounded-md"
            >
              <div className="flex items-center text-2xl font-bold gap-1">
                {!res.is_checked ? (
                  <Hourglass
                    color={theme === "light" ? "#1C3144" : "#F1FAEE"}
                    size={35}
                  />
                ) : res.is_pass ? (
                  <CircleCheck color="#32CD32" size={35} />
                ) : (
                  <CircleX color="#E71D36" size={35} />
                )}
                {res.room_id}
              </div>
              <div>
                <div>預約時間：{res.create_at}</div>
                <div>
                  檢查結果：
                  {res.is_checked
                    ? res.is_pass
                      ? "檢查合格"
                      : "檢查不合格"
                    : "等待檢查"}
                </div>
                <div>
                  檢查人員：{res.check_person ? res.check_person : "尚未檢查"}
                </div>
              </div>
              {/*TODO: add-on authentication, only allow admin to control */}
              <div className="flex items-center justify-end mr-5 gap-2">
                <FailButton id={res.id} check_person={check_person} />
                <PassButton id={res.id} check_person={check_person} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default ReservationLists;
