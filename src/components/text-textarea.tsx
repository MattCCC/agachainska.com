import { ChangeEvent, useCallback, useEffect, useState } from "react";

import tw, { css, styled } from "twin.macro";

interface Props {
    id: string;
    name: string;
    label: string;
    type?: string;
    className?: string;
    required?: boolean;
    as?: "input" | "textarea";
    onBlur?: (e: any) => void;
    onFocus?: (e: any) => void;
}

interface LabelProps {
    active: boolean;
    as?: "input" | "textarea";
    htmlFor?: "input" | "textarea";
}

const FloatingLabelTextarea = styled.div(() => [tw`w-full`]);

const FloatingLabelTextareaContainer = styled.div(() => [
    tw`relative flex flex-col font-sans border border-white border-solid cursor-text`,
]);

const FloatingLabel = styled.label(({ active, htmlFor }: LabelProps) => [
    tw`absolute top-0 opacity-50 pointer-events-none select-none cursor-text prose-16px`,
    css`
        transform: none;
        transition: all 0.2s ease-in-out;
        transform-origin: left top;
    `,
    active &&
        css`
            opacity: 1;
            transform: translate3d(14px, -45%, 0) scale(0.8);
        `,
    active && tw`bg-tertiary`,
    htmlFor === "textarea" && tw`p-4`,
    htmlFor === "input" &&
        css`
            padding: 0.55rem 1rem 0;
        `,
]);

const FloatingTextarea = styled.textarea(
    ({ active, as = "textarea" }: LabelProps) => [
        tw`m-0 bg-transparent`,
        css`
            &::placeholder {
                opacity: 0;
                transition: opacity 0.2s cubic-bezier(0.6, 0.04, 0.98, 0.335);
            }
        `,
        active &&
            css`
                &::placeholder {
                    opacity: 1;
                }
            `,
        as === "textarea" && tw`p-4`,
        as === "textarea" &&
            css`
                min-height: 154px;
            `,
        as === "input" && tw`px-4 py-2`,
        as === "input" &&
            css`
                min-height: none;
                height: 40px;
            `,
    ]
);

export function TextTextarea({
    id,
    label,
    onBlur,
    onFocus,
    className,
    ...props
}: Props): JSX.Element {
    const [value, setValue] = useState("");
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(value && value.length > 0 ? true : false);
    }, [value]);

    const onChange = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) =>
            setValue(e.target?.value || ""),
        []
    );

    const onFocusCallback = useCallback(
        (e) => {
            setActive(true);

            if (onFocus) {
                onFocus(e);
            }
        },
        [onFocus]
    );

    const onBlurCallback = useCallback(
        (e) => {
            setActive(value.length !== 0 ? true : false);

            if (onBlur) {
                onBlur(e);
            }
        },
        [onBlur, value.length]
    );

    return (
        <FloatingLabelTextarea>
            <FloatingLabelTextareaContainer className={className}>
                <FloatingLabel
                    className={className}
                    htmlFor={props.as || "textarea"}
                    active={active}
                >
                    {label}
                </FloatingLabel>
                <FloatingTextarea
                    active={active}
                    className={className}
                    id={id}
                    onFocus={onFocusCallback}
                    onBlur={onBlurCallback}
                    onChange={onChange}
                    {...props}
                />
            </FloatingLabelTextareaContainer>
        </FloatingLabelTextarea>
    );
}
