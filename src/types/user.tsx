export interface UserType {
  id?: string,
  userName: string,
  userPassword: string,
  role?: string,
  city?: string,
  sort?: number,
  phonenumber?: string | number
}

export interface userlistParamsType {
  pageNum: number,
  pageSize: number,
  keyword?: string,
  city?: string,
  role?: string,
}  