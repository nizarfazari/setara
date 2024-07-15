import { createContext, useState, ReactNode } from "react";

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextType {
  data: object;
}

const defaultValue: AppContextType = {
  data: {}
}

export const AppContext = createContext<AppContextType>(defaultValue)

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [data] = useState<object>({})

  return (
    <AppContext.Provider value={{ data }}>
      { children }
    </AppContext.Provider>
  )
}

export default AppProvider