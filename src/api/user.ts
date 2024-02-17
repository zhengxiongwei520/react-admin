import request from '@/request/index.js'
import { UserType } from '@/types/user'
// import { ResponseType } from '@/types/request'
import { userlistParamsType } from '@/types/user'

export const userList = (params: userlistParamsType): Promise<{ list: UserType[], total: number }> =>
  request.get("/userList", { params });

export const delUser = (data: { userId?: string }): Promise<any> =>
  request.post("/delUser", { data });

export const updateUser = (data: UserType): Promise<any> =>
  request.post("/updateUser", { data });

export const addUser = (data: UserType): Promise<any> =>
  request.post("/addUser", { data });


