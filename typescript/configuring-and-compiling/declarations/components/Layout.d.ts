import { ReactNode } from 'react';
type LayoutProps = {
    children: ReactNode;
    handleLogin?: () => Promise<void>;
    isSignedIn?: boolean;
};
export declare const Layout: ({ children, handleLogin, isSignedIn }: LayoutProps) => JSX.Element;
export {};
