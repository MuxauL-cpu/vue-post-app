import axios, { AxiosResponse } from "axios";

class Api {
  private _url: string;

  constructor(url: string) {
    this._url = url;
  }

  getPosts() {
    return axios.get(this._url).then((res) => this._getResponse(res));
  }

  private _getResponse(res: AxiosResponse): any {
    if (res.status >= 200 && res.status < 300) {
      return res.data;
    } else {
      return Promise.reject({
        status: res.status,
        statusText: res.statusText,
        error: res.data,
      });
    }
  }
}

const api = new Api("https://jsonplaceholder.typicode.com/posts");

export default api;
