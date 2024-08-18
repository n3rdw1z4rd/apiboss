import { FunctionComponent } from 'preact';
import { createContext } from 'preact';
import { useContext } from 'preact/hooks';
import { Footer, Header, MainBody } from './sections';
import { Data } from './types';
import './app.css';

export interface AppState {
    account: Data | null,
}

const DEFAULT_APPSTATE: AppState = {
    account: null,
};

export const AppContext = createContext(DEFAULT_APPSTATE);
export const useAppContext = () => useContext(AppContext);

export const App: FunctionComponent = () => (
    <div className={'app is-clipped'}>
        <Header />
        <MainBody />
        <Footer />
    </div>
);
