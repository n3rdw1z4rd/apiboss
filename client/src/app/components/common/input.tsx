import { FunctionComponent } from 'preact';
import { CSSProperties, InputHTMLAttributes } from 'preact/compat';

export interface InputInterface extends InputHTMLAttributes<HTMLInputElement> {
    containerClassName?: string,
    containerStyle?: CSSProperties,
    controlClassName?: string,
    controlStyle?: CSSProperties,
    labelClassName?: string,
    labelStyle?: CSSProperties,
}

export const Input: FunctionComponent<InputInterface> = (props) => (
    <div
        className={`field ${props.containerClassName ?? ''}`}
        style={props.containerStyle}
    >
        <label
            className={`label ${props.labelClassName ?? ''}`}
            style={props.labelStyle}
        >
            {props.label ?? props.name}
        </label>

        <div
            className={`control ${props.controlClassName ?? ''}`}
            style={props.controlStyle}
        >
            <input {...{
                ...props,
                className: `input ${props.className ?? ''}`,
            }} />
        </div>
    </div>
);
