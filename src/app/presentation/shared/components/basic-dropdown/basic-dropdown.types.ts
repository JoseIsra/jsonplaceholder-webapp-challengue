export type DropdownOption<T = string> = {
  id: T;
  name: string;
} & Record<string, any>;
