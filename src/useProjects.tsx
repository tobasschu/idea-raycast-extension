import { useEffect, useState } from 'react';
import fs from 'fs';
import { getPreferenceValues } from '@raycast/api';

interface Preferences {
    directories: string;
}

interface Project {
    name: string;
    path: string;
}

async function getProjects(path: string): Promise<Project[]> {
    try {
        return (
            await fs.promises.readdir(path, {
                withFileTypes: true
            })
        )
            .filter(entry => entry.isDirectory())
            .filter(entry => !entry.name.startsWith('.'))
            .map(entry => {
                return {
                    name: entry.name,
                    path: `${path}/${entry.name}`
                };
            });
    } catch (err) {
        console.error('Error occured while reading directory!', err);
        throw err;
    }
}

export const useProjects = () => {
    const [isLoading, setIsLoading] = useState<boolean>();
    const [projects, setProjects] = useState<Project[]>();
    const preferences: Preferences = getPreferenceValues();

    useEffect(() => {
        setIsLoading(true);
        const projectDirectories = preferences.directories.split(':');

        Promise.all(
            projectDirectories.map(directory => getProjects(directory))
        ).then(dirProjects => {
            const projects = dirProjects.reduce((acc, x) => acc.concat(x), []);
            setProjects(
                projects.sort((a, b) =>
                    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                )
            );
            setIsLoading(false);
        });
    }, []);

    return {
        projects,
        isLoading
    };
};
