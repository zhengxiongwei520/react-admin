interface DictType {
  dictName: string,
  dictValue: string,
  dictCode: string
}

export function DictToLabel(dictValue: string, dictList: DictType[]) {
  const index = dictList.findIndex(e => e.dictValue === dictValue)
  return index !== -1 ? dictList[index].dictName : ''
}