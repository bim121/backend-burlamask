import { ChangedImageEntity } from 'src/entity/changedImage.entity';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ImageSearchResult } from 'src/types/imageSearchResult.interface';
import { ImageSearchBody } from 'src/types/imageSearchBody.interface';
 
@Injectable()
export default class ChangedImageSearchService {
  index = 'changedimage'
 
  constructor(
    private readonly elasticsearchService: ElasticsearchService
  ) {}
 
  async indexPost(changedImage: ChangedImageEntity) {
    return this.elasticsearchService.index<ImageSearchBody>({
      index: this.index,
      body: {
        id: changedImage.id,
        description: changedImage.description
      }
    })
  }
 
  async search(text: string) {
    const { body } = await this.elasticsearchService.search<ImageSearchResult>({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['description']
          }
        }
      }
    })
    const hits = body.hits.hits;
    return hits.map((item) => item._source);
  }
}