import InvoiceCards from "@/components/InvoiceCards";
import Invoices from "@/components/Invoices";
import connectMongoDB from "@/lib/mongodb";

const page = () => {
  // log the connection
  console.log(connectMongoDB);
  return (
    <>
      <div className="">
        <InvoiceCards />
        <Invoices />
      </div>
    </>
  );
};

export default page;
