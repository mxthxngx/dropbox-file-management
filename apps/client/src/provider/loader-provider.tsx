import { LoadingSpinner } from "../components/common/loader";
import { LoaderContext } from "../context/loader-context";
import React, { ReactNode, useState } from "react";

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);

    const start = () => {
        setIsLoading(true);
    };

    const stop = () => {
        setIsLoading(false);
    };

    return (
        <LoaderContext.Provider
            value={{
                isLoading,
                start,
                stop,
            }}
        >
            {isLoading && <LoadingSpinner />}
            {children}
        </LoaderContext.Provider>
    );
};