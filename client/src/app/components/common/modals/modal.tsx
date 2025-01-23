import { ComponentChild, FunctionComponent } from 'preact';
import { useState } from 'preact/compat';

export interface ModalParams {
    active?: boolean,
    closable?: boolean,
    contentClass?: string,
    title?: ComponentChild,
}

export const Modal: FunctionComponent<ModalParams> = ({
    active = true,
    children,
    closable = false,
    // title,
}) => {
    const [isActive, setIsActive] = useState(active);

    const onCloseClicked = (_evt: MouseEvent) => {
        console.debug('*** clicked')
        setIsActive(false);
    };

    return (
        <div
            className={`modal ${isActive ? 'is-active' : ''}`}
        >
            <div className={'modal-background'}></div>

            <div className={'modal-content'}>
                {children}
            </div>

            {/* <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Modal title</p>
                    <button class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                    {children}
                </section>
                <footer class="modal-card-foot">
                    <div class="buttons">
                        <button class="button is-success">Save changes</button>
                        <button class="button">Cancel</button>
                    </div>
                </footer>
            </div> */}

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