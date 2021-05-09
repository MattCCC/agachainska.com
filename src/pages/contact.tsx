import tw, { css, styled } from "twin.macro";

import { Button } from "@components/button";
import { GridRow, MainContainer } from "@components/main-container";
import { SocialMedia } from "@components/social-media";
import { TextTextarea } from "@components/text-textarea";
import { socialMedia } from "@data/social-media";
import { ReactComponent as PricklyPearIllustration } from "@svg/Prickly pear@1x.svg";
import { up } from "@utils/screens";

const H1 = styled.div(() => [
    tw`pt-12 mb-5 lg:mb-12 font-fbold prose-28px lg:prose-48px lg:pt-24`,
]);

const EmailLink = styled.a(() => [tw`inline-block ml-1 text-green`]);

const PricklyPear = styled(PricklyPearIllustration)(() => [
    tw`absolute z-10`,
    css`
        width: 36px;
        height: 36px;
        left: 57px;
        top: 82px;

        ${up("lg")} {
            width: 100px;
            height: 100px;
            left: 330px;
            top: 100px;
        }
    `,
]);

export default function Contact(): JSX.Element {
    return (
        <form
            action="https://formsubmit.co/a.chainska@gmail.com"
            method="POST"
            className="pb-16"
        >
            <MainContainer topPadding={true} as="section">
                <PricklyPear />
                <GridRow start={1} end={6}>
                    <H1>
                        Let’s talk! Dolor sit amet, consectetur adipiscing elit.
                    </H1>
                    <div className="hidden lg:block">
                        <SocialMedia items={socialMedia} variant="big" />
                    </div>
                </GridRow>
                <GridRow start={7} end={12} className="lg:pt-24">
                    <TextTextarea
                        id="contact"
                        name="contact"
                        label="Your message"
                        required={true}
                    />
                    <div className="grid mb-10 lg:grid-cols-2 gap-7 mt-7">
                        <div>
                            <TextTextarea
                                as="input"
                                id="name"
                                name="name"
                                type="text"
                                label="Your name"
                                required={true}
                            />
                        </div>
                        <div>
                            <TextTextarea
                                as="input"
                                id="email"
                                name="email"
                                type="email"
                                label="Your email"
                                required={true}
                            />
                        </div>
                    </div>
                    <Button type="submit">Send</Button>
                    <span className="block mt-6 lg:inline-block lg:mt-0 lg:ml-6">
                        or find me at
                        <EmailLink href="mailto:a.chainska@gmail.com">
                            a.chainska@gmail.com
                        </EmailLink>
                    </span>
                </GridRow>
            </MainContainer>
        </form>
    );
}
