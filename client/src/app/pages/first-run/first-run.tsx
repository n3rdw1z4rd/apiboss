import { FunctionComponent } from 'preact';
import { useAppContext } from '../../app';
import { Input, Logo, Modal, Option, Select } from '../../components/common';
import './first-run.css';

export const FirstRun: FunctionComponent = () => {
    const appContext = useAppContext();

    const onSubmit = (ev: SubmitEvent) => {
        ev.preventDefault();
        ev.stopPropagation();

        // const formData = new FormData(ev.currentTarget);
    };

    return (
        <Modal>
            <div
                className={'box first-run'}
                style={{
                    height: '80vh',
                    overflowY: 'auto',
                }}
            >
                <div>
                    <Logo />
                    <h1 className={'has-text-centered'}>Welcome to the ApiBoss setup wizard!</h1>
                    <hr />

                    <form onSubmit={onSubmit}>
                        {/*
                            client: process.env.DB_CLIENT,
                            filename: process.env.DB_FILENAME,
                            host: process.env.DB_HOST,
                            port: process.env.DB_PORT,
                            user: process.env.DB_USER,
                            password: process.env.DB_PASSWORD,
                            database: process.env.DB_DATABASE,
                            useNullAsDefault: JSON.parse(process.env.DB_USE_NULL_AS_DEFAULT),
                            showLogs: JSON.parse(process.env.DB_SHOW_LOGS),
                            fieldNameDelimiter: process.env.DB_FIELD_NAME_DELIMITER,
                        */}

                        <Select name={'dbClient'} label={'Select Database Type:'}>
                            <Option value={'sqlite'}>Sqlite</Option>
                            <Option value={'mysql'} disabled>MySQL/MariaDB</Option>
                            <Option value={'memory'} disabled>None (memory, not persisted)</Option>
                        </Select>

                        <Input name={'dbFilename'} label={'Filename'} placeholder={'sqlite://example.db or :memory:'}/>
                    </form>
                </div>
            </div>
        </Modal>
    );
}