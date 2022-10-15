import { Entry } from "contentful";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import HomeLoading from "../components/HomeLoading";
import { ArticleType } from "../components/types";

interface MainProviderInterface {
<<<<<<< HEAD
  popUpLocation: PopUpLocationType | null;
  setPopUpLocation: Dispatch<SetStateAction<PopUpLocationType | null>>;
  popUpInUse: boolean;
  setPopUpInUse: Dispatch<SetStateAction<boolean>>;
  allArticles: ArticleType[];
  setAllArticles: Dispatch<SetStateAction<ArticleType[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}

type PopUpLocationType = {
  x: number;
  y: number;
};
=======
  currentDataIndex: any;
  setCurrentDataIndex: any;
}
>>>>>>> 9d52221 (Feature side-bar version1 & common onwheel event)

const MainContext = createContext<MainProviderInterface>(
  {} as MainProviderInterface
);
interface MainProviderProps {
  children: ReactNode;
}
export const MainProvider: FC<MainProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
<<<<<<< HEAD
  const [allArticles, setAllArticles] = useState<ArticleType[]>([]);
  const [popUpLocation, setPopUpLocation] = useState<PopUpLocationType | null>({
    x: 300,
    y: 300,
  });
  const [popUpInUse, setPopUpInUse] = useState(true);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 100);
  //   return () => clearTimeout(timer);
  // }, []);
  return (
    <MainContext.Provider
      value={{
        popUpInUse,
        setPopUpInUse,
        setPopUpLocation,
        popUpLocation,
        allArticles,
        setAllArticles,
        setLoading,
        loading,
      }}
    >
      {children}
=======
  const [currentDataIndex, setCurrentDataIndex] = useState<number>();
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <MainContext.Provider value={{ currentDataIndex, setCurrentDataIndex }}>
      {loading ? <HomeLoading /> : children}
>>>>>>> 9d52221 (Feature side-bar version1 & common onwheel event)
    </MainContext.Provider>
  );
};

export const useMainProvider = (): MainProviderInterface =>
  useContext(MainContext);
