import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from '../products';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8000/api/products';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {
  private baseUrl = 'http://localhost:8000/api';
  // private getbaseUrl = 'http://localhost:8000/api/products';
  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  // signup admin
  signup(data) {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  // login admin
  login(data) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }
  // Gửi pass qua mail
  SendPasswordReset(data) {
    return this.http.post(`${this.baseUrl}/sendpasswordreset`, data);
  }
  // Lấy lại pass pass word
  changePassword(data) {
    return this.http.post(`${this.baseUrl}/resetpassword`, data);
  }
  // thông tin admin đăng nhập
  profile(data) {
    return this.http.get(`${this.baseUrl}/profile`, data);
  }
  // Quyền User
  role(data) {
    return this.http.get(`${this.baseUrl}/role/${data}`, data);
  }
  // PRODUCT --------------------------------------------------------------------------------------------------
  // get all Product
  getallProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl)
    .pipe(
      tap(heros => console.log('không có sản phẩm')),
      catchError(this.handleError('getallProduct', []))
    );
  }
  getallPro() {
    return this.http.get(`${this.baseUrl}/products`);
  }
  // Sách tương tự
  getBooksame(cate_id) {
    return this.http.get(`${this.baseUrl}/booksame/${cate_id}`);
  }
  // upload file
  upfile(slug, data) {
    return this.http.post(`${this.baseUrl}/upload/${slug}`, data);
  }
  // addProduct
  addProduct(data) {
    return this.http.post(`${this.baseUrl}/products`, data);
  }
  // edit product
  showdetail(id) {
    return this.http.get(`${this.baseUrl}/products/${id}`);
  }
  editPro(id, data) {
    // console.log(data);
    return this.http.put(`${this.baseUrl}/products/${id}`, data);
  }
  // delete product
  delete(id) {
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }


  // CATEGORY --------------------------------------------------------------------------------------------------
  // get all category
  getallCa() {
    return this.http.get(`${this.baseUrl}/categories`);
  }
  // add category
  addCategory(data) {
    return this.http.post(`${this.baseUrl}/categories`, data);
  }
  // Show detail category
  showCate(slug) {
    return this.http.get(`${this.baseUrl}/categories/${slug}`);
  }
  // Sửa danh mục
  editCate(slug, data) {
    return this.http.put(`${this.baseUrl}/categories/${slug}`, data);
  }
  delete_cate(id) {
    return this.http.delete(`${this.baseUrl}/categories/${id}`);
  }

  // customer----------------------------------------------------------------------------------------------------
  getallCustomer() {
    return this.http.get(`${this.baseUrl}/user`);
  }
  // Thêm customer
  addCustomer(data) {
    return this.http.post(`${this.baseUrl}/user`, data);
  }
  // Thông tin user
  showCustomer(slug) {
    return this.http.get(`${this.baseUrl}/user/${slug}`);
  }
  // Sửa thông tin user
  editCustomer(id, data) {
    // console.log(data);
    return this.http.put(`${this.baseUrl}/user/${id}`, data);
  }
  // Cập nhật ảnh User
  upfileUser(slug, data) {
    return this.http.post(`${this.baseUrl}/uploadUser/${slug}`, data);
  }
  // Xóa user
  deleteUser(id) {
    return this.http.delete(`${this.baseUrl}/user/${id}`);
  }
  // TICKET-----------------------------------------------------------------------------------------------------
  // Tạo phiếu
  createTicket(data) {
    return this.http.post(`${this.baseUrl}/ticket`, data);
  }
  // Danh sách phiếu
  listTicket() {
    return this.http.get(`${this.baseUrl}/ticket`);
  }
  // Chi tiết phiếu
  showTicket(code) {
    return this.http.get(`${this.baseUrl}/ticket/${code}`);
  }
  // Product Ticket
  ProTicket(id) {
    return this.http.get(`${this.baseUrl}/detail-ticket/${id}`);
  }
  // TICKET_DETAIL -----------------------------------------------------------------------------------------------
  // danh sách phiếu chi tiết
  listTicket_Detail() {
    return this.http.get(`${this.baseUrl}/ticket-detail`);
  }
  editTicket_Detail(id, data) {
    return this.http.put(`${this.baseUrl}/ticket-detail/${id}`, data);
  }
}
