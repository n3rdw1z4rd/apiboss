import { Data } from '../../api';
import { RegistrationForm } from '../../components';

export const AdminAccountSetup = () => {
    const onSubmit = (formData: Data) => {
        console.debug('*** formData:', formData);
    }

    return (
        <RegistrationForm onSubmit={onSubmit} />
    );
};
