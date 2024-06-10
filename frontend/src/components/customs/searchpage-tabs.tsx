"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReservationLists from "@/components/customs/reservation-lists";
import ReservationSuspense from "@/components/customs/suspense/reservation-suspense";
import { useState, useEffect, Suspense, lazy } from "react";

import { getToken, getUser } from "@/lib/auth";

/*
const ReservationLists = lazy(
  () => import()
);
*/

const default_value = "all";

const tab_items = [
  {
    value: "all",
    label: "全部預約",
  },
  {
    value: "waiting",
    label: "等待檢查",
  },
  {
    value: "pass",
    label: "檢查合格",
  },
  {
    value: "fail",
    label: "檢查不合格",
  },
];

type reservationListsType = {
  id: number;
  room_id: string;
  is_checked: boolean;
  is_pass: boolean;
  check_person: string;
  create_at: string;
};

const SearchpageTabs = () => {
  const [all_data, setAllData] = useState<reservationListsType[]>([]);
  const [waiting_data, setWaitingData] = useState<reservationListsType[]>([]);
  const [pass_data, setPassData] = useState<reservationListsType[]>([]);
  const [fail_data, setFailData] = useState<reservationListsType[]>([]);
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const GetReservationLists = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "query-all-reservations",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const lists = await response.json();
      localStorage.setItem("reservationLists", JSON.stringify(lists));
      return lists;
    } else {
      throw new Error("Failed to fetch data");
    }
  };

  useEffect(() => {
    setUser(getUser());
    setToken(getToken());

    GetReservationLists()
      .then((lists) => setAllData(lists))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    // waiting_data
    const waiting_lists = all_data.filter((item) => item.is_checked === false);
    setWaitingData(waiting_lists);

    // pass_data
    const pass_lists = all_data.filter(
      (item) => item.is_checked === true && item.is_pass === true
    );
    setPassData(pass_lists);

    // fail_data
    const fail_lists = all_data.filter(
      (item) => item.is_checked === true && item.is_pass === false
    );
    setFailData(fail_lists);
  }, [all_data]);

  return (
    <>
      <Tabs defaultValue={default_value} className="w-[650px]">
        <TabsList className="grid w-full grid-cols-4">
          {tab_items.map((item) => (
            <TabsTrigger value={item.value} key={item.value}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <Suspense fallback={<ReservationSuspense />}>
            <ReservationLists res_lists={all_data} user={user} token={token} />
          </Suspense>
        </TabsContent>
        <TabsContent value="waiting">
          <Suspense fallback={<ReservationSuspense />}>
            <ReservationLists res_lists={waiting_data} user={user} token={token}/>
          </Suspense>
        </TabsContent>
        <TabsContent value="pass">
          <Suspense fallback={<ReservationSuspense />}>
            <ReservationLists res_lists={pass_data} user={user} token={token}/>
          </Suspense>
        </TabsContent>
        <TabsContent value="fail">
          <Suspense fallback={<ReservationSuspense />}>
            <ReservationLists res_lists={fail_data} user={user} token={token}/>
          </Suspense>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default SearchpageTabs;
