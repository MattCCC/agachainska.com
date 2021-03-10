import { motion } from "framer-motion";
import { Fragment } from "react";
import tw, { css, styled } from "twin.macro";

const TimelineWrapper = styled.div(() => [
    tw`flex flex-col text-right z-50`,
    css``
]);

const Title = styled.h4(({ isActive }: TitleStyle) => [
    tw`lg:prose-20px lg:text-primary-color opacity-30 font-bold`,
    isActive && tw`opacity-100 lg:p-1`,
    css``,
]);

const List = styled.ul(() => [
    tw`font-bold lg:prose-14px lg:text-gray-500 flex-grow`,
    css``
]);

const ListItem = styled.li(({ isActive }: ListItemStyle) => [
    tw`lg:text-primary-color lg:border-r-1 lg:border-primary-color border-solid opacity-20 lg:p-5`,
    isActive &&
    tw`opacity-100`,
    css``,
]);

interface TitleStyle {
    isActive: boolean;
}

interface ListItemStyle {
    isActive: boolean;
}

interface Item {
    name: string;
    isActive: boolean;
}

interface Section {
    title: string;
    isActive: boolean;
    items: Item[];
}

interface Props {
    sections: Section[];
}

export function Timeline({ sections }: Props): JSX.Element {
    return (
        <TimelineWrapper>
            {sections.map((section: Section) => (
                <Fragment>
                    <Title isActive={section.isActive}>{section.title}</Title>
                    <List>
                        {section.items.map((item: Item) => (
                            <ListItem isActive={item.isActive}>
                                {item.name}
                            </ListItem>
                        ))}
                    </List>
                </Fragment>
            ))}
        </TimelineWrapper>
    );
}
