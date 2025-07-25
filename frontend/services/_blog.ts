import { API } from './_api';

export interface CreatPayload {
    title: string;
    content: string;
}

export interface CreatApiResponse<T = any> {
    success: boolean,
    message: string,
    info: {
        id: string;
        title: string;
        content: string;
        published: boolean;
        createdAt: string;
        updatedAt: string;
        userID: string;
    }
  }

export async function creatPost(payload: CreatPayload, token: string):Promise<CreatApiResponse> {
    const { data } = await API.post<CreatApiResponse>('/posts', payload, {headers: { Authorization: `Bearer ${token}` }});
    return data;
  }