export interface signUp {
  name: string;
  email: string;
  password: string;
}
export interface login {
  email: String;
  password: String;
}
export interface product{
  name:string,
  price:number,
  category:string,
  color:string,
  image:string,
  description:string,
  specification:string,
  id:number,
  quantity:undefined | number,
  productId:undefined | number
}