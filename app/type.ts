type Doctor = {
  name: string;
  year: number;
  post: string;
  location: string;
  fee: number;
  rating?: number;
  count?: number;
  language: string[];
};

type Filter = {
  startRange: number;
  endRange: number;
  startFee: number;
  endFee: number;
  language: string;
  rating: number;
  location: string;
  search: string;
}