import { FunctionComponent } from 'preact';
import { AuthWidget } from '../components/custom/auth-modal';
import { Data } from '../types';
import { Logo } from '../components/common';

export const Header: FunctionComponent = () => {
    const links: Data[] = [
        {
            label: 'Documentation',
            path: '/docs'
        },
        // {
        //     label: 'Pricing',
        //     path: '/docs'
        // },
    ];

    return (
        <header>
            <nav
                className={'navbar'}
                role={'navigation'}
                aria-label={'main navigation'}
            >
                <div className={'navbar-brand'}>
                    <a href={'/'} className={'navbar-item'} ><Logo /></a>

                    <a
                        role={'button'}
                        className={'navbar-burger'}
                        aria-label={'menu'}
                        aria-expanded={'false'}
                        data-target={'navbarBasicExample'}
                    >
                        <span aria-hidden={true}></span>
                        <span aria-hidden={true}></span>
                        <span aria-hidden={true}></span>
                        <span aria-hidden={true}></span>
                    </a>
                </div>

                <div
                    id={'navbarBasicExample'}
                    className={'navbar-menu'}
                >
                    <div className={'navbar-start'}>
                        {links.map((link) => (
                            <a className={'navbar-item'} href={link.path}>{link.label}</a>
                        ))}
                    </div>

                    <div className={'navbar-end'}>
                        <div className={'navbar-item'}>
                            <AuthWidget />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};