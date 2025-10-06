import {
    ActionPanel,
    OpenAction,
    ShowInFinderAction,
    Icon,
    List, OpenInBrowserAction
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
                                application
                                    ="Terminal"
                                target={project.path}
                            />
                            <OpenInBrowserAction
                                title="Open logs"
                                url={`https://vpc-es-closelink-logs-ieziw6d36bxeyvrdgezcchssdi.eu-central-1.es.amazonaws.com/_dashboards/app/data-explorer/discover?_g=(refreshInterval:(pause:!t,value:0),time:(from:now-30m,to:now))&_a=(columns:!(message),interval:auto,query:(language:kuery,query:'application:+%22${project.name}%22+AND+profiles:+%22production%22'),sort:!(!('@timestamp',desc)))`}
                            />
                        </ActionPanel>
                    }
                />
            ))}
        </List>
    );
}
