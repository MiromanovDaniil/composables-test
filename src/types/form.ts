export interface FormField {
  value: any;
  rules: Array<(value: any) => boolean | string>;
}

export type FormData = Record<string, FormField>;

export interface FieldValidity {
  isValid: boolean;
  errorMessage: string;
}