import type { PexelsImage } from "./PexelsImage"

export type PexelsResponse = {
    nextPage: string,
    page: number,
    perPage: number,
    photos: PexelsImage[],
    total_results: number,
}

