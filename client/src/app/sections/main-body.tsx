import { FunctionComponent } from 'preact';
import { Router } from 'preact-router'
import { Error, Home } from '../pages';

export const MainBody: FunctionComponent = () => (
    <main class={'main'}>
        <Router>
            <Home path={'/'} />
            <Error type={'404'} default />
        </Router>
    </main>
);