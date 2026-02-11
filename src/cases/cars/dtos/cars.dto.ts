export interface CarDTO {
  id?: string;
  name: string;
  description?: string;
  active: boolean;
  brand?: string; // agora é texto simples
  imageUrl?: string;
}
