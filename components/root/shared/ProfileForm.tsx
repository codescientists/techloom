"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
 


const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  pincode: z.string(),
})

const ProfileForm = ({user}: any) => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: user?.name,
        email: user?.email,
        street: user?.street,
        city: user?.city,
        state: user?.state,
        pincode: user?.pincode,
      },
    })
    
    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
    }
    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" className="w-full bg-gray-100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" className="w-full bg-gray-100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col">
              <h5 className="text-md font-bold my-2">Address</h5>
              <div className="grid grid-cols-2 gap-4 w-full">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input placeholder="Street" className="w-full bg-gray-100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="city" className="w-full bg-gray-100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="State" className="w-full bg-gray-100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Pincode</FormLabel>
                      <FormControl>
                        <Input placeholder="Pincode" className="w-full bg-gray-100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit" className="mt-5" disabled>Submit</Button>
          </form>
        </Form>
    )    
}

export default ProfileForm

