import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../../index';
import { PaginatedResponse } from '../models/pagination';
import { store } from '../store/storeConfig';
import { Post } from '../models/post';

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.getState().auth.user?.token;
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    if (process.env.NODE_ENV === 'development') {
      await sleep();
    }
    const pagination = response.headers['pagination'];
    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
      return response;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 400:
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 403:
        toast.error('You are not allowed to do that!');
        break;
      case 404: {
        history.push('/not-found');
        break;
      }
      case 500:
        history.push({ pathname: '/server-error', state: { error: data } });
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, data: FormData) =>
    axios
      .post(url, data, {
        headers: {
          'Content-type': `multipart/form-data`,
        },
      })
      .then((responseBody) => {
        console.log('responseBody', responseBody);
        // return responseBody;
      })
      .catch((err: any) => console.error(err)),
  putForm: (url: string, data: FormData) =>
    axios
      .put(url, data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then(responseBody),
};

function createFormData(item: any) {
  console.log('item', item);
  let formData = new FormData();

  Object.keys(item).forEach((key) => {
    console.log(key, item[key]);
    formData.append(key, item[key]);
  });
  console.log('formData', JSON.stringify(formData));
  return formData;
}

const AuthStore = {
  login: (loginDto: any) => requests.post('account/login', loginDto),
  register: (registerDto: any) =>
    requests.post('account/register', registerDto),
  fetchCurrentUser: () => requests.get('account'),
};

const PostStore = {
  createPost: (post: any) => requests.postForm('posts', createFormData(post)),
  updatePost: (post: any) =>
    requests.putForm(`posts/${post.id}`, createFormData(post)),
  followingPost: (postToFollow: Post) =>
    requests.post(`posts/${postToFollow.id}/follow`, postToFollow),
  getPost: (postId: string) => requests.get(`posts/${postId}`),
  deletePost: (postId: string) => requests.delete(`posts/${postId}`),
  getAllPosts: (params: URLSearchParams) => requests.get('posts', params),
  getAllFollowingPosts: (params: URLSearchParams) =>
    requests.get('posts/following', params),
};

const TagStore = {
  getTag: (tagName: string) => requests.get(`tags/${tagName}`),
  getAllTags: () => requests.get('tags'),
};

const agent = {
  AuthStore,
  PostStore,
  TagStore,
};

export default agent;
