import { ChangeEvent, FunctionComponent, useEffect, useState } from 'preact/compat';
import { Input } from '../../components';
import { Data } from '../../api';

const PASSWORD_VALIDATION_PATTERN: RegExp = /[0-9a-fA-F]{8,}/;

export interface RegistrationFormParams {
    onSubmit: (formData: Data) => void,
}

export const RegistrationForm: FunctionComponent<RegistrationFormParams> = ({
    onSubmit,
}) => {
    const [email, setEmail] = useState<string>('');
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const [passwordsValid, setPasswordsValid] = useState<boolean>(true);

    const onFormSubmit = (ev: SubmitEvent) => {
        ev.preventDefault();
        ev.stopPropagation();

        const data: Data = Object.fromEntries(new FormData(ev.currentTarget as HTMLFormElement));

        console.debug('*** data:', data);

        const passwordsValid = (
            data.password1.matches(PASSWORD_VALIDATION_PATTERN) this is not working!!
            && data.password1 === data.password2
        );

        setPasswordsValid(passwordsValid);

        // onSubmit(data);
    };

    return (
        <form onSubmit={onFormSubmit}>
            <Input
                name={'email'}
                type={'email'}
                autoComplete={'email'}
                label={'Email Address:'}
                value={email}
                onChange={(ev: ChangeEvent<HTMLInputElement>) => setEmail(ev.currentTarget.value)}
                required
            />

            <Input
                name={'password1'}
                type={'password'}
                autoComplete={'password'}
                label={'Password:'}
                value={password1}
                className={passwordsValid ? '' : 'is-danger'}
                onChange={(ev: ChangeEvent<HTMLInputElement>) => setPassword1(ev.currentTarget.value)}
                required
            />

            <Input
                name={'password2'}
                type={'password'}
                autoComplete={'password'}
                label={'Password Again:'}
                value={password2}
                className={passwordsValid ? '' : 'is-danger'}
                onChange={(ev: ChangeEvent<HTMLInputElement>) => setPassword2(ev.currentTarget.value)}
                required
            />

            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-link">Submit</button>
                </div>
                <div class="control">
                    <button class="button is-link is-light">Cancel</button>
                </div>
            </div>
        </form>
    );
};
