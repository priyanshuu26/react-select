export interface Option {
    value: string;
    label: string;
    disabled?: boolean;
  }
  
  export interface SelectProps {
    options: Option[];
    clearable?: boolean;
    noResultsMessage?: string;
    isMulti?: boolean;
    onChange?: (selected: Option[] | Option | null) => void;
  }
  