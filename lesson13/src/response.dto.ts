export interface ActionMessage {
    message: string;
}

export interface UploadImageResponse {
    id: string;
    url?: string;
}

export interface ImageById {
    id: string;
    url: string;
    breeds?: Breed[];
}

export interface ImageSearchItem {
    id: string;
    url: string;
    breeds?: Breed[];
}

export interface FavouriteCreateResponse extends ActionMessage {
    id: number;
}

export interface FavouriteItem {
    id: number;
    image_id: string;
    sub_id?: string;
    image: UploadImageResponse;
}

export interface VoteCreateResponse extends ActionMessage {
    id: number;
    image_id: string;
    sub_id?: string;
    value: number;
    image: UploadImageResponse;
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
