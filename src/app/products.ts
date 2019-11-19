export class Product {
    id: number;
    name: string;
    size: number;
    total_price: number;
    rating: string;
    img: any;
    description: string;
    weight: number;
    content: string;
    slug: string;
    author: string;
    company: string;
    pushlisher: string;
    translator: string;
    status: number;
    categories_id: number;
    href: string;
}
export class Category {
  data: {
  id: number;
  title: string;
  status: number;
  slug: string;
  };
}
export class Customer {
  data: {
  id: number;
  name: string;
  email: string;
  ma_customer: string;
  avatar: string;
  phone: string;
  gender: string;
  address: string;
  status: number;
  };
}
export class Ticket {
  data: {
    id: number;
    code: string;
    name_user: string;
    date_active: string;
    date_back: string;
    status: number;
  };
}
export class TicketDeatil {
  data: {
    ticket_id: number;
    name_book: string;
    code: string;
    name_user: string;
    date_active: string;
    date_back: string;
    status: number;
  };
}
