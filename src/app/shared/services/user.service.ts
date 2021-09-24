import { Injectable } from "@angular/core";

import * as moment from "moment";
import { User } from "../models/user";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UserService extends BaseService<User> {
  selectedUser: User = new User();
  users: Array<User>;

  location = {
    lat: null,
    lon: null,
  };
  constructor(private httpClient: HttpClient) {
    super(httpClient, "users");
  }
  /*constructor() {
    this.getUsers();
  }*/

  getUsers() {
    //this.users = this.db.list("clients");
    return this.users;
  }

  getUserById(id: string) {}

  createUser(data: any) {
    const updatedData = {
      ...data,
      location: this.location,
      createdOn: moment(new Date()).format("X"),
      isAdmin: false,
    };
    this.users.push(updatedData);
  }

  isAdmin(emailId: string) {
    // return this.db.list("clients", (ref) =>
    //   ref.orderByChild("email").equalTo(emailId)
    // );
    return true;
  }

  updateUser(user: User) {
    //this.users.update(user.$key, user);
    return true;
  }

  setLocation(lat: any, lon: any) {
    this.location = { lat, lon };
  }
}
