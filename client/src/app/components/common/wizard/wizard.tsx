import { FunctionComponent, toChildArray } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import './wizard.css';

export interface WizardParams {
    message?: string,
}

export const Wizard: FunctionComponent<WizardParams> = ({
    children,
    message = '',
}) => {
    const steps = toChildArray(children);

    const [currentStep, setCurrentStep] = useState<number>(0);
    const [complete, setComplete] = useState<boolean>(false);

    // useEffect(() => {
    //     console.debug('** currentStep changed:', currentStep);
    // }, [currentStep]);

    const onBackClicked = (ev: MouseEvent) => {
        ev.preventDefault();

        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const onNextClicked = (ev: MouseEvent) => {
        ev.preventDefault();

        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const onSubmitClicked = (ev: MouseEvent) => {
        ev.preventDefault();

        console.debug('*** submit clicked ***');
    };

    return (
        <div className={'block'}>
            {/* <pre>{JSON.stringify({ currentStep })}</pre> */}

            {steps[currentStep]}

            <div className={'is-flex is-flex-direction-row'}>
                <button
                    className={`button ${currentStep > 0 ? '' : 'is-hidden'}`}
                    onClick={onBackClicked}
                >&lt; Back</button>

                <div className={'is-flex-grow-1 has-text-centered'}>
                    {message}
                </div>

                <button
                    className={`button ${currentStep < steps.length - 1 ? '' : 'is-hidden'}`}
                    onClick={onNextClicked}
                >Next &gt;</button>

                <button
                    className={`button is-primary ${currentStep === steps.length - 1 ? '' : 'is-hidden'}`}
                    onClick={onSubmitClicked}
                    disabled={!complete}
                >Sumbit</button>
            </div>
        </div>
    )
};
