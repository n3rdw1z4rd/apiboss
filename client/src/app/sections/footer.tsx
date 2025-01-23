import { FunctionComponent } from 'preact';

export const Footer: FunctionComponent = () => (
    <footer className={'footer is-small'}>
        <div className={'content has-text-centered'}>
            <p>
                <a
                    href={'https://github.com/n3rdw1z4rd/apiboss'}
                    target="_blank"
                    rel="noopener noreferrer"
                >ApiBoss&nbsp;</a>
                <strong>&copy; 2024</strong>, John Wakley
            </p>
        </div>
    </footer>
);