import request from '@/request/index.js'
import { UserType } from '@/types/user'

export const userLogin = (data: UserType): Promise<any> =>
  request.post("/userLogin", { data });

export const userRegi = (data: UserType): Promise<any> =>
  request.post("/userRegi", { data });