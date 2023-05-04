import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  Dispatch,
  SetStateAction,
} from "react";
import { ArticleType } from "@components";

interface MainProviderInterface {
  popUpLocation: PopUpLocationType | null;
  setPopUpLocation: Dispatch<SetStateAction<PopUpLocationType | null>>;
  popUpInUse: boolean;
  setPopUpInUse: Dispatch<SetStateAction<boolean>>;
  allArticles: ArticleType[];
  setAllArticles: Dispatch<SetStateAction<ArticleType[]>>;
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
  const [allArticles, setAllArticles] = useState<ArticleType[]>([]);
  const [currentDataIndex, setCurrentDataIndex] = useState<number>(0);
  const [popUpLocation, setPopUpLocation] = useState<PopUpLocationType | null>(
    null
  );
  const [popUpInUse, setPopUpInUse] = useState(true);
  return (
    <MainContext.Provider
      value={{
        popUpInUse,
        setPopUpInUse,
        setPopUpLocation,
        popUpLocation,
        allArticles,
        setAllArticles,
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
