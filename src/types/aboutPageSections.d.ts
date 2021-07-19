interface Hero {
    description: string;
}

interface Expertise {
    description: string;
    skills: string[];
}

interface DesignProcessPhase {
    phaseNum: string;
    title: string;
    description: string;
}

interface DesignProcess {
    description: string;
    designProcessPhases: DesignProcessPhase[];
}

interface AboutPageData {
    hero: Hero;
    expertise: Expertise;
    designProcess: DesignProcess;
}
