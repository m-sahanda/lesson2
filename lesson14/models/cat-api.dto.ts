export interface ActionMessage {
    message: string;
}

export interface UploadImageResponse {
    id: string;
    url: string;
    sub_id?: string;
    width?: number;
    height?: number;
    original_filename?: string;
    pending?: number;
    approved?: number;
}

export interface ImageById {
    id: string;
    url: string;
    width: number;
    height: number;
    mime_type: string;
    breeds?: ImageBreedShort[];
    categories?: Category[];
    breed_ids?: string;
}

export interface FavouriteCreateResponse extends ActionMessage {
    id: number;
}

export interface FavouriteItem {
    id: number;
    user_id?: string;
    image_id: string;
    sub_id?: string;
    created_at?: string;
    image: UploadImageResponse;
}

export interface VoteCreateResponse extends ActionMessage {
    id: number;
    image_id: string;
    sub_id?: string;
    value: number;
    country_code?: string;
}

export interface VoteItem {
    id: number;
    image_id: string;
    sub_id?: string;
    value: number;
    image: UploadImageResponse;
}

export interface Breed {
    id: string;
    name: string;
    temperament?: string;
    origin?: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface ImageBreedShort {
    id: number;
    name: string;
}
