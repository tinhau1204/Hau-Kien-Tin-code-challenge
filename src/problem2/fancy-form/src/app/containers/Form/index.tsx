import React from "react";
import { Field, Formik, FormikHelpers, Form as FormikForm, useFormik } from "formik";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { Currency } from "@/api/currency";
import dayjs from "dayjs";

interface FormValues {
    amount: string;
    currentToken: Currency;
    exchangeToToken: Currency;
}

const initialValues: FormValues = {
    amount: '1',
    currentToken: {
        currency: "WBTC",
        date: "2023-08-29T07:10:52.000Z",
        price: 26002.82202020202,
    },
    exchangeToToken: {
        currency: "USDC",
        date: "2023-08-29T07:10:40.000Z",
        price: 0.989832,
    }
}

export default function Form({ listCurrency }: { listCurrency: Currency[] }) {

    const [data, setData] = React.useState<FormValues>({
        amount: '1',
        currentToken: initialValues.currentToken,
        exchangeToToken: initialValues.exchangeToToken,
    })
 
    function handleOnCurrentChange(event: React.ChangeEvent<{ value: unknown }>) {
        const value = event.target.value;
        if (typeof value === 'string') {
            setData(prev => ({
                ...prev,
                currentToken: JSON.parse(value),
            }));
        }
    }

    function handleOnExchangeChange(event: React.ChangeEvent<{ value: unknown }>) {
        const value = event.target.value;
        if (typeof value === 'string') {
            setData(prev => ({
                ...prev,
                exchangeToToken: JSON.parse(value),
            }));
        }
    }

    function handleExchange() {
        setData(prev => ({
            ...prev,
            currentToken: prev.exchangeToToken,
            exchangeToToken: prev.currentToken,
        }))
    }

    //if updated, we can add the function reset for the form 
    // function handleReset() {
    //     setData({
    //         amount: "1",
    //         currentToken: initialValues.currentToken,
    //         exchangeToToken: initialValues.exchangeToToken,
    //     });
    // }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(
                values: FormValues,
                { setSubmitting }: FormikHelpers<FormValues>
            ) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 500);
            }}
        >
            {props => (
                <FormikForm className="flex flex-col justify-center bg-white border rounded-xl p-4 gap-2 min-w-96 text-black" onSubmit={props.handleSubmit}>
                    <label htmlFor="amount">Input the Amount</label>
                    {/* chỉ có 1 dấu chấm hoặc 1 dấu phẩy, số tối đa, khôgn chữ */}
                    <TextField
                        size="small"
                        id="amount"
                        type="number"
                        name="amount"
                        variant="outlined"
                        onBlur={props.handleBlur}
                        value={data.amount}
                        onChange={(e) => setData((prev) => ({
                            ...prev,
                            amount: e.target.value,
                        }))}
                        InputProps={{
                            inputProps: { min: 1 }
                        }}
                    />

                    <div className="flex flex-row gap-4 w-full items-center">

                        <FormControl variant="filled" className="w-full">

                            <InputLabel id="currentToken">Current Token</InputLabel>
                            <Select
                                labelId="currentToken"
                                id="currentTokenSelect"
                                className="text-black"
                                onChange={(e) => handleOnCurrentChange(e as React.ChangeEvent<{ value: unknown }>)}
                                onBlur={props.handleBlur('currentTokenSelect')}
                                value={data.currentToken ? JSON.stringify(data.currentToken) : ""}
                                SelectDisplayProps={{ style: { display: 'flex', alignItems: "center", justifyItems: "flex-start", gap: "8px" } }}
                            >
                                {listCurrency.map((value, index) => (
                                    <MenuItem value={JSON.stringify(value)} key={index} className="flex gap-2 flex-row items-center">
                                        <img
                                            src={value.currency ? `/token/${value.currency}.svg` : `/token/coinDefault.svg`}
                                            alt="token"
                                            className="aspect-square w-7"
                                        />
                                        {/* this is from the eslint but I prefer to use img tag for showing the svg */}
                                        <span className="font-medium">{value.currency}</span>
                                    </MenuItem>
                                ))}
                            </Select>

                        </FormControl>

                        <Button
                            variant="text"
                            className="w-10 h-10"
                            onClick={handleExchange}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M4 9h13l-1.6 1.2a1 1 0 0 0-.2 1.4a1 1 0 0 0 .8.4a1 1 0 0 0 .6-.2l4-3a1 1 0 0 0 0-1.59l-3.86-3a1 1 0 0 0-1.23 1.58L17.08 7H4a1 1 0 0 0 0 2m16 7H7l1.6-1.2a1 1 0 0 0-1.2-1.6l-4 3a1 1 0 0 0 0 1.59l3.86 3a1 1 0 0 0 .61.21a1 1 0 0 0 .79-.39a1 1 0 0 0-.17-1.4L6.92 18H20a1 1 0 0 0 0-2"
                                />
                            </svg>
                        </Button>

                        <FormControl variant="filled" className="w-full">
                            <InputLabel id="exchangeToToken">Exchange To Token</InputLabel>
                            <Select
                                labelId="exchangeToToken"
                                id="exchangeToTokenSelect"
                                className="text-black"
                                onChange={(e) => handleOnExchangeChange(e as React.ChangeEvent<{ value: unknown }>)}
                                onBlur={props.handleBlur('exchangeToTokenSelect')}
                                value={data.exchangeToToken ? JSON.stringify(data.exchangeToToken) : ""}
                                SelectDisplayProps={{ style: { display: 'flex', alignItems: "center", justifyItems: "flex-start", gap: "8px" } }}

                            >
                                {listCurrency.map((value, index) => (
                                    <MenuItem value={JSON.stringify(value)} key={index} className="flex gap-2 flex-row items-center">
                                        <img
                                            src={value.currency ? `/token/${value.currency}.svg` : `/token/coinDefault.svg`}
                                            alt="token"
                                            className="aspect-square w-7"
                                        />
                                        {/* this is from the eslint but I prefer to use img tag for showing the svg */}
                                        <span className="font-medium">{value.currency}</span>
                                    </MenuItem>
                                ))}
                            </Select>

                        </FormControl>
                    </div>

                    <code>

                        {Number(data.amount)} {data.currentToken.currency} = {Number(data.amount) * (data.currentToken.price / data.exchangeToToken.price)} {data.exchangeToToken.currency}

                        <span className="ml-2 text-xs font-light text-gray-500">
                            Last updated {dayjs(data.currentToken.date).format("DD/MM/YY HH:mmA")}
                        </span>
                    </code>
                </FormikForm>
            )}

        </Formik>
    );
}