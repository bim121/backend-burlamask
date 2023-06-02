import { ImageSearchBody } from "./imageSearchBody.interface";

export interface ImageSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: ImageSearchBody;
    }>;
  };
}