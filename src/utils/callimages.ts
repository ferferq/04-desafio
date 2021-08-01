import { api } from "../services/api";

export async function CallImages(pageParam: string = null) {
  const response = await api.get('/api/images', {
    params: {
      after: pageParam,
    }
  })

  return response;
}