/* eslint-disable max-len */
import { FunctionComponent, memo, ReactNode } from "react";

import tw, { css, styled } from "twin.macro";

interface Props {
    text?: string;
    color?: string;
    displayStar?: boolean;
    children?: ReactNode;
}

export const StarWrapper = styled.div(({ displayStar = false }: Props) => [
    tw`flex relative h-full w-full`,

    css`
        transition: all 300ms;
        transform: scale(0);
    `,
    displayStar &&
        css`
            transform: scale(1);
        `,
]);

export const Svg = styled.svg(() => [tw`absolute h-full w-full`]);

export const Text = styled.div(() => [
    tw`relative z-10 m-auto text-center`,

    css`
        width: 70%;
    `,
]);

export const Star: FunctionComponent<Props> = memo(
    ({ text = "", displayStar = true, color = "", children, ...props }) => (
        <div {...props}>
            <StarWrapper displayStar={displayStar}>
                <Svg viewBox="0 0 240 250" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M132.2 6.058c2.675-3.004 5.275-5.763 9.64-4.895 4.598.915 5.84 4.802 7.244 8.822h0l.232.664c1.609 4.596 3.516 9.32 9.048 11.611 5.359 2.22 9.927.415 14.196-1.615l.58-.277h0l.29-.14.507-.245.505-.245c3.529-1.699 6.91-3.126 10.524-.712 3.957 2.645 3.551 6.795 3.304 11.118-.286 5.01-.493 10.315 3.889 14.697s9.686 4.175 14.697 3.889c4.323-.247 8.473-.653 11.118 3.304 2.414 3.613.987 6.995-.712 10.524l-.245.505-.245.508-.14.288-.277.58c-2.03 4.27-3.835 8.838-1.615 14.197 2.291 5.532 7.015 7.44 11.611 9.049h0l.665.231c4.02 1.403 7.906 2.646 8.821 7.244.868 4.365-1.891 6.965-4.895 9.64l-.42.374h0l-.211.188h0l-.479.428c-3.59 3.224-7.163 6.78-7.163 12.71 0 5.93 3.572 9.486 7.163 12.71l.479.428.21.187.42.374c3.004 2.675 5.764 5.275 4.896 9.64-.929 4.671-4.92 5.885-9.011 7.312h0l-.811.284c-4.491 1.583-9.04 3.533-11.275 8.929-2.118 5.113-.57 9.507 1.34 13.608l.275.584h0l.278.58h0l.139.29c1.883 3.9 3.847 7.58 1.202 11.54-2.646 3.96-6.798 3.553-11.122 3.306-5.01-.286-10.314-.493-14.693 3.887-4.38 4.38-4.173 9.683-3.887 14.693.247 4.324.654 8.476-3.306 11.122-3.96 2.645-7.64.68-11.54-1.202l-.29-.14-.58-.277h0l-.584-.275c-4.101-1.91-8.495-3.458-13.608-1.34-5.396 2.235-7.346 6.784-8.93 11.277h0l-.233.667c-1.474 4.223-2.686 8.223-7.361 9.153-4.366.868-6.966-1.892-9.64-4.895l-.375-.42h0l-.187-.211h0l-.429-.479c-3.223-3.59-6.779-7.163-12.709-7.163s-9.486 3.572-12.71 7.163l-.428.479-.188.21-.374.42c-2.675 3.005-5.275 5.764-9.64 4.896-4.598-.915-5.84-4.802-7.244-8.822h0l-.232-.664c-1.609-4.596-3.516-9.32-9.048-11.611-5.359-2.22-9.927-.415-14.196 1.615l-.58.277h0l-.29.14-.507.245-.505.245c-3.529 1.699-6.91 3.126-10.524.712-3.957-2.645-3.551-6.795-3.304-11.118.286-5.01.493-10.315-3.889-14.697s-9.686-4.175-14.697-3.889c-4.323.247-8.473.653-11.118-3.304-2.414-3.613-.987-6.995.712-10.524l.245-.505.245-.508.14-.288.277-.58c2.03-4.27 3.835-8.838 1.615-14.197-2.291-5.532-7.015-7.44-11.611-9.049h0l-.665-.231c-4.02-1.403-7.906-2.646-8.821-7.244-.868-4.365 1.891-6.965 4.895-9.64l.42-.374h0l.211-.188h0l.479-.428c3.59-3.224 7.163-6.78 7.163-12.71 0-5.93-3.572-9.486-7.163-12.71l-.479-.428-.21-.187-.42-.374c-3.004-2.675-5.764-5.275-4.896-9.64.929-4.671 4.92-5.885 9.011-7.312h0l.811-.284c4.491-1.583 9.04-3.533 11.275-8.929 2.118-5.113.57-9.507-1.34-13.608l-.275-.584h0l-.278-.58h0l-.139-.29c-1.883-3.9-3.847-7.58-1.202-11.54 2.646-3.96 6.798-3.553 11.122-3.306 5.01.286 10.314.493 14.693-3.887 4.38-4.38 4.173-9.683 3.887-14.693-.247-4.324-.654-8.476 3.306-11.122 3.96-2.645 7.64-.68 11.54 1.202l.29.14.58.277h0l.584.275c4.101 1.91 8.495 3.458 13.608 1.34 5.396-2.235 7.346-6.784 8.93-11.277h0l.233-.667c1.474-4.223 2.686-8.223 7.361-9.153 4.366-.868 6.966 1.892 9.64 4.895l.375.42h0l.187.211h0l.429.479c3.223 3.59 6.779 7.163 12.709 7.163s9.486-3.572 12.71-7.163l.428-.479.188-.21z"
                        fill={color || "#FFF"}
                        stroke="#000"
                        strokeWidth={2}
                        fillRule="evenodd"
                    />
                </Svg>
                <Text>{text}</Text>
            </StarWrapper>
        </div>
    )
);
