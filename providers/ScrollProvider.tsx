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

  useEffect(() => {
    window.addEventListener("mousewheel", (e: Event) => {
      const ev: WheelEvent = e as unknown as WheelEvent;
      setScroll(scroll + ev.deltaY);
    });
  }, []);

  return (
    <ScrollContext.Provider value={{ scroll, setScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = (): ScrollContextInterface =>
  useContext(ScrollContext);
