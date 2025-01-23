import { FunctionComponent } from 'preact';
import { useFormWizardContext } from './form-wizard';
import { classNames } from '../../../utils';
import { useRef } from 'preact/hooks';

export interface FormWizardStepParams {
    title: string,
}

export const FormWizardStep: FunctionComponent<FormWizardStepParams> = ({
    children,
    title,
}) => {
    // console.debug('*** WizardStep:', { title });

    const formWizardContext = useFormWizardContext();
    const formRef = useRef(null);

    const onFormSubmit = (ev: SubmitEvent) => {
        ev.preventDefault();
        ev.stopPropagation();

        if (formWizardContext.currentStep < formWizardContext.stepCount - 1) {
            formWizardContext.currentStep++;
        } else {
            if (formRef.current) {
                const data = new FormData(formRef.current);
                console.debug('*** data:', data.entries());
            }
        }
    };

    return (
        <form className={'form-wizard-step'} ref={formRef} onSubmit={onFormSubmit}>
            {/* <h2 className={'has-text-centered'}>{title}</h2> */}

            {children}

            <div className={'is-flex is-flex-direction-row'}>
                <button
                    type={'button'}
                    className={classNames(
                        'button',
                        formWizardContext.currentStep > 0 ? '' : 'is-hidden',
                    )}
                    onClick={(ev: MouseEvent) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                        console.debug('*** back clicked');
                        formWizardContext.currentStep -= 1;
                    }}
                >&lt; Back</button>

                <div className={'is-flex-grow-1 has-text-centered'}>
                    {/* {message} */}
                    messages
                </div>

                <button
                    type={formWizardContext.currentStep < formWizardContext.stepCount - 1 ? 'button' : 'submit'}
                    className={classNames(
                        'button',
                        formWizardContext.currentStep < formWizardContext.stepCount - 1 ? '' : 'is-primary',
                    )}
                    onClick={(ev: MouseEvent) => {
                        if (formWizardContext.currentStep < formWizardContext.stepCount - 1) {
                            ev.preventDefault();
                            ev.stopPropagation();
                            formWizardContext.currentStep += 1;
                            console.debug('*** next clicked', formWizardContext.currentStep);
                        } else {
                            console.debug('*** SUBMIT clicked');
                        }
                    }}
                >
                    {formWizardContext.currentStep < formWizardContext.stepCount - 1 ? 'Next' : 'Submit'}
                </button>
            </div>
        </form>
    );
}