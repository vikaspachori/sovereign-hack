export interface LendingStats {
    assetName: string,
    logo: string,
    assetsupplied: string,
    assetborrowed: string,
    available: string,
    supplyAPR: string,
    borrowAPR: string,
}

export interface LendingDataForGet {
    abi: string
    address: string
    blockNumber: string
}

export interface LendingData {
    name: string,
    value: any
}