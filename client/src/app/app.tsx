import { FunctionComponent, createContext } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { Footer, Header, MainBody } from './sections';
import { Api, ApiData, Data } from './api';
import { FirstRun } from './pages';
import './app.css';

export interface AppState {
    account: Data | null,
}

const DEFAULT_APPSTATE: AppState = {
    account: null,
};

export const AppContext = createContext(DEFAULT_APPSTATE);
export const useAppContext = () => useContext(AppContext);

export const App: FunctionComponent = () => {
    const [firstRun, setFirstRun] = useState<boolean>(false);

    useEffect(() => {
        Api.instance.getLocals()
            .then((data: ApiData) => {
                setFirstRun(data.payload?.IS_FIRST_RUN ?? false);
            });
    }, []);

    return (
        <div className={'app is-clipped'}>
            <Header />
            <MainBody />
            <Footer />
            {firstRun && <FirstRun />}
        </div>
    );
}