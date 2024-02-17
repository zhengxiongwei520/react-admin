import request from '@/request/index.js'
import { DictType } from '@/mock/dicts'

export const dictDetail = (params: { dictCode: string }): Promise<{ dicts: DictType[] }> =>
  request.get("/dictDetail", { params });    