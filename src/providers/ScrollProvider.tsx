import { createContext, FC, ReactNode, useContext } from "react";

interface ScrollContextInterface {
  scroll?: any;
  setScroll?: any;
}

const ScrollContext = createContext<ScrollContextInterface>({});

interface ScrollProviderProps {
  children: ReactNode;
}

export const ScrollProvider: FC<ScrollProviderProps> = ({ children }) => {
  // const [scroll, setScroll] = useState<number>(0);

  return <ScrollContext.Provider value={{}}>{children}</ScrollContext.Provider>;
};

export const useScrollContext = (): ScrollContextInterface =>
  useContext(ScrollContext);
