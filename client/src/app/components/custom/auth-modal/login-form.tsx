import { FunctionComponent } from 'preact';
import { useAppContext } from '../../../app';
import './auth-modal.css';

export const LoginForm: FunctionComponent = () => {
    const appContext = useAppContext();

    return (
        <form className={'auth-modal'}>
            <div className={'block'}>
                <h2 className={'subtitle'}>Login Form</h2>

                <div className={'field'}>
                    <label className={'label'}>Email</label>

                    <div className={'control has-icons-left has-icons-right'}>
                        <input className={'input is-danger'} type={'email'} />

                        <span className={'icon is-small is-left'}>
                            <i class={'fas fa-envelope'}></i>
                        </span>

                        {/* <span className={'icon is-small is-left'}>
                        <i className={'fas fa-envelope'}></i>
                    </span> */}

                        <span className={'icon is-small is-right'}>
                            <i className={'fas fa-exclamation-triangle'}></i>
                        </span>
                    </div>

                    <p className={'help is-danger'}>This email is invalid</p>
                </div>

                <div className={'field'}>
                    <label className={'label'}>Password</label>

                    <div className={'control has-icons-left has-icons-right'}>
                        <input className={'input'} type={'password'} />

                        {/* <span className={'icon is-small is-left'}>
                            <i class={'fas fa-envelope'}></i>
                        </span> */}

                        {/* <span className={'icon is-small is-left'}>
                        <i className={'fas fa-envelope'}></i>
                    </span> */}

                        <span className={'icon is-small is-right'}>
                            <i className={'fas fa-exclamation-triangle'}></i>
                        </span>
                    </div>

                    {/* <p className={'help is-danger'}>This email is invalid</p> */}
                </div>
            </div>
        </form>
    )
}