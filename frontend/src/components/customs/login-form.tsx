"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { setToken, setUser } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const LoginFormSchema = z.object({
  password: z.string(),
});

type LoginFormInputs = {
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const { handleSubmit, setValue } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const { password } = data;

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: password }),
    });

    if (response.ok) {
      const result = await response.json();
      setUser(result.name);
      setToken(result.token);
      router.push("/search");
    } else {
      toast.error("密碼錯誤");
    }
  };

  const handlePasswordChange = (value: string) => {
    setValue("password", value);
  };

  return (
    <>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>樓長登入</CardTitle>
          <CardDescription className="text-red-400">
            僅限退宿負責人員登入
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-2">
            <div className="flex gap-3 items-center">
              <label htmlFor="password">密碼</label>
              <Input
                type="password"
                id="password"
                className="w-[300px]"
                onChange={(e) => handlePasswordChange(e.currentTarget.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button type="submit">登入</Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};

export default LoginForm;
