import InvoiceCards from "@/components/invoice/cash/InvoiceCards";
import Invoices from "@/components/invoice/cash/Invoices";

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
