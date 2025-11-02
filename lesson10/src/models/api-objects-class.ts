import { ApiObjectRawDto } from './api-objets.dto';

class ApiObjectData {
    public color?: string;
    public 'capacity GB'?: number | string;
    public price?: number;
    public generation?: string;
    public year?: number | string;
    public 'CPU model'?: string;
    public 'Hard disk size'?: number | string;
    public 'Strap Colour'?: string;
    public 'Case Size'?: string;
    public Description?: string;
    public Capacity?: number | string;
    public 'Screen size'?: number | string;
    public Generation?: string;

    public constructor(row: Record<string, unknown>) {
        this.color = row?.['color'] as string;
        this.Capacity = row?.['Capacity'] as number | string;
        this['capacity GB'] = row?.['capacity GB'] as number | string;
        this.price = row?.['price'] as number;
        this.generation = row?.['generation'] as string;
        this.year = row?.['year'] as number | string;
        this['CPU model'] = row?.['CPU model'] as string;
        this['Hard disk size'] = row?.['Hard disk size'] as number | string;
        this['Strap Colour'] = row?.['Strap Colour'] as string;
        this['Case Size'] = row?.['Case Size'] as string;
        this.Description = row?.['Description'] as string;
        this['Screen size'] = row?.['Screen size'] as number | string;
        this.Generation = row?.['Generation'] as string;
    }
}

export class ApiObjectDataResponse {
    public id: string;
    public name?: string;
    public data?: ApiObjectData | null;
    public constructor(row: Record<string, unknown>) {
        this.id = row['id'] as string;
        this.name = row?.['name'] as string;
        this.data = row?.['data'] ? new ApiObjectData(row['data'] as Record<string, unknown>) : null;
    }
}

export class ApiObjectInterfaceSummary {
    public id: string;
    public title: string;
    public specsCount: number;
    public price: number | string;
    public capacityGb: number | string;

    public constructor(obj: ApiObjectRawDto) {
        this.id = obj.id;

        const name = obj.name ?? 'Unknown object';
        const color = obj.data?.color;
        this.title = color ? `${name} painted in (${color})` : name;

        const data = obj.data ?? null;
        this.specsCount = data ? Object.keys(data).length : 0;

        const priceVal = data?.price as unknown;
        const priceNum = typeof priceVal === 'number' ? priceVal : Number(priceVal);
        this.price = Number.isFinite(priceNum) ? (priceNum as number) : 'Please call as to get a price';

        const capVal = (data && (data['capacity GB'] ?? (data as Record<string, unknown>)['Capacity'])) as unknown;
        const capNum = typeof capVal === 'number' ? capVal : Number(capVal as string);
        this.capacityGb = Number.isFinite(capNum) ? (capNum as number) : 'Unknown capacity, you can call as to get a capacity';
    }
}
