import WebConstant from './WebConstant';

class WebApi {
  static async request<T = unknown>(_path: string, _method: string = WebConstant.GET, _body?: unknown): Promise<T | null> {
    return null;
  }

  static get<T = unknown>(path: string) {
    return WebApi.request<T>(path, WebConstant.GET);
  }

  static post<T = unknown>(path: string, body?: unknown) {
    return WebApi.request<T>(path, WebConstant.POST, body);
  }
}

export default WebApi;
