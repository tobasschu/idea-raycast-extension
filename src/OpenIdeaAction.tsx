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
                console.log(
                    execSync(
                        `/usr/local/bin/idea ${props.path}`
                    ).toString()
                );
                //execSync(`idea ${props.path}`, { stdio: 'inherit' });
                await closeMainWindow();
            }}
        />
    );
}
