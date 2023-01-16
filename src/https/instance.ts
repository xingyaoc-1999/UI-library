import { http } from "./index";

class Instance {
  async getServerData(url: string) {
    const response = await http.get(url);
    return response.data;
  }
}

export default new Instance();
