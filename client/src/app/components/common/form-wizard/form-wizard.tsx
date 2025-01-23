import { createContext, FunctionComponent, toChildArray } from 'preact';
import { useSignal } from '@preact/signals';
import { Data } from '../../../api';
import { useContext, useEffect, useState } from 'preact/hooks';

import './form-wizard.css';

export interface FormWizardContextInterface {
    completed: boolean,
    currentStep: number,
    formData: Data[],
    stepCount: number,
}

const FormWizardContext = createContext<FormWizardContextInterface>({
    completed: false,
    currentStep: 0,
    formData: [],
    stepCount: 0,
});

export const useFormWizardContext = () => useContext(FormWizardContext);

export interface FormWizardParams {
    // onBackClicked?: ,
    // onNextClicked,
    onSubmitClicked: (formData: Data) => void,
}

export const FormWizard: FunctionComponent<FormWizardParams> = ({
    children,
    onSubmitClicked,
}) => {
    const steps = toChildArray(children);

    const completed = useSignal<boolean>(false);
    const currentStep = useSignal<number>(0);
    const formData = useSignal<Data[]>([])

    // const [stepIndex, setStepIndex] = useState<number>(currentStep.value);

    useEffect(() => {
        if (completed.value) onSubmitClicked(formData.value);
    }, [completed.value]);

    useEffect(() => {
        console.debug('*** currentStep:', currentStep.value);
        // setStepIndex(currentStep.value);
    }, [currentStep.value]);

    const state: FormWizardContextInterface = {
        completed: completed.value,
        currentStep: currentStep.value,
        formData: formData.value,
        stepCount: steps.length,
    };

    return (
        <FormWizardContext.Provider value={state}>
            <pre>state: {currentStep.value}</pre>
            {steps[currentStep.value]}
        </FormWizardContext.Provider>
    );
};
