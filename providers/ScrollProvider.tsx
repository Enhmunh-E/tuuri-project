import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ScrollContextInterface {
  scroll?: any;
  setScroll?: any;
}

const ScrollContext = createContext<ScrollContextInterface>({});

interface ScrollProviderProps {
  children: ReactNode;
}

export const ScrollProvider: FC<ScrollProviderProps> = ({ children }) => {
  const [scroll, setScroll] = useState<number>(0);

  return (
    <ScrollContext.Provider value={{ scroll, setScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = (): ScrollContextInterface =>
  useContext(ScrollContext);
