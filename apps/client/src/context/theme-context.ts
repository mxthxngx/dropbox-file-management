import { createContext } from "react";

export const ThemeContext = createContext<{ toggleTheme: () => void; isDarkMode: boolean } | undefined>(undefined);
