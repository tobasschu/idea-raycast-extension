import {
    ActionPanel,
    OpenAction,
    ShowInFinderAction,
    Icon,
    List
} from '@raycast/api';
import { useProjects } from './useProjects';
import { OpenIdeaAction } from './OpenIdeaAction';

export default function Command() {
    const { projects, isLoading } = useProjects();

    return (
        <List isLoading={isLoading} searchBarPlaceholder="Filter by title...">
            {projects?.map(project => (
                <List.Item
                    key={project.path}
                    icon={{ source: Icon.Document }}
                    title={project.name}
                    accessoryTitle={project.path}
                    accessoryIcon={{ source: Icon.Circle }}
                    actions={
                        <ActionPanel>
                            <OpenIdeaAction
                                title="Open in IntelliJ IDEA"
                                path={project.path}
                            />
                            <ShowInFinderAction
                                title="Open in Finder"
                                path={project.path}
                            />
                            <OpenAction
                                icon={{
                                    fileIcon:
                                        '/System/Applications/Utilities/Terminal.app'
                                }}
                                title="Open in Terminal"
                                application="Terminal"
                                target={project.path}
                            />
                        </ActionPanel>
                    }
                />
            ))}
        </List>
    );
}
