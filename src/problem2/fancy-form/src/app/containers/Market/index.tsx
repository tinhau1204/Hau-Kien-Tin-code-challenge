import React from "react";
import useAxios from "axios-hooks";
import { TimeFilters } from "@/enums/TimeFilter";
import { DataProps } from "@/interfaces/DataProps";
import PrimaryChart from "@/app/components/PrimaryChart";

export type TimeStamp = number;
export type Price = number;

export interface GetMarketChartResponse {
  prices?: [TimeStamp, Price][];
}

export type MarketId = "bitcoin" | "ethereum" | "dogecoin" | "tether" | "binancecoin";

const MARKET_CHART_ID = "bitcoin";

export default function Market({ MarketId }: { MarketId: MarketId }) {
  const [timeFilter, setTimeFilter] = React.useState<string>(TimeFilters.P1D);
  const [{ data, loading, error }] = useAxios<GetMarketChartResponse | null>({
    url: `https://api.coingecko.com/api/v3/coins/${MarketId}/market_chart?vs_currency=usd&days=${timeFilter}`,
    method: "GET",
  }); "binancecoin"

  const mappedData: DataProps[] = React.useMemo(() => {
    return data?.prices
      ? data.prices.map((ele) => ({
        date: new Date(ele[0]),
        price: ele[1],
      }))
      : [];
  }, [data])

  return (
    <>
      {loading ? <div className="w-[600px] h-[264px] m-[16px 16px 40px 48px] flex justify-center items-center">Loading...</div> :
        mappedData?.length ? (
          <>

            <code className="text-base font-bold p-1">{MarketId.toLocaleUpperCase()}</code>

            <PrimaryChart
              data={mappedData}
              height={200}
              width={600}
              margin={{
                top: 16,
                right: 16,
                bottom: 40,
                left: 48,
              }}
            />
          </>
        ) : null}
    </>
  );
};
