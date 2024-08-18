import { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { useAppContext } from '../../app';
import { Logo, Modal, Wizard } from '../../components/common';
import './first-run.css';

export const FirstRun: FunctionComponent = () => {
    const appContext = useAppContext();

    return (
        <Modal>
            <div className={'box first-run'}>
                <div className={'has-text-centered'}>
                    <Logo />
                    <h1>Welcome to ApiBoss!</h1>
                    <hr />
                </div>

                <Wizard />
            </div>
        </Modal>
    );
}