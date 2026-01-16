
import { Category } from './types';

export const SITE_NAME = "huime";
export const FULL_BRAND_NAME = "HUIME";
export const CONTACT_EMAIL = "huimework1@gmail.com";

// CSV endpoint for the provided Google Sheet
export const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQxgJYTNvByYT9pawW6BsOn9Y7XD9J4FAsuiV1pRb9sJRVXAwVWyDhfWVUuejgbpU2aCZuM879JQZXY/pub?gid=0&single=true&output=csv";

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Công nghệ', slug: 'cong-nghe', icon: '💻' },
  { id: '2', name: 'Gia dụng', slug: 'gia-dung', icon: '🏠' },
  { id: '3', name: 'Sức khỏe', slug: 'suc-khoe', icon: '🍎' },
  { id: '4', name: 'Làm đẹp', slug: 'lam-dep', icon: '💄' },
];

export const PRODUCTS = [];
