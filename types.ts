
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  affiliateUrl: string;
  categoryId: string;
}

export interface NavItem {
  label: string;
  slug: string;
}
