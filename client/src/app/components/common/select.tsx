import { FunctionComponent } from 'preact';
import { CSSProperties, OptionHTMLAttributes, SelectHTMLAttributes } from 'preact/compat';

export interface OptionInterface extends OptionHTMLAttributes<HTMLOptionElement> {
    containerClassName?: string,
}

export const Option: FunctionComponent<OptionInterface> = (props) => (
    <option {...{
        ...props,
        className: props.containerClassName ?? '',
    }}>
        {props.children}
    </option>
);

export interface SelectInterface extends SelectHTMLAttributes<HTMLSelectElement> {
    containerClassName?: string,
    containerStyle?: CSSProperties,
    controlClassName?: string,
    controlStyle?: CSSProperties,
    selectClassName?: string,
    selectStyle?: CSSProperties,
    label?: string,
    labelClassName?: string,
    labelStyle?: CSSProperties,
}

export const Select: FunctionComponent<SelectInterface> = (props) => (
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

            <div
                className={[
                    'select',
                    props.multiple ? 'is-multiple' : '',
                    props.containerClassName ?? '',
                ].join(' ')}
            >
                <select
                    {...{
                        ...props,
                        className: props.selectClassName ?? '',
                        style: props.selectStyle ?? {},
                    }}
                >
                    {props.children}
                </select>
            </div>


        </div>
    </div>
);
