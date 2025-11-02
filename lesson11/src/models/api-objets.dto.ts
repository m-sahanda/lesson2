export interface ApiObjectDataDto {
    color?: string;
    'capacity GB'?: string | number;
    price?: number;
    generation?: string;
    year?: number | string;
    'CPU model'?: string;
    'Hard disk size'?: string | number;
    'Strap Colour'?: string;
    'Case Size'?: string;
    Description?: string;
    Capacity?: string | number;
    'Screen size'?: number | string;
    Generation?: string;
    [key: string]: unknown;
}

export interface ApiObjectRawDto {
    id: string;
    name?: string;
    data?: ApiObjectDataDto | null;
}
