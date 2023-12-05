const SummaryBanner = ({ summaryTotal }: { summaryTotal: number }) => {
  return (
    <div>
      <div className="flex justify-end w-full">
        <div
          className="
        border-[1px] w-56 mx-w-76 rounded-10 border-b-slate-200 p-5 rounded-lg bg-slate-200/10 "
        >
          <div className="flex justify-between">
            <div className="flex flex-col gap-2 text-slate-500">
              <p>Subtotal : </p>
              <p>Discount : </p>
            </div>
            <div className="flex flex-col gap-2 text-slate-500">
              <p>${summaryTotal}</p>
              <p>$0.00</p>
            </div>
          </div>
          <div className="border-b-[1px] border-b-slate-200 w-full my-4"></div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-2 text-slate-500">
              <p>Total : </p>
            </div>
            <div className="flex flex-col gap-2 text-slate-500">
              <p>$0.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryBanner;
