/// <reference types="react" />
type NavigationProps = {
    handleLogin?: () => Promise<void>;
    isSignedIn?: boolean;
    username?: string;
};
export declare const Navigation: ({ handleLogin, isSignedIn }: NavigationProps) => JSX.Element;
export {};
