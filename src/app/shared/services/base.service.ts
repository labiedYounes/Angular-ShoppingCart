import { config } from "./config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export class BaseService<T> {
  private resourceURI = config.backendUrl + "/categories/";
  protected baseHttpClient: HttpClient;
  protected resource: T;
  protected resourceList: Array<T>;

  constructor(httpClient: HttpClient, resourcePath: string) {
    this.baseHttpClient = httpClient;
    this.resourceURI = `${config.backendUrl}/${resourcePath}/`;
  }

  create(resource: T): Observable<object> {
    return this.baseHttpClient.post(this.resourceURI, resource);
  }

  getList(): Observable<object> {
    return this.baseHttpClient.get(this.resourceURI);
  }

  getById(id: number): Observable<object> {
    return this.baseHttpClient.get(this.resourceURI + id);
  }

  update(resource: T): Observable<object> {
    return this.baseHttpClient.put(this.resourceURI + resource["id"], resource);
  }

  delete(id: number): Observable<object> {
    return this.baseHttpClient.delete(this.resourceURI + id);
  }
}
