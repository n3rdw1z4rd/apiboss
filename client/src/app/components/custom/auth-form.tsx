import { FunctionComponent } from 'preact';
import { Modal } from '../common';
import { useState } from 'preact/hooks';
import { useAppContext } from '../../app';
import { LoginForm } from './auth-modal/login-form';

export interface AuthFormParams {

}

export const AuthForm: FunctionComponent<AuthFormParams> = ({ }) => {
    const appContext = useAppContext();

    // const [showLoginForm, setShowLoginForm] = useState(true);
    // const updateInputValue = (key: string, value: string) => {

    // };

    return (
        <Modal>
            <LoginForm />
        </Modal>
    )
}