import { FunctionComponent } from 'preact';
import { useAppContext } from '../../app';
import { Input, Logo, Modal, Option, Select } from '../../components/common';
import './first-run.css';
import { AdminAccountSetup } from './admin-account-setup';

export const FirstRun: FunctionComponent = () => {
    const appContext = useAppContext();



    return (
        <Modal>
            <div
                className={'box first-run'}
                style={{
                    height: '80vh',
                    overflowY: 'auto',
                }}
            >
                <div>
                    <Logo />
                    <h1 className={'has-text-centered'}>Welcome to the ApiBoss setup wizard!</h1>
                    <hr />

                    <AdminAccountSetup />
                </div>
            </div>
        </Modal>
    );
}