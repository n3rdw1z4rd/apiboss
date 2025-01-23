import { Fragment, FunctionComponent } from 'preact';
import { useAppContext } from '../../../app';
import { useState } from 'preact/hooks';

export const AuthWidget: FunctionComponent = () => {
    const appContext = useAppContext();

    // const [showAuthForm, setShowAuthForm] = useState(false);

    // appContext.account = {
    //     username: 'n3rdw1z4rd',
    //     email: 'john.wakley@icloud.com',
    // };

    return !appContext.account ? (
        <Fragment>
            <a className={'button is-primary is-small'} onClick={(evt: MouseEvent) => {
                evt.preventDefault();
                // setShowAuthForm(true);
            }}>
                Log in
            </a>
        </Fragment>
    ) : (
        <Fragment>
            <a className={'button is-light'}>
                {appContext.account.username}
            </a>
        </Fragment>
    );
};