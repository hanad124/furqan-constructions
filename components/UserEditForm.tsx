import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

// create a type for the data
interface User {
  id: string;
  username: string;
  roll: string;
  email: string;
  phone: string;
  password: string;
}

// Define a schema for your form values.
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email format.",
  }),
  phone: z.string().regex(/^\d{10}$/, {
    message: "Invalid phone number format. Please enter a 10-digit number.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  role: z.string().optional(),
});

const UserEditForm = () => {
  // create a form instance with useForm
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "",
      phone: "",
    },
  });

  // handle role change
  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    form.setValue("role", event.target.value);
  };

  return <div>UserEditForm</div>;
};

export default UserEditForm;
