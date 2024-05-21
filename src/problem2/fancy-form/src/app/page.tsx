'use client';
import React, { useEffect } from "react";
import Market, { MarketId } from "./containers/Market";
import { Currency, fetchCurrency } from "@/api/currency";
import Form from "./containers/Form";

export default function Home() {
  type coinName = {
    syb: string;
    id: MarketId;
    classes?: string;
  }[];

  const coins: coinName = [
    { syb: "BTC", id: "bitcoin", classes: "!bg-[#f7931a]/70 !text-white" },
    { syb: "ETH", id: "ethereum", classes: "!bg-gray-500/70 !text-white" },
    { syb: "DOGE", id: "dogecoin", classes: "!bg-[#cb9800]/70 !text-white" },
    { syb: "USDT", id: "tether", classes: "!bg-[#26A17B]/70 !text-white" },
    { syb: "BNB", id: "binancecoin", classes: "!bg-[#F3BA2F]/70 !text-white" },
  ];
  const [marketId, setMarketId] = React.useState<MarketId>("bitcoin");
  const [listCurrency, setListCurrency] = React.useState<Currency[]>();


  useEffect(() => {
    fetchCurrency().then((res) => {
      setListCurrency(res)
    });
  }, []);

  return (
    <main className="flex w-screen min-h-screen flex-col items-center gap-8 p-10">
      <div className="z-10 w-full max-w-xl items-center justify-center font-mono lg:flex">
        <p className="fixed left-0 top-0 w-full flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 py-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <code className="font-mono font-bold text-2xl lg:text-4xl">WELCOME TO THE FANCY FORM !</code>
        </p>
      </div>

      <div className="w-full flex flex-col lg:flex-row justify-around items-center gap-6 px-2">
        <div className="flex flex-col items-center justify-center gap-4 px-2">
          <p className="text-lg font-mono font-bold text-center lg:text-lg">
            <code>All Represent Popular Crypto</code>
          </p>
          <div className="w-full flex flex-row items-center justify-between pb-4">
            {coins.map((coin) => (
              <button
                key={coin.id}
                className={`group relative overflow-hidden border-b border-gray-200 bg-gradient-to-b from-zinc-200 py-2 px-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto rounded-xl lg:border lg:bg-gray-200 lg:py-2 lg:px-4 lg:dark:bg-zinc-800/30 hover:bg-gray-300/10 ${marketId === coin.id ? `${coin.classes} scale-125` : ""
                  }`}
                onClick={() => setMarketId(coin.id)}
              >
                <span className={`font-mono font-bold text-white/70 text-base ${marketId === coin.id ? `!text-white` : ""} group-hover:text-white`}>
                  {coin.syb}
                </span>
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
              </button>
            ))}
          </div>

          <Market MarketId={marketId} />
        </div>


        <div className="w-full max-w-2xl">
          {listCurrency && <Form listCurrency={listCurrency} />}
        </div>
      </div>


    </main>
  );
}
