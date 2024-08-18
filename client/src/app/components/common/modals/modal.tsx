import { ComponentChild, FunctionComponent } from 'preact';
import { CSSProperties, useState } from 'preact/compat';

export interface ModalParams {
    active?: boolean,
    className?: string,
    closable?: boolean,
    contentClass?: string,
    contentStyle?: CSSProperties,
    style?: CSSProperties,
    title?: ComponentChild,
}

export const Modal: FunctionComponent<ModalParams> = ({
    active = true,
    children,
    className,
    closable = false,
    contentClass = '',
    contentStyle = {},
    style,
    // title,
}) => {
    const [isActive, setIsActive] = useState(active);

    const onCloseClicked = (_evt: MouseEvent) => {
        console.debug('*** clicked')
        setIsActive(false);
    };

    return (
        <div
            className={`modal ${className ?? ''} ${isActive ? 'is-active' : ''}`}
            style={style ?? {}}
        >
            <div className={'modal-background'}></div>

            <div
                className={`modal-content ${contentClass ?? ''}`}
                style={contentStyle ?? {}}
            >
                {children}
            </div>

            {closable && (
                <button
                    className={'modal-close is-large'}
                    aria-label={'close'}
                    onClick={onCloseClicked}
                />
            )}
        </div>
    );
}