import { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { useAppContext } from '../../app';
import { Logo, Modal, Wizard, WizardStep } from '../../components/common';
import './first-run.css';

export const FirstRun: FunctionComponent = () => {
    const appContext = useAppContext();

    return (
        <Modal>
            <div className={'box first-run'}>
                <div className={'has-text-centered'}>
                    <Logo />
                    <h1>Welcome to the ApiBoss setup wizard!</h1>
                    <hr />
                </div>

                <Wizard>
                    <WizardStep title={'Database Setup'} />
                    <WizardStep title={'Admin User'} />
                    <WizardStep title={'Server Settings'} />
                </Wizard>
            </div>
        </Modal>
    );
}