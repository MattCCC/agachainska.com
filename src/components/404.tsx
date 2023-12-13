import { MainContainer } from "components/main-container";
import { MainSection } from "components/main-section";
import { Translate } from "components/translate";

export function ErrorContainer() {
    return (
        <MainSection className="grid items-center grid-flow-col grid-cols-1 grid-rows-1">
            <MainContainer topPadding={true}>
                <h1 className="font-bold text-center text-[140px] leading-38">
                    <Translate id="page.notfound" />
                </h1>
            </MainContainer>
        </MainSection>
    );
}
