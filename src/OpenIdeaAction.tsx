import { ReactElement } from 'react';
import { ActionPanel, closeMainWindow } from '@raycast/api';
import { execSync } from 'child_process';

interface OpenIdeaActionProps {
    title: string;
    path: string;
}

export function OpenIdeaAction(
    props: OpenIdeaActionProps
): ReactElement<OpenIdeaActionProps> {
    return (
        <ActionPanel.Item
            title={props.title}
            onAction={async () => {
                execSync(`idea ${props.path}`);
                await closeMainWindow();
            }}
        />
    );
}
