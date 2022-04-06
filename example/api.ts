import axios, { AxiosResponse } from 'axios';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const getPosts = (): Promise<AxiosResponse<Post[]>> =>
  axios.get('https://jsonplaceholder.typicode.com/posts');
