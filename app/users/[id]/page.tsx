
import React from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { Card } from "@/components/ui/card";
// create a type for the data
interface User {
  id: string;
  username: string;
  roll: string;
  email: string;
  phone: string;
  password: string;
}

const getuser = async (id: string): Promise<User | null> => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as User;
  } else {
    return null;
  }
};

const page = async (props: any) => {
  const user = await getuser(props.params.id);
  const initials = user?.username
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
  return (
    <Card className="p-6 md:w-96 mx-auto mt-16">
      <div className="flex items-center justify-center">
        <Card className="w-16 h-16  rounded-full flex items-center justify-center">
          <Card className="w-20 h-16 px-3 rounded-full flex items-center justify-center text-2xl font-bold uppercase">
            {initials}
          </Card>
        </Card>
      </div>
      <div className="mt-4">
        <h2 className="text-xl text-center font-semibold">{user?.username}</h2>
        <p className=" text-center">{user?.roll}</p>
      </div>
      <div className="mt-6">
        <p className="">
          <span className="font-semibold">Email:</span> {user?.email}
        </p>
        <p className=" mt-2">
          <span className="font-semibold">Phone:</span> {user?.phone}
        </p>
        <p className=" mt-2">
          <span className="font-semibold">Password:</span>{" "}
          {user?.password.slice(0, 2) + "*****" + user?.password.slice(-2)}
        </p>
      </div>
    </Card>
  );
};

export default page;
