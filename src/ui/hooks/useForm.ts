import { useState } from "react";

interface UseFormProps<T> {
  initialState: T;
}

export default function useForm<T>({ initialState }: UseFormProps<T>) {
  const [state, setState] = useState<T>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const reset = () => {
    setState(initialState);
  };

  return { state, handleChange, reset } as const;
}