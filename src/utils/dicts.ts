import { dictDetail as getDictDetail } from '@/api/dicts'
import { DictType } from '@/mock/dicts'

export async function fetchDict(params: { dictCode: string }): Promise<DictType[]> {
  const data = await getDictDetail(params)
  return data.dicts
}

