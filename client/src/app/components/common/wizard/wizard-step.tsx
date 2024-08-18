import { FunctionComponent } from 'preact';

export interface WizardStepParams {
    title: string,
}

export const WizardStep: FunctionComponent<WizardStepParams> = ({
    children,
    title,
}) => {
    // console.debug('*** WizardStep:', { title });

    return (
        <div className={'wizard-step'}>
            <h2 className={'has-text-centered'}>{title}</h2>
            <hr />
            {children}
        </div>
    );
}