import { Component, OnInit } from "@angular/core";
import { Product } from "../../../../shared/models/product";
// import { AuthService } from "../../../../shared/services/auth.service";
import { ProductService } from "../../../../shared/services/product.service";
import { CategoryService } from "../../../../shared/services/category.service";
import { ToastrService } from "src/app/shared/services/toastr.service";
import { Category } from "../../../../shared/models/category";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  categories: Category[];
  loading = false;
  selectedBrand: "All";

  page = 1;

  constructor(
    // public authService: AuthService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.loadCatergories();
  }

  getAllProducts() {
    this.loading = true;
    this.productService.getList().subscribe(
      (productList: Product[]) => {
        this.loading = false;
        this.products = productList;
      },
      (err) => {
        this.toastrService.error("Error while fetching Products", err);
      }
    );
  }

  removeProduct(key: string) {
    this.productService.deleteProduct(key);
  }

  addFavourite(product: Product) {
    this.productService.addFavouriteProduct(product);
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }

  private loadCatergories() {
    this.categoryService.getList().subscribe(
      (categoryList: Category[]) => {
        this.categories = categoryList;
        this.getAllProducts();
      },
      (err) => {
        this.toastrService.error("Error while fetching Categories", err);
      }
    );
  }

  getCategory(id: number) {
    return this.categories.find((cat) => cat.id == id);
  }
}
