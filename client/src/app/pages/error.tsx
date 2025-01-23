import { FunctionComponent } from 'preact';
import { Modal } from '../components/common';

interface ErrorParams { type: string, url?: string, default?: boolean }

export const Error: FunctionComponent<ErrorParams> = ({ type, url }) => (
    <Modal>
        <div
            class={'box'}
            style={{
                border: '1px dashed var(--bulma-danger)',
            }}
        >
            <h2>Error {type} this path does not exist:</h2>
            <br />
            <pre>{url}</pre>
            <hr />
            <p className={'has-text-centered'}>
                <a href={'/'}>Home</a>
            </p>
        </div>
    </Modal>
);