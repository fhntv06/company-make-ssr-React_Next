export interface VacancyLink {
  id: number;
  title: string;
  url: string;
  active: boolean;
}

export interface VacancyCard {
  id: number;
  title: string;
  links: VacancyLink[];
}
