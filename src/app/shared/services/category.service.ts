import { Category } from "../models/category";
import { Injectable } from "@angular/core";
import { config } from "./config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class CategoryService extends BaseService<Category> {
  constructor(private httpClient: HttpClient) {
    super(httpClient, "categories");
  }

  /*createCategories(category: Category): Observable<object> {
    return this.httpClient.post(this.resourceURI, category);
  }

  getCategories(): Observable<object> {
    return this.httpClient.get(this.resourceURI);
  }

  getCategoryById(id: number): Observable<object> {
    return this.httpClient.get(this.resourceURI + id);
  }

  updateCategory(category: Category): Observable<object> {
    return this.httpClient.put(this.resourceURI + category.id, category);
  }

  deleteCategory(id: number): Observable<object> {
    return this.httpClient.delete(this.resourceURI + id);
  }*/
}
