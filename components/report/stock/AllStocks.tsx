"use client";

import React, { forwardRef, Ref } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { stockColumns, allStocksColumns } from "@/data/stockColumns";
import { getStocks } from "@/utils/db/Stocks";
import { Stock, IStock } from "@/types/generalTypes";

const AllStocks = forwardRef<HTMLDivElement>(
  (props, ref: Ref<HTMLDivElement>) => {
    const [stocks, setStocks] = useState<IStock[]>([]);
    const [totalStocks, setTotalStocks] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    // get stocks
    useEffect(() => {
      const getStocksData = async () => {
        setLoading(true);
        const stocksData: any = await getStocks();

        // match all the stocks with the same stock name and add their quantity
        const stocksDataMap = new Map<string, number>();
        stocksData.forEach((stock: Stock) => {
          if (stocksDataMap.has(stock.stock)) {
            const stockQuantity = stocksDataMap.get(stock.stock) || 0;
            stocksDataMap.set(stock.stock, stockQuantity + stock.quantity);
          } else {
            stocksDataMap.set(stock.stock, stock.quantity);
          }
        });

        // convert the map to an array
        const stocksDataArray: IStock[] = [];
        stocksDataMap.forEach((value: number, key: string) => {
          // add unique id to each stock
          const id = Math.floor(Math.random() * 1000000);
          stocksDataArray.push({
            id,
            stock: key,
            quantity: value,
          });
        });
        console.log("stocksDataArray:", stocksDataArray);
        setStocks(stocksDataArray);

        // get total stocks
        let totalStocks = 0;
        stocksDataArray.forEach((stock) => {
          totalStocks += stock.quantity;
        });

        setTotalStocks(totalStocks);
      };

      getStocksData();
      setLoading(false);
    }, []);

    const NoPagination = () => null;
    return (
      <div ref={ref}>
        {/* beautiful report title with subtitle */}

        <DataGrid
          className="datagrid dark:text-slate-200  mt-10 mx-4"
          rows={stocks}
          columns={allStocksColumns}
          components={{
            Pagination: NoPagination, // Hide the default pagination component
          }}
        />
        {/* buautiful banner or card that displays total quantity of the stock */}
        <div className="flex flex-col items-start ml-56 justify-start mt-5">
          <p className="text-xl  text-slate-700">
            {loading ? "" : `${totalStocks}`}
          </p>
        </div>
      </div>
    );
  }
);

export default AllStocks;
