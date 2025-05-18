export interface IRatingItem {
  id: number;
  place: number | string;
  description: string;
  url: {
    title: string;
    href: string;
  };
  year: number;
  priority: number;
}
