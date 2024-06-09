"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const rules: { text: string; link_text?: string; link?: string }[] = [
  {
    text: "1.本網站僅於宿舍幹部在值班時間時專用，其餘時段請至一樓宿管提出退宿檢查要求。",
    link_text: "點選我查看宿舍幹部值班表",
    link: "/退宿班表.png",
  },
  { text: "2.幹部值班人員每20分鐘執行批次檢查。" },
  { text: "3.退宿前請先確保床位已符合退宿規定。" },
  { text: "4.請在檢查前待在床位上，以便有不合格時可馬上清理。" },
  { text: "5.最多可檢查兩次，若初次檢查不合格，請重新填寫預約表單。" },
  {
    text: "6.若第二次檢查仍不合格，本表單將不再受理你的預約，扣除保證金等處罰請自行負責。",
  },
  {
    text: "7.若有其他退宿問題，請",
    link_text: "點擊我加入退宿處理line群",
    link: "https://line.me/ti/g/_WQjA9L3U9",
  },
  {
    text: "8.查看退宿檢查規定請",
    link_text: "點擊我",
    link: "https://student.ntust.edu.tw/p/406-1053-124295,r1436.php?Lang=zh-tw",
  },
  { text: "9.請於檢查完畢後，至一樓宿管還回鑰匙並簽名。" },
];

const ReservationRules = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>退宿規則</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {rules.map((rule, index) => (
            <div key={index} className="space-y-1">
              <div>
                {rule.text}{" "}
                {rule.link_text ? (
                  <a
                    href={rule.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {rule.link_text}
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default ReservationRules;