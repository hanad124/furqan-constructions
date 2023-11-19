import InvoiceCards from "@/components/InvoiceCards";
import Invoices from "@/components/Invoices";

const page = async () => {
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
