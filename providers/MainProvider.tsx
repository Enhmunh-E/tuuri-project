import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";
import HomeLoading from "../components/HomeLoading";

interface MainProviderInterface {}

const MainContext = createContext<MainProviderInterface>(
  {} as MainProviderInterface
);
interface MainProviderProps {
  children: ReactNode;
}
export const MainProvider: FC<MainProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <MainContext.Provider value={{}}>
      {loading ? <HomeLoading /> : children}
    </MainContext.Provider>
  );
};

export const useMainProvider = (): MainProviderInterface =>
  useContext(MainContext);
