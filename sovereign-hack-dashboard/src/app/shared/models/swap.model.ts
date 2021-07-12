export interface SwapInterface {
    fromTokenAddress?: string,
    fromTokenName?: string,
    toTokenAddress?: string,
    toTokenName?: string,
    fromTokenValue?: string,
    toTokenValue?: string,
    traderName?: string,
    traderAddres?: string
}

export interface SwapData {
    swapdata: SwapInterface[],
    fromVal: {},
    toVal: {}
}