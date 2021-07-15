export interface Param {
    name: string;
    type: string;
    indexed: boolean;
    decoded: boolean;
    value: string;
}

export interface Decoded {
    name: string;
    signature: string;
    params: Param[];
}

export interface eventItem {
    block_signed_at: Date;
    block_height: number;
    tx_offset: number;
    log_offset: number;
    tx_hash: string;
    _raw_log_topics_bytes?: any;
    raw_log_topics: string[];
    sender_contract_decimals?: any;
    sender_name?: any;
    sender_contract_ticker_symbol?: any;
    sender_address: string;
    sender_address_label?: any;
    sender_logo_url?: any;
    raw_log_data: string;
    decoded: Decoded;
}

export interface Pagination {
    has_more?: any;
    page_number: number;
    page_size: number;
    total_count?: any;
}

export interface eventData {
    updated_at: string;
    items: eventItem[];
    pagination: Pagination;
}

export interface RootObject {
    data: eventData;
    error: boolean;
    error_message?: any;
    error_code?: any;
}