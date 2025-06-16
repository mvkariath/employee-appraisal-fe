"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // const result = await signIn("credentials", {
      //   email: values.email,
      //   password: values.password,
      //   redirect: false,
      // });

      // if (result?.error) {
      //   throw new Error(result.error);
      // }

    //  ##########
    //  routing based on role
    //  ##########

      const dummyAccessToken = {
        id: 1,
        email: "hr@example.com",
        name: "HR Manager",
        role: "hr",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJociFAZXhhbXBsZS5jb20iLCJuYW1lIjoiSFIgTWFuYWdlciIsInJvbGUiOiJociIsImlhdCI6MTY5ODAwMDAwMCwiZXhwIjoxNjk4MDAzNjAwfQ.WgEqhcOlo9CnPmlcVbIbnfnzV02V5cGzDDfVdn1oVxY"
      }


      const role =dummyAccessToken?.role; // adjust depending on your session shape

      if (role === "hr") {
        router.push("/hr/dashboard");
      } else if (role === "lead") {
        router.push("/leads/dashboard");
      } else if (role === "employee") {
        router.push("/employee/dashboard");
      } else {
        toast.error("Invalid role");
      }


      // if (values.email === values.password) {
      //   router.push("/dashboard");
      // }
    } catch (error) {
      toast("login failed");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="user@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Form>
  );
}
