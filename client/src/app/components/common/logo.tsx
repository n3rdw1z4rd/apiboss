import { FunctionComponent } from 'preact';

export const Logo: FunctionComponent = () => (
    <img
        className={'apiboss-logo-dark'}
        src={`/images/apiboss-logo.png`}
        alt={'ApiBoss'}
        height={'256'}
    />
);
