//In the top of the file we need to import the React and BoxProps and some hook we use in the code


interface WalletBalance {
    currency: string;
    amount: number;
}
interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
}

//delete this interface because it is not used
interface Props extends BoxProps {
    classes: {
        row: string; //add classes prop that we use at the render
    };
    children?: React.ReactNode; //because this is the optional prop so we need to add the ? mark
}


  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, classes, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();
    //the prop blockchain we need to add the type for that not at any type
    //in the switch case that we see all the cases are string so we need to add the type string
    const getPriority = (blockchain: string): number => {
        switch (blockchain) {
            case 'Osmosis':
                return 100
            case 'Ethereum':
                return 50
            case 'Arbitrum':
                return 30
            case 'Zilliqa':
                return 20
            case 'Neo':
                return 20
            default:
                return -99
        }
    }

    const sortedBalances: WalletBalance[] = React.useMemo(() => { //add type array of WalletBalance for this.
        return balances.filter((balance: WalletBalance) => { //this balance in WalletBalance type not contain blockchain property
            const balancePriority = getPriority(balance.currency); //here we need to change the balance.blockchain to balance.currency
            //lhsPriority is not defined in the code, and this will be balancePriority
            return balancePriority > -99 && balance.amount > 0; //change 2 if condition into this because filter return the true value
            //change the second if from balance.amount <= 0 to balance.amount > 0 because we need the value greater than 0
        }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
            const leftPriority = getPriority(lhs.currency); //change the lhs.blockchain to lhs.currency
            const rightPriority = getPriority(rhs.currency); //change the rhs.blockchain to rhs.currency
            
            if (leftPriority > rightPriority) {
                return -1;
            } else if (rightPriority > leftPriority) {
                return 1;
            }
            return 0; //if can not find the priority return 0
        });
    }, [balances]); //delete the prices because it is not used in the useMemo

    const formattedBalances: FormattedWalletBalance[] = sortedBalances.map((balance: WalletBalance) => { //add the type of this formattedBalances to array of FormattedWalletBalance
        
        return {
            ...balance,
            formatted: balance.amount.toFixed()
        }
    })

    const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;

        return (
            <WalletRow
                className={classes.row}
                key={index}
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={balance.formatted}
            />
        )
    })

    return (
        <div {...props}>
            {rows}
        </div>
    );
}