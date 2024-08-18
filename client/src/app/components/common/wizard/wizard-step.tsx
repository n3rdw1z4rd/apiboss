import { FunctionComponent } from 'preact';

export interface WizardStepParams { }

export const WizardStep: FunctionComponent<WizardStepParams> = (params) => {
    console.debug('*** WizardStep:', params);

    return (
        <div>WIZARD STEP</div>
    );
}