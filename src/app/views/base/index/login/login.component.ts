import { ToastrService } from "../../../../shared/services/toastr.service";
import { NgForm, EmailValidator } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../../../shared/services/user.service";
import { AuthService } from "../../../../shared/services/auth.service";
import { User } from "../../../../shared/models/user";
declare var $: any;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [EmailValidator],
})
export class LoginComponent implements OnInit {
  user = {
    emailId: "",
    loginPassword: "",
  };

  errorInUserCreate = false;
  errorMessage: any;
  createUser;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createUser = new User();
  }

  ngOnInit() {}

  addUser(form: object) {}

  signInWith(provider: string) {
    this.authService.signInWith(provider).subscribe((res) => {
      // if (res.additionalUserInfo.isNewUser) {
      //   this.userService.createUser(res.additionalUserInfo.profile);
      // }
      // const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
      // location.reload();
      this.router.navigate(["/"]);
    });
  }
}
