import { FunctionComponent } from 'preact';
// import { WizardStep } from './wizard-step';

export interface WizardParams {
    // steps?: WizardStep[],
}

const DEFAULT_STEPS: WizardParams = {
    // steps: [],
};

export const Wizard: FunctionComponent<WizardParams> = (params) => {
    console.debug('Wizard:', params);

    return (
        <div>WIZARD</div>
    )
};
