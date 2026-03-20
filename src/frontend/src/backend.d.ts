import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Video {
    id: string;
    title: string;
    video: ExternalBlob;
    description: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface ContactFormSubmission {
    id: string;
    forwarded: boolean;
    subject: string;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface AboutUs {
    mission: string;
    team: Array<string>;
    companyInfo: string;
    process: string;
}
export interface GalleryImage {
    id: string;
    title: string;
    description: string;
    category: string;
    image: ExternalBlob;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface PrintingSurface {
    id: string;
    title: string;
    description: string;
    image: ExternalBlob;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface backendInterface {
    addGalleryImage(id: string, title: string, description: string, category: string, image: ExternalBlob): Promise<void>;
    addPrintingSurface(id: string, title: string, description: string, image: ExternalBlob): Promise<void>;
    addVideo(id: string, title: string, description: string, video: ExternalBlob): Promise<void>;
    deleteGalleryImage(id: string): Promise<void>;
    deleteVideo(id: string): Promise<void>;
    ensureUniqueRestaurantImages(): Promise<void>;
    getAboutUs(id: string): Promise<AboutUs | null>;
    getContactFormSubmissions(): Promise<Array<ContactFormSubmission>>;
    getGalleryImages(): Promise<Array<GalleryImage>>;
    getGalleryImagesByCategory(category: string): Promise<Array<GalleryImage>>;
    getPrintingSurfaces(): Promise<Array<PrintingSurface>>;
    getVideoById(id: string): Promise<Video | null>;
    getVideos(): Promise<Array<Video>>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
    swapExteriorSubsections(): Promise<void>;
    swapInteriorSubsections(): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateAboutUs(id: string, companyInfo: string, mission: string, team: Array<string>, process: string): Promise<void>;
    updateGalleryImage(id: string, title: string, description: string, category: string, image: ExternalBlob): Promise<void>;
    updateVideo(id: string, title: string, description: string, video: ExternalBlob): Promise<void>;
}
