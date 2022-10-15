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
  popUpLocation: PopUpLocationType | null;
  setPopUpLocation: Dispatch<SetStateAction<PopUpLocationType | null>>;
  popUpInUse: boolean;
  setPopUpInUse: Dispatch<SetStateAction<boolean>>;
  allArticles: ArticleType[];
  setAllArticles: Dispatch<SetStateAction<ArticleType[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  currentDataIndex: any;
  setCurrentDataIndex: any;
}

type PopUpLocationType = {
  x: number;
  y: number;
};

const MainContext = createContext<MainProviderInterface>(
  {} as MainProviderInterface
);
interface MainProviderProps {
  children: ReactNode;
}
export const MainProvider: FC<MainProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [allArticles, setAllArticles] = useState<ArticleType[]>([]);
  const [currentDataIndex, setCurrentDataIndex] = useState<number>();
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
        currentDataIndex,
        setCurrentDataIndex,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainProvider = (): MainProviderInterface =>
  useContext(MainContext);
