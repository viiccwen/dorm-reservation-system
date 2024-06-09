"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";

interface PassButtonProps {
  id: number;
  check_person: string;
}

const FailButton = ({ id, check_person }: PassButtonProps) => {
  const HandleClick = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "update-reservation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          is_checked: true,
          is_pass: false,
          check_person: check_person,
        }),
      }
    );

    if (response.ok) {
      toast.success("已送出檢查結果：不合格");
      window.location.reload();
    } else {
      toast.error("送出檢查結果失敗");
    }
  };

  return <Button variant={"destructive"} onClick={HandleClick}>不合格</Button>
};

export default FailButton;