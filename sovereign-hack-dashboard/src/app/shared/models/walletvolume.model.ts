export interface WallterVolume {
    contract_decimals: number;
    contract_name: string;
    contract_ticker_symbol: string;
    contract_address: string;
    supports_erc?: any;
    logo_url: string;
    type: string;
    balance: string;
    balance_24h?: any;
    quote_rate: number;
    quote: number;
    nft_data?: any;
}