import { Product } from "../../../../shared/models/product";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../../../shared/services/product.service";
import { ToastrService } from "src/app/shared/services/toastr.service";
import { User } from "../../../../shared/models/user";
import { Category } from "../../../../shared/models/category";
import { UserService } from "../../../../shared/services/user.service";
import { CategoryService } from "../../../../shared/services/category.service";
import { BaseService } from "../../../../shared/services/base.service";
@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private sub: any;
  product: Product;
  seller: User;
  category: Category;
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private categoryService: CategoryService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      const id = params.id; // (+) converts string 'id' to a number
      this.getProductDetail(id);
    });
  }

  private loadResource(
    method: string,
    httpService: BaseService<any>,
    methodInfo: any
  ) {
    httpService[method](methodInfo.recourceId).subscribe(
      methodInfo.callback,
      (error) => {
        this.toastrService.error(methodInfo.onError, error);
      }
    );
  }

  getProductDetail(id: number) {
    this.loading = true;
    this.productService.getById(id).subscribe(
      (product: Product) => {
        this.product = product;
        this.loadResource("getById", this.userService, {
          recourceId: product.userId,
          callback: (resource) => {
            this.seller = resource;
          },
          onError: "Error while fetching seller Detail",
        });
        this.loadResource("getById", this.categoryService, {
          recourceId: product.categoryId,
          callback: (resource) => {
            this.category = resource;
          },
          onError: "Error while fetching seller Detail",
        });
        this.loading = false;
      },
      (error) => {
        this.toastrService.error("Error while fetching Product Detail", error);
      }
    );
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
